from flask import Flask
from flask_cors import CORS
from routes.sales import sales_bp
from routes.employee import employee_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(sales_bp)
app.register_blueprint(employee_bp)

if __name__ == "__main__":
    app.run(debug=True)