from psycopg2 import sql

FETCH_IP_RECORD = "SELECT request_count, last_request_date FROM ip_request_limits WHERE ip_address = %s;"

RESET_REQUEST_COUNT = sql.SQL(
    "UPDATE ip_request_limits SET request_count = 1, last_request_date = %s WHERE ip_address = %s"
)

INCREMENT_REQUEST_COUNT = sql.SQL(
    "UPDATE ip_request_limits SET request_count = request_count + 1 WHERE ip_address = %s"
)

CREATE_IP_RECORD = sql.SQL(
    "INSERT INTO ip_request_limits (last_request_date, request_count, ip_address) VALUES (%s, 1, %s)"
)
