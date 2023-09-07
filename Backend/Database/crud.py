def add_room(db, _id):
    try:
        rooms = db.rooms
        rooms.insert_one({"_id": _id, "users": []})
    except:
        print("Failed to create room")


def delete_room(db, _id):
    try:
        rooms = db.rooms
        rooms.delete_one({"_id": _id})
    except:
        print("Room does not exist")


def add_user_to_room(db, user_id, room_id):
    if (db.rooms.find_one({"_id": room_id})) is None:
        add_room(db, room_id)
    try:
        rooms = db.rooms
        rooms.update_one({"_id": room_id}, {"$push": {"users": user_id}})

    except:
        print("Failed to add user to room")


def remove_user_from_room(db, user_id, room_id):
    try:
        rooms = db.rooms
        rooms.update_one({"_id": room_id}, {"$pull": {"users": user_id}})
    except:
        print("Failed to remove user from room")


def get_users_from_room(db, room_id):
    try:
        rooms = db.rooms
        return rooms.find_one({"_id": room_id})["users"]
    except:
        print("Failed to get rooms users")


def get_room_id_from_user(db, user_id):
    try:
        rooms = db.rooms
        return rooms.find_one({"users": {"$in": [user_id]}})["_id"]
    except:
        print("Failed to find room user is in")
        return 0
