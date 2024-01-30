from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()
class User():
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    created_at = db.Column(db.Integer)
class Room_Participants():
    id = db.Column(db.Integer, primary_key = True)
    room_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
class Chat_Rooms():
    id = db.Column(db.Integer, primary_key = True)
    room_name = db.column(db.String)
    created_at = db.Column(db.String)
class Messages():
    id = db.Column(db.Integer, primary_key = True)
    message = db.Column(db.String)
    room_id = db.Column(db.Integer)
    created_at = db.Column(db.String)
