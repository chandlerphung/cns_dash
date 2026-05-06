from flask import Blueprint, request, jsonify
import flask_login
from users import users

login_bp = Blueprint("login", __name__)

@login_bp.route("/api/login", methods=["POST"])
def verify_login():
    body = request.get_json()
    username = body.get("username")
    password = body.get("password")

    user = users.get(username)

    if user and user.check_password(password):
        flask_login.login_user(user)
        return jsonify({"success": True})
    
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@login_bp.route("/api/logout", methods=["POST"])
def logout():
    flask_login.logout_user()
    return jsonify({"success": True})

@login_bp.route("/api/auth/check")
def check():
    if flask_login.current_user.is_authenticated:
        return jsonify({"authenticated": True})
    return jsonify({"authenticated": False}), 401