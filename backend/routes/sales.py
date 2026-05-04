from flask import Blueprint, jsonify
from database import get_db
from datetime import date

sales_bp = Blueprint('sales', __name__)

@sales_bp.route('/api/sales')
def get_sales():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        "SELECT Hour, Card, Cash, Service, Tip, Discount, Other FROM Bill WHERE Day = ? OR Day IS NULL",
        (today,)
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)