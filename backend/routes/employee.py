from flask import Blueprint, jsonify
from database import get_db
from datetime import date

employee_bp = Blueprint('employee', __name__)

@employee_bp.route('/api/employee/codes')
def get_employee_codes():
    db = get_db()
    cursor = db.execute(
    "SELECT FirstName, passcode FROM Account WHERE Status == 1",
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)