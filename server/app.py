from config import app
from flask import jsonify, request, make_response
from models import db, User, Chat_Rooms, Messages


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"})


@app.route("/chat_rooms", methods=["GET"])
def chat_rooms():
    chat_rooms = Chat_Rooms.query.all()
    chat_rooms_dict = [chat_room.to_dict() for chat_room in chat_rooms]
    return jsonify(chat_rooms_dict)


@app.route("/chat_rooms/<int:room_id>", methods=["GET"])
def get_chat_room(room_id):
    chat_room = Chat_Rooms.query.get(room_id)
    if chat_room:
        return jsonify(chat_room.to_dict())
    else:
        return jsonify({"error": "Chat room not found"}), 404


@app.route("/messages", methods=["GET"])
def messages():
    messages = Messages.query.all()
    messages_dict = [message.to_dict() for message in messages]
    return jsonify(messages_dict)


@app.route("/messages/<int:room_id>", methods=["GET"])
def get_messages_by_room(room_id):
    messages = Messages.query.filter_by(room_id=room_id).all()
    if messages:
        messages_dict = [message.to_dict() for message in messages]
        return jsonify(messages_dict)
    else:
        return jsonify({"error": "No messages found for this room"}), 404


@app.route("/users", methods=["GET"])
def users_all():
    users = User.query.all()
    users_dict = [user.to_dict() for user in users]
    return jsonify(users_dict)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
