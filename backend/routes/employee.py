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

@employee_bp.route('/api/employee/clocked-in')
def get_clocked_in_employees():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        """
        SELECT a.FirstName, i.inhour
        FROM InOut i
        LEFT JOIN Account a ON i.account_id = a.Id
        WHERE i.date = ?
        """,
        (today,)
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)

@employee_bp.route('/api/employee/totals')
def get_employee_totals():
    today = date.today().strftime("%m/%d/%Y")
    db = get_db()
    cursor = db.execute(
        """
        SELECT a.FirstName, e.Price, e.Tip, e.Service_Charge
        FROM Employee_Total e
        LEFT JOIN Account a ON e.Account_Id = a.Id
        WHERE e.Date = ?
        """,
        (today,)
    )
    rows = cursor.fetchall()
    db.close()

    data = [dict(row) for row in rows]
    return jsonify(data)