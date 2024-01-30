from config import app
from flask import jsonify, request,make_response
from models import db, User,Chat_Rooms

@app.route('/login', methods=['POST'])
def login():
    # Retrieve username and password from the request
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Perform authentication by querying the database
    user = User.query.filter_by(username=username, password=password).first()
    
    # Check if user exists and if the password matches
    if user and user.password == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})
@app.route('/chat_rooms',methods=['GET'])
def chat_rooms():
    chat_rooms = Chat_Rooms.query.all()

    chat_rooms_dict = (chat_room.to_dict() for chat_room in chat_rooms)
    response = make_response(
        chat_rooms_dict,200
    )
    return response
if __name__ == '__main__':
    app.run(port=5555, debug=True)
