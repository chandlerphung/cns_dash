import os
import flask_login
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import json

load_dotenv()

class User(flask_login.UserMixin):
    def __init__(self, username, password_hash):
        self.id = username
        self.password_hash = password_hash

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# load users from env
raw_users = json.loads(os.getenv("AUTHORIZED_USERS", "{}"))
users = {
    username: User(username, generate_password_hash(password))
    for username, password in raw_users.items()
}