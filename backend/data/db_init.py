import sqlite3
import os

base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, "database.db")

db_connect = sqlite3.connect(db_path)

cursor = db_connect.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS feelings (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               name VARCHAR(32) NOT NULL,
               desire TEXT NOT NULL)
               ''')

def insert_row(name, desire):    
    cursor.execute(f"INSERT INTO feelings (name, desire) VALUES ({name}, {desire})")

    db_connect.commit()

    db_connect.close()
