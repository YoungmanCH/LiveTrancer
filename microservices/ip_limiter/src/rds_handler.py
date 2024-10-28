from dotenv import load_dotenv
import os
import psycopg2
from psycopg2 import Error
from LiveTrancer.microservices.ip_limiter.postgres_sql.ip_requests import FETCH_IP_RECORD, RESET_REQUEST_COUNT, INCREMENT_REQUEST_COUNT, CREATE_IP_RECORD

class AmazonRDSConnection:
    def __init__(self):
        load_dotenv()
        rds_endpoint = os.getenv("RDS_ENDPOINT")
        rds_user_name = os.getenv("RDS_USER_NAME")
        rds_password = os.getenv("RDS_PASSWORD")
        rds_db = os.getenv("RDS_DB")
        rds_port = os.getenv("RDS_PORT")

        self.rds_config = {
            'host': rds_endpoint,
            'user': rds_user_name,
            'password': rds_password,
            'dbname': rds_db,
            'port': rds_port,
        }
        
    def get_rds_connection(self) -> any:
        try:
            print('接続中')
            connection = psycopg2.connect(
                **self.rds_config,
                connect_timeout=10
            )
            return connection
        except Error as e:
            print(f"RDS接続エラー: {str(e)}")
            return None
        
        
class PostgresDBProcessor:
    @staticmethod
    def fetch_db_record_with_ip(cursor, ip_address) -> any:
        cursor.execute(FETCH_IP_RECORD, (ip_address,))
        return cursor.fetchone()

    @staticmethod
    def reset_request_count(cursor, today, ip_address, connection) -> bool:
        cursor.execute(RESET_REQUEST_COUNT, (today, ip_address))
        connection.commit()
        return True

    @staticmethod
    def increment_request_count(cursor, ip_address, connection) -> bool:
        cursor.execute(INCREMENT_REQUEST_COUNT, (ip_address,))
        connection.commit()
        return True

    @staticmethod
    def create_ip_record(cursor, today, ip_address, connection) -> bool:
        cursor.execute(CREATE_IP_RECORD, (today, ip_address))
        connection.commit()
        return True
        