import sqlite3
import os
from typing import List, Dict, Any, Optional

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database.db")


def init_db() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS feelings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                desire TEXT NOT NULL,
            )
            """
        )
        conn.commit()


def _get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def insert_feeling(name: str, desire: str) -> int:
    if not name or not desire:
        raise ValueError("Both 'name' and 'desire' are required")

    with _get_connection() as conn:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO feelings (name, desire) VALUES (?, ?)",
            (name.strip(), desire.strip()),
        )
        last_id = cur.lastrowid
        conn.commit()
        return last_id


def get_all_feelings() -> List[Dict[str, Any]]:
    with _get_connection() as conn:
        cur = conn.cursor()
        cur.execute("SELECT id, name, desire, created_at FROM feelings")
        rows = cur.fetchall()
        return [dict(row) for row in rows]


def find_by_first_name(first_name: str) -> List[Dict[str, Any]]:
    if not first_name:
        return []

    first = first_name.strip().split()[0]
    pattern = f"{first}%"

    with _get_connection() as conn:
        cur = conn.cursor()
        cur.execute("SELECT id, name, desire, FROM feelings WHERE LOWER(name) LIKE LOWER(?)", (pattern,))
        rows = cur.fetchall()
        return [dict(row) for row in rows]


def delete_feeling_by_id(record_id: int) -> bool:
    with _get_connection() as conn:
        cur = conn.cursor()
        cur.execute("DELETE FROM feelings WHERE id = ?", (record_id,))
        affected = cur.rowcount
        conn.commit()
        return affected > 0
