from flask import Blueprint, jsonify
from database import get_db
from datetime import date

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/api/customer/orders')
def get_customer_orders():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        """
        SELECT customer, phone, hour
        FROM Request_Service
        WHERE ddate = ?
        ORDER BY rowid DESC
        """,
        (today,)
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)