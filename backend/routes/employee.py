from flask import Blueprint, jsonify, request
from database import get_db
from datetime import date
from flask_login import login_required

employee_bp = Blueprint('employee', __name__)

@employee_bp.route('/api/employee/codes')
@login_required
def get_employee_codes():
    db = get_db()
    cursor = db.execute(
    "SELECT FirstName, passcode FROM Account WHERE Status == 1",
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)

@employee_bp.route('/api/employee/clocked-in')
@login_required
def get_clocked_in_employees():
    date_param = request.args.get('date')
    target_date = date_param if date_param else date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        """
        SELECT a.FirstName, i.inhour
        FROM InOut i
        LEFT JOIN Account a ON i.account_id = a.Id
        WHERE i.date = ?
        """,
        (target_date,)
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)

@employee_bp.route('/api/employee/totals')
@login_required
def get_employee_totals():
    date_param = request.args.get('date')
    
    if date_param:
        target_date = date_param
    else:
        target_date = date.today().strftime("%m/%d/%Y")

    db = get_db()
    cursor = db.execute(
        """
        SELECT a.FirstName, e.Price, e.Tip, e.Service_Charge
        FROM Employee_Total e
        LEFT JOIN Account a ON e.Account_Id = a.Id
        WHERE e.Date = ?
        """,
        (target_date,)
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)