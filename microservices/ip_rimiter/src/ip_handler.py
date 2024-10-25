from flask import Request
import datetime
from psycopg2 import Error
from LiveTrancer.microservices.ip_rimiter.src.rds_handler import AmazonRDSConnection, PostgresDBProcessor

class IPAddressFetcher:
    @staticmethod
    def fetch_from_request(request: Request) -> str | None:
        if request.headers.get('X-Forwarded-For'):
            ip = request.headers.getlist('X-Forwarded-For')[0]
        else:
            ip = request.remote_addr
        print(f'ip:{ip} を取得しました')
        return ip

class IPLimitProcessor:
    def check_ip_limit(self, ip_address) -> bool:
        rds = AmazonRDSConnection()
        connection = rds.get_rds_connection()
        try:
            cursor = connection.cursor()
            
            return self._execute_check_ip_limit(connection, cursor, ip_address)
        except Error as e:
            return self._handle_ip_limit_error(e)
        finally:
            self._close_connection(connection, cursor)
            
    def _execute_check_ip_limit(self, connection, cursor, ip_address) -> bool:
        if connection:
            max_requests_per_day = 5
            today = IPLimitProcessHandler.get_today_date()
            
            record = PostgresDBProcessor.fetch_db_record_with_ip(cursor, ip_address)

            if record:
                request_count, last_request_date = record

                if last_request_date != today:
                    return PostgresDBProcessor.reset_request_count(cursor, today, ip_address, connection)
                elif request_count < max_requests_per_day:
                    return PostgresDBProcessor.increment_request_count(cursor, ip_address, connection)
                else:
                    return False
            else:
                return PostgresDBProcessor.create_ip_record(cursor, today, ip_address, connection)

        return False
    
    def _handle_ip_limit_error(self, e: Error) -> bool:
        print(f"データ取得エラー: {str(e)}")
        return False

    def _close_connection(self, connection, cursor):
        if connection:
            cursor.close()
            connection.close()
                

class IPLimitProcessHandler:
    @staticmethod
    def get_today_date() -> any:
        return datetime.datetime.now().date()