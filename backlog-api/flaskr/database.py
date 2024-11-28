import psycopg2


def connect():
    conn = psycopg2.connect(
        database="message_board",
        user="postgres",
        password="1234",
        host="127.0.0.1",
        port="5432",
    )
    return conn.cursor()


class Connection:
    def __init__(self):
        self.conn = psycopg2.connect(
            database="message_board",
            user="postgres",
            password="1234",
            host="127.0.0.1",
            port="5432",
        )

    def connect(self):
        return self.conn.cursor()

    def disconnect(self):
        self.conn.close()
