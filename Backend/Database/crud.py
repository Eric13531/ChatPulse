def add_room(client, _id):
    try:
        db = client.WebRTCChat

        try:
            rooms = db.rooms
            rooms.insert_one({"_id": _id, "users": []})
        except:
            print("Failed to create room")

    except:
        print("Failed to connect to database")


def delete_room(client, _id):
    try:
        db = client.WebRTCChat

        try:
            rooms = db.rooms
            rooms.delete_one({"_id": _id})
        except:
            print("Room does not exist")
    except:
        print("Failed to connect to database")


def add_user_to_room(client, user_id, room_id):
    db = client.WebRTCChat

    rooms = db.rooms
    rooms.update_one({"_id": room_id}, {"$push": {"users": user_id}})


def remove_user_from_room(client, user_id, room_id):
    db = client.WebRTCChat

    rooms = db.rooms
    rooms.update_one({"_id": room_id}, {"$pull": {"users": user_id}})
