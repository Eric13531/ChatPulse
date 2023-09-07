from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO

from Database.crud import (
    add_room,
    add_user_to_room,
    remove_user_from_room,
    delete_room,
    get_users_from_room,
    get_room_id_from_user,
)
from Database.config import client

app = Flask(__name__)
app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@socketio.on("connect")
def handle_connect(sid):
    socketio.emit("acknowledge", data = {"status": "success"}, room = sid)

@socketio.on("connected")
def handle_connected(data):
    add_user_to_room(client, request.sid, data["room"])
    socketio.emit("connectCallback", {"data": request.sid }, room= request.sid)

@socketio.on("disconnected")
def handle_disconnect(data):
    remove_user_from_room(client, request.sid, data["room"])

@socketio.on("message")
def handle_message(data):
    sid = request.sid
    response = get_room_id_from_user(client, sid)
    if (response == 0):
        return
    else:
        for id in response:
            if (id == sid):
                continue
            socketio.emit("message", {"data": data["message"]}, room = id)


if __name__ == "__main__":
    socketio.run(app, debug=True)
