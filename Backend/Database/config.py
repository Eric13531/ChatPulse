import datetime
import os
from dotenv import load_dotenv

load_dotenv()

from pymongo.mongo_client import MongoClient
uri = f"mongodb+srv://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@webrtcchat.mqtdxzl.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.WebRTCChat

rooms = db.rooms
room_id = rooms.insert_one({}).inserted_id
print(room_id)

rooms.delete_many({})