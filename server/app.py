from config import app
from flask import jsonify, request, make_response
from models import db, User, Chat_Rooms, Messages, Room_Participants
from datetime import datetime
from flask_socketio import SocketIO, send, emit


socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("connect")
def handle_connect():
    print("Client connected")


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


@socketio.on("message")
def handle_message(message):
    print("Received message:", message)
    # Handle the received message as needed
    # You can emit messages back to the client or perform other actions
    send(message, broadcast=True)  # Example of broadcasting a message to all clients


@socketio.on("fetch_messages")
def handle_fetch_messages(data):
    room_id = data.get("room_id")

    # Query messages from the database for the specified room_id
    messages = Messages.query.filter_by(room_id=room_id).all()

    # Convert messages to a list of dictionaries
    messages_dict = [message.to_dict() for message in messages]

    # Emit the messages to the client that requested them
    emit("fetched_messages", messages_dict)


@socketio.on("new_message")
def handle_new_message(data):
    # Extract message data from the received payload
    message_content = data.get("message")
    room_id = data.get("room_id")
    user_id = data.get("user_id")

    # Create a new message object
    new_message = Messages(
        message=message_content,
        room_id=room_id,
        user_id=user_id,
        # Add other fields as needed
    )

    # Save the message to the database
    db.session.add(new_message)
    db.session.commit()

    # Broadcast the new message to all connected clients
    emit("message_received", data, broadcast=True)


@socketio.on("fetch_chat_rooms")
def handle_fetch_chat_rooms():
    chat_rooms = Chat_Rooms.query.all()
    chat_rooms_dict = [chat_room.to_dict() for chat_room in chat_rooms]
    emit("fetched_chat_rooms", chat_rooms_dict)


@socketio.on("new_chat_room")
def handle_new_chat_room(new_room_data):
    # Extract new room data from the received payload
    room_name = new_room_data.get("room_name")
    description = new_room_data.get("description")
    # Add other necessary data fields

    # Create a new chat room object
    new_room = Chat_Rooms(
        room_name=room_name,
        description=description,
        # Add other fields as needed
    )

    # Save the new chat room to the database
    db.session.add(new_room)
    db.session.commit()

    # Broadcast the new chat room to all connected clients
    emit("new_chat_room_added", new_room.to_dict(), broadcast=True)


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return jsonify({"success": True, **user.to_dict()}), 201
    else:
        return jsonify({"success": False}), 401


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

        # Emit the new message to all connected clients
        emit("new_message", new_message.to_dict(), broadcast=True)

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
            password=generate_password_hash(form_data["password"]),
            likes=0,
            dislikes=0,
            created_at=current_time,
            # Add other fields as needed
        )

        db.session.add(new_user)
        db.session.commit()

        response = make_response(new_user.to_dict(), 201)
        return response


@app.route("/users/<int:id>", methods=["GET", "PATCH"])
def users_by_id(id):

    user = User.query.filter(User.user_id == id).first()

    if user:

        if request.method == "GET":

            response = make_response(user.to_dict(), 200)

        if request.method == "PATCH":

            form_data = request.get_json()

            for key in form_data:
                setattr(user, key, form_data[key])

            db.session.commit()

            response = make_response(user.to_dict(), 201)
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
    socketio.run(app, port=5555, debug=True)
