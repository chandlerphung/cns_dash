from flask import Blueprint, jsonify, request
from database import get_db
from datetime import date
import json
from flask_login import login_required

sales_bp = Blueprint('sales', __name__)

@sales_bp.route('/api/sales')
@login_required
def get_sales():
    date_param = request.args.get('date')
    
    if date_param:
        # viewing a specific past day - no null check needed
        query = """
            SELECT Hour, Card, Cash, Service, Tip, Discount, Other, Note
            FROM Bill WHERE Day = ?
            ORDER BY rowid DESC
        """
        params = (date_param,)
    else:
        # today - include nulls for unsettled transactions
        today = date.today().strftime("%m/%d/%Y")
        query = """
            SELECT Hour, Card, Cash, Service, Tip, Discount, Other, Note
            FROM Bill WHERE Day = ? OR Day IS NULL
            ORDER BY rowid DESC
        """
        params = (today,)

    db = get_db()
    cursor = db.execute(query, params)
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
@login_required
def get_shop_total():
    date_param = request.args.get('date')
    
    if date_param:
        query = """
            SELECT 
            COALESCE(SUM(Service), 0) as Service,
            COALESCE(SUM(Tip), 0) as Tip,
            COALESCE(SUM(Card), 0) as Card,
            COALESCE(SUM(Cash), 0) as Cash,
            COALESCE(SUM(Discount), 0) as Discount,
            COALESCE(SUM(Other), 0) as Other
            FROM Bill WHERE Day = ?
        """
        params = (date_param,)
    else:
        today = date.today().strftime("%m/%d/%Y")
        query = """
            SELECT 
            COALESCE(SUM(Service), 0) as Service,
            COALESCE(SUM(Tip), 0) as Tip,
            COALESCE(SUM(Card), 0) as Card,
            COALESCE(SUM(Cash), 0) as Cash,
            COALESCE(SUM(Discount), 0) as Discount,
            COALESCE(SUM(Other), 0) as Other
            FROM Bill WHERE Day = ? OR Day IS NULL
        """
        today = date.today().strftime("%m/%d/%Y")
        params = (today,)

    db = get_db()
    row = db.execute(query, params).fetchone()
    db.close()
    return jsonify(dict(row))
