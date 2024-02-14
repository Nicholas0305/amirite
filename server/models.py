from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    likes = db.Column(db.Integer)
    dislikes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)

    rooms = db.relationship("Room_Participants", back_populates="user")

    serialize_rules = ("-rooms.user",)


@validates("username")
def validates_username(self, key, value):
    if len(value) < 0 & len(value) > 16:
        raise ValueError
    else:
        return value


@validates("password")
def validates_password(self, key, value):
    if len(value) < 0 & len(value) > 16:
        raise ValueError
    else:
        return value


class Messages(db.Model, SerializerMixin):
    __tablename__ = "messages"
    message_id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String)
    room_id = db.Column(db.Integer, db.ForeignKey("chat_rooms.room_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    created_at = db.Column(db.DateTime)

    room = db.relationship("Chat_Rooms", back_populates="messages")

    serialize_rules = ("-room.messages",)


class Chat_Rooms(db.Model, SerializerMixin):
    __tablename__ = "chat_rooms"
    room_id = db.Column(db.Integer, primary_key=True)
    room_name = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    messages = db.relationship("Messages", back_populates="room")
    participants = db.relationship("Room_Participants", back_populates="room")

    serialize_rules = ("-messages.room", "-participants.room")


class Room_Participants(db.Model, SerializerMixin):
    __tablename__ = "room_participants"
    participant_id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey("chat_rooms.room_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    user = db.relationship("User", back_populates="rooms")
    room = db.relationship("Chat_Rooms", back_populates="participants")

    serialize_rules = ("-user.rooms", "-room.participants")
