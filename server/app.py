from config import app
from flask import jsonify, request, make_response
from models import db, User, Chat_Rooms, Messages, Room_Participants
from datetime import datetime


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return jsonify({"success": True, **user.to_dict()}), 201
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})


@app.route("/chat_rooms", methods=["GET", "POST"])
def chat_rooms():
    if request.method == "GET":
        chat_rooms = Chat_Rooms.query.all()
        chat_rooms_dict = [chat_room.to_dict() for chat_room in chat_rooms]
        return jsonify(chat_rooms_dict)
    elif request.method == "POST":
        form_data = request.get_json()
        current_time = datetime.utcnow()
        new_chat_room = Chat_Rooms(
            room_name=form_data["room_name"],
            description=form_data["description"],
            created_at=current_time,
            # Add other fields as needed
        )

        db.session.add(new_chat_room)
        db.session.commit()

        response = make_response(new_chat_room.to_dict(), 201)
        return response


@app.route("/chat_rooms/<int:room_id>", methods=["GET", "DELETE"])
def get_chat_room(room_id):
    chat_room = Chat_Rooms.query.get(room_id)
    if chat_room:
        if request.method == "GET":

            if chat_room:
                return jsonify(chat_room.to_dict())
            else:
                return jsonify({"error": "Chat room not found"}), 404
        elif request.method == "DELETE":

            db.session.delete(chat_room)
            db.session.commit()

            response = make_response({}, 201)
            return response


@app.route("/messages", methods=["GET", "POST"])
def messages():
    if request.method == "GET":
        messages = Messages.query.all()
        messages_dict = [message.to_dict() for message in messages]
        return jsonify(messages_dict)
    elif request.method == "POST":
        form_data = request.get_json()

        # Use the current timestamp for the created_at field
        current_time = datetime.utcnow()

        new_message = Messages(
            message=form_data["message"],
            room_id=form_data["room_id"],
            user_id=form_data["user_id"],
            created_at=current_time,
        )

        db.session.add(new_message)
        db.session.commit()

        response = make_response(new_message.to_dict(), 201)
        return response


@app.route("/messages/<int:room_id>", methods=["GET"])
def get_messages_by_room(room_id):
    messages = Messages.query.filter_by(room_id=room_id).all()
    if messages:
        messages_dict = [message.to_dict() for message in messages]
        return jsonify(messages_dict)
    else:
        return jsonify({"error": "No messages found for this room"}), 404


@app.route("/users", methods=["GET", "POST"])
def users_all():
    if request.method == "GET":
        users = User.query.all()
        users_dict = [user.to_dict() for user in users]
        return jsonify(users_dict)
    elif request.method == "POST":
        form_data = request.get_json()
        current_time = datetime.utcnow()
        new_user = User(
            username=form_data["username"],
            password=form_data["password"],
            likes=0,
            dislikes=0,
            created_at=current_time,
            # Add other fields as needed
        )

        db.session.add(new_user)
        db.session.commit()

        response = make_response(new_user.to_dict(), 201)
        return response


@app.route("/room_participants", methods=["GET", "POST"])
def room_participants():
    if request.method == "GET":
        # Retrieve all participants from the database
        all_participants = Room_Participants.query.all()
        # Convert participants to a list of dictionaries
        participants_data = [participant.to_dict() for participant in all_participants]
        # Return the list of participants as JSON
        return jsonify({"participants": participants_data}), 200

    elif request.method == "POST":
        form_data = request.get_json()

        new_participant = Room_Participants(
            room_id=form_data["room_id"],
            user_id=form_data["user_id"],
            # Add other fields as needed
        )

        db.session.add(new_participant)
        db.session.commit()

        response = make_response(new_participant.to_dict(), 201)
        return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)
