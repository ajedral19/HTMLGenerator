from typing import TypedDict, NotRequired, Literal
import datetime
from database import Connection


class Ticket(TypedDict):
    id: str
    title: str
    description: str
    deadline: datetime
    date_created: NotRequired[datetime]


def list_of_backlogs() -> list[Ticket]:
    db = Connection()
    
    conn = db.connect()
    print(conn)
    # finds = conn.execute('SELECT * FROM users')
    # print(finds, 'got connected. Yey!')
    # conn = db.disconnect()
    
    return [
        {
            "id": "0192",
            "title": "This is a new task",
            "description": "you must finish this or else you'll die",
            "deadline": "11/29/2024",
            "date_created": "2024-11-27T01:57:41.258Z",
        },
        {
            "id": "0193",
            "title": "The new beginning",
            "description": "just quite a few changes will happen",
            "deadline": "11/03/2024",
            "date_created": "22024-11-27T01:57:41.258Z",
        },
    ]
