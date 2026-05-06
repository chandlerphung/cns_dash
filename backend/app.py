from flask import Flask
from flask_cors import CORS
from routes.sales import sales_bp
from routes.employee import employee_bp
from routes.customer import customer_bp
from routes.login import login_bp
from users import users
from notes_db import init_notes_db
import flask_login
import os
from dotenv import load_dotenv

load_dotenv()
init_notes_db()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def user_loader(username):
    return users.get(username)

app.register_blueprint(login_bp)
app.register_blueprint(sales_bp)
app.register_blueprint(employee_bp)
app.register_blueprint(customer_bp)

if __name__ == "__main__":
    app.run(debug=True)