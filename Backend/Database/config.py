import datetime, os, secrets
from dotenv import load_dotenv
from crud import *

load_dotenv()

from pymongo.mongo_client import MongoClient

uri = f"mongodb+srv://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@webrtcchat.mqtdxzl.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.WebRTCChat

new_room_id = secrets.token_hex(5)
add_room(db, new_room_id)
add_user_to_room(db, secrets.token_hex(5), new_room_id)
add_user_to_room(db, secrets.token_hex(5), new_room_id)
add_user_to_room(db, secrets.token_hex(5), new_room_id)
add_user_to_room(db, secrets.token_hex(5), new_room_id)
add_user_to_room(db, secrets.token_hex(5), new_room_id)

print(get_users_from_room(db, new_room_id))
