from config import app
from models import db, User, Chat_Rooms, Room_Participants, Messages
from datetime import datetime

if __name__ == '__main__':
    with app.app_context():
        print("deleting tables...")

        User.query.delete()
        Chat_Rooms.query.delete()
        Room_Participants.query.delete()
        Messages.query.delete()

        db.session.commit()

        print("creating tables...")
        users = [
            User(
                username="user1",
                password="password1",
                likes=10,
                dislikes=5,
                created_at=datetime.utcnow()
            ),
            User(
                username="user2",
                password="password2",
                likes=15,
                dislikes=3,
                created_at=datetime.utcnow()
            ),
            User(
                username="user3",
                password="password3",
                likes=20,
                dislikes=8,
                created_at=datetime.utcnow()
            )
        ]
        db.session.add_all(users)

        # Sample data for Chat Rooms
        chat_rooms = [
            Chat_Rooms(
                room_name="Room 1",
                created_at=datetime.utcnow()
            ),
            Chat_Rooms(
                room_name="Room 2",
                created_at=datetime.utcnow()
            )
        ]
        db.session.add_all(chat_rooms)

        # Sample data for Room Participants
        room_participants = [
            Room_Participants(
                room_id=1,  # Assuming you have IDs for chat rooms
                user_id=1  # Assuming you have IDs for users
            ),
            Room_Participants(
                room_id=1,  # Assuming you have IDs for chat rooms
                user_id=2  # Assuming you have IDs for users
            ),
            Room_Participants(
                room_id=2,  # Assuming you have IDs for chat rooms
                user_id=2  # Assuming you have IDs for users
            )
        ]
        db.session.add_all(room_participants)

        # Sample data for Messages
        messages = [
            Messages(
                message="Hello, this is a test message!",
                room_id=1,  # Assuming you have IDs for chat rooms
                created_at=datetime.utcnow()
            ),
            Messages(
                message="Another test message.",
                room_id=1,  # Assuming you have IDs for chat rooms
                created_at=datetime.utcnow()
            ),
            Messages(
                message="Yet another test message.",
                room_id=2,  # Assuming you have IDs for chat rooms
                created_at=datetime.utcnow()
            )
        ]
        db.session.add_all(messages)

        db.session.commit()
