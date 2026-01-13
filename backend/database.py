import sqlite3
import os

DB_NAME = "travel.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    with conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS offers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                image TEXT NOT NULL,
                duration TEXT NOT NULL,
                price TEXT NOT NULL,
                location TEXT NOT NULL,
                badge TEXT,
                description_short TEXT,
                description_full TEXT,
                final_considerations TEXT
            )
        ''')
    conn.close()
