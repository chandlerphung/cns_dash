from flask import Blueprint, jsonify
from database import get_db
from datetime import date
import json

sales_bp = Blueprint('sales', __name__)

@sales_bp.route('/api/sales')
def get_sales():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        """
        SELECT Hour, Card, Cash, Service, Tip, Discount, Other, Note
        FROM Bill 
        WHERE Day = ? OR Day IS NULL 
        ORDER BY rowid DESC
        """,
        (today,)
    )
    rows = cursor.fetchall()
    db.close()

    data = []
    for row in rows:
        row_dict = dict(row)
        try:
            note = json.loads(row_dict["Note"])
            row_dict["employees"] = list(note.get("employee", {}).keys())
        except:
            row_dict["employees"] = []
        del row_dict["Note"]
        data.append(row_dict)

    return jsonify(data)

@sales_bp.route('/api/shop/total')
def get_shop_total():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        """
        SELECT 
            SUM(Service) as Service,
            SUM(Tip) as Tip,
            SUM(Card) as Card,
            SUM(Cash) as Cash,
            SUM(Discount) as Discount,
            SUM(Other) as Other
        FROM Bill
        WHERE Day = ? OR Day IS NULL
        """,
        (today,)
    )
    row = cursor.fetchone()
    db.close()

    return jsonify(dict(row))