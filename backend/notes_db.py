import sqlite3
import os

NOTES_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "notes.db")

def get_notes_db():
    conn = sqlite3.connect(NOTES_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_notes_db():
    conn = get_notes_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS CustomerNotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT NOT NULL,
            note TEXT,
            done INTEGER DEFAULT 0,
            updated_at TEXT DEFAULT (datetime('now'))
        )
    """)
    conn.commit()
    conn.close()