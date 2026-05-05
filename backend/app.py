from flask import Flask
from flask_cors import CORS
from routes.sales import sales_bp
from routes.employee import employee_bp
from routes.customer import customer_bp
from notes_db import init_notes_db

init_notes_db()  # creates notes.db and table if they don't exist
app = Flask(__name__)
CORS(app)

app.register_blueprint(sales_bp)
app.register_blueprint(employee_bp)
app.register_blueprint(customer_bp)

if __name__ == "__main__":
    app.run(debug=True)