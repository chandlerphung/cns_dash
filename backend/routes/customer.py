from flask import Blueprint, jsonify, request
from database import get_db
from datetime import date
from notes_db import get_notes_db

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/api/customer/orders')
def get_customer_orders():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    notes_db = get_notes_db()

    rows = db.execute(
        """
        SELECT customer, phone, hour
        FROM Request_Service
        WHERE ddate = ?
        ORDER BY rowid DESC
        """,
        (today,)
    ).fetchall()
    db.close()

    notes_rows = notes_db.execute("SELECT phone, note, done FROM CustomerNotes").fetchall()
    notes_db.close()
    notes_map = {row["phone"]: {"note": row["note"], "done": row["done"]} for row in notes_rows}

    data = []
    for row in rows:
        row_dict = dict(row)
        note_data = notes_map.get(row_dict["phone"], {"note": "", "done": 0})
        row_dict["note"] = note_data["note"]
        row_dict["done"] = note_data["done"]
        data.append(row_dict)

    return jsonify(data)


@customer_bp.route('/api/customer/note', methods=['POST'])
def save_note():
    body = request.get_json()
    phone = body.get("phone")
    note = body.get("note")

    db = get_notes_db()
    # update if exists, insert if not
    existing = db.execute(
        "SELECT id FROM CustomerNotes WHERE phone = ?", (phone,)
    ).fetchone()

    if existing:
        db.execute(
            "UPDATE CustomerNotes SET note = ?, updated_at = datetime('now') WHERE phone = ?",
            (note, phone)
        )
    else:
        db.execute(
            "INSERT INTO CustomerNotes (phone, note) VALUES (?, ?)",
            (phone, note)
        )

    db.commit()
    db.close()
    return jsonify({"success": True})

@customer_bp.route('/api/customer/done', methods=['POST'])
def toggle_done():
    body = request.get_json()
    phone = body.get("phone")
    done = body.get("done")

    db = get_notes_db()
    existing = db.execute(
        "SELECT id FROM CustomerNotes WHERE phone = ?", (phone,)
    ).fetchone()

    if existing:
        db.execute(
            "UPDATE CustomerNotes SET done = ? WHERE phone = ?",
            (done, phone)
        )
    else:
        db.execute(
            "INSERT INTO CustomerNotes (phone, done) VALUES (?, ?)",
            (phone, done)
        )

    db.commit()
    db.close()
    return jsonify({"success": True})

