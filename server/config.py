from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO

from models import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

# Add WebSocket support
socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)
