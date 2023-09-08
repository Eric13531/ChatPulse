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
from Database.config import db

app = Flask(__name__)
app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@socketio.on("connect")
def handle_connect(sid):
    socketio.emit("acknowledge", data = {"status": "success"}, room = request.sid)

@socketio.on("connected")
def handle_connected(data):
    add_user_to_room(db, request.sid, data["room"])
    socketio.emit("connectCallback", {"data": request.sid }, room= request.sid)

@socketio.on("disconnected")
def handle_disconnect():
    sid = request.sid
    remove_user_from_room(db, sid, get_room_id_from_user(db, sid))

@socketio.on("message")
def handle_message(data):
    sid = request.sid
    response = get_room_id_from_user(db, sid)
    users = get_users_from_room(db, response)
    if (users == 0):
        return
    else:
        for id in users:
            if (id == sid):
                continue
            socketio.emit("message", {"message" : data["message"]}, room = id)


if __name__ == "__main__":
    socketio.run(app, debug=True)
