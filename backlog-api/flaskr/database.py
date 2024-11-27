import psycopg2

class Connection():
    def __init__(self):
        self.conn = psycopg2.connect(
            database="backlogs",
            host="",
            user="",
            password="",
            port=""
        )
    
    def connect(self):
        return self.conn.cursor()
    
    def disconnect(self):
        self.conn.close()