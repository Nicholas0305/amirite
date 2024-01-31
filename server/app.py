from config import app
from flask import jsonify, request, make_response
from models import db, User, Chat_Rooms, Messages

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/chat_rooms', methods=['GET'])
def chat_rooms():
    chat_rooms = Chat_Rooms.query.all()
    chat_rooms_dict = [chat_room.to_dict() for chat_room in chat_rooms]
    return jsonify(chat_rooms_dict)

@app.route('/messages', methods=['GET'])
def messages():
    messages = Messages.query.all()
    messages_dict = [message.to_dict() for message in messages]
    return jsonify(messages_dict)

@app.route('/users', methods=['GET'])
def users_all():
    users = User.query.all()
    users_dict = [user.to_dict() for user in users]
    return jsonify(users_dict)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
