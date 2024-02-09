from config import app
from models import db, User, Chat_Rooms, Room_Participants, Messages
from datetime import datetime

if __name__ == "__main__":
    with app.app_context():
        print("Deleting tables...")

        User.query.delete()
        Chat_Rooms.query.delete()
        Room_Participants.query.delete()
        Messages.query.delete()

        db.session.commit()

        print("Creating tables...")

        # Sample data for Users
        users = [
            User(
                username="user1",
                password="password1",
                likes=10,
                dislikes=5,
                created_at=datetime.utcnow(),
            ),
            User(
                username="user2",
                password="password2",
                likes=15,
                dislikes=3,
                created_at=datetime.utcnow(),
            ),
            User(
                username="user3",
                password="password3",
                likes=20,
                dislikes=8,
                created_at=datetime.utcnow(),
            ),
            # Add more users if needed
        ]
        db.session.add_all(users)
        db.session.commit()

        # Sample data for Chat Rooms
        chat_rooms = [
            Chat_Rooms(
                room_name="Dogs vs Cats",
                created_at=datetime.utcnow(),
                description="This room is all about Dogs vs cats, no memes allowed.",
            ),
            Chat_Rooms(
                room_name="Pizza is on top",
                created_at=datetime.utcnow(),
                description="I believe that pizza is the best food, jump in the room if you disaggree.",
            ),
            Chat_Rooms(
                room_name="Ice Cream is better than cake",
                created_at=datetime.utcnow(),
                description="I love ice cream",
            ),
            # Add more chat rooms if needed
        ]
        db.session.add_all(chat_rooms)
        db.session.commit()

        # Sample data for Room Participants
        room_participants = [
            Room_Participants(room_id=1, user_id=1),
            Room_Participants(room_id=1, user_id=2),
            Room_Participants(room_id=2, user_id=2),
            Room_Participants(room_id=3, user_id=3),
            # Add more room participants if needed
        ]
        db.session.add_all(room_participants)
        db.session.commit()

        # Sample data for Messages
        messages = [
            Messages(
                message="Hello, this is a test message!",
                room_id=1,
                created_at=datetime.utcnow(),
            ),
            Messages(
                message="Another test message.", room_id=1, created_at=datetime.utcnow()
            ),
            Messages(
                message="Yet another test message.",
                room_id=2,
                created_at=datetime.utcnow(),
            ),
            Messages(
                message="Testing a message in Room 3.",
                room_id=3,
                created_at=datetime.utcnow(),
            ),
            # Add more messages if needed
        ]
        db.session.add_all(messages)

        db.session.commit()

        print("Seed data added successfully!")
