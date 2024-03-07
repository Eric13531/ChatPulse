from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
import logging

from Backend.Database.crud import (
    add_room,
    add_user_to_room,
    remove_user_from_room,
    delete_room,
    get_users_from_room,
    get_room_id_from_user,
    remove_user,
    get_username,
    set_username
)
from Backend.Database.config import db

app = Flask(__name__)
app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

app.logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = logging.StreamHandler()
handler.setFormatter(formatter)
app.logger.addHandler(handler)

# Next steps:
# Check if user in room already or store room in cookies
# Let user add name

@socketio.on("connect")
def handle_connect(sid):
    socketio.emit("acknowledge", data = {"status": "success"}, room = request.sid)

@socketio.on("disconnect")
def handle_disconnect():
    app.logger.debug("disconnected")
    app.logger.debug(request.sid)
    sid = request.sid
    remove_user_from_room(db, sid, get_room_id_from_user(db, sid))
    remove_user(db, sid)

@socketio.on("connected")
def handle_connected(data):
    app.logger.debug("connect")
    app.logger.debug(data)
    app.logger.debug(request.sid)
    add_user_to_room(db, request.sid, data["room"])
    socketio.emit("connectCallback", {"data": request.sid }, room= request.sid)

@socketio.on("disconnected")
def handle_disconnected():
    app.logger.debug("disconnected")
    app.logger.debug(request.sid)
    sid = request.sid
    remove_user_from_room(db, sid, get_room_id_from_user(db, sid))

@socketio.on("message")
def handle_message(data):
    app.logger.debug("message")
    app.logger.debug(data)
    app.logger.debug(request.sid)
    sid = request.sid
    response = get_room_id_from_user(db, sid)
    if (response == 0):
        socketio.emit("message", {"error": True}, room = sid)
    users = get_users_from_room(db, response)
    username = get_username(db, sid)
    if (users == 0):
        return
    else:
        for id in users:
            if (id == sid):
                continue
            socketio.emit("message", {"message" : data["message"], "username": username, "error": False}, room = id)

@socketio.on("username")
def handle_username(data):
    sid = request.sid
    print("handle username", sid)
    if data["username"] != "":
        print("Username defined")
        username = data["username"]
        set_username(db, sid, username)
        socketio.emit("username", {"username": username}, room = sid)
    else:
        username = get_username(db, sid)
        socketio.emit("username", {"username": username}, room = sid)


if __name__ == "__main__":
    socketio.run(app, debug=True)
