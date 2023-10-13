import React, { useState, useRef, useEffect, useContext } from "react";
import "./CreateRoom.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

import SocketContext from "../components/socketContext";
// import {connectSocket, disconnectSocket, onConnected, emitConnected, onMessage, emitMessage, emitDisconnect} from "../components/socketService"
import { Link, useNavigate } from "react-router-dom";



const CreateRoom = () => {
  const [isFocused, setIsFocused] = useState(false)
  
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on('connectCallback', (data) => {
      console.log("Connected!");
      // window.location.href = '/room';
      navigate('/room')
    })

    // onConnected((data) => {
    //   console.log("Connected!");
    //   window.location.href = '/room'
    // })
  }, [])

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const blurElements = document.querySelectorAll('.blur-effect');
  blurElements.forEach(element => {
    element.addEventListener('mouseleave', (e) => {
      element.focus()
      e.currentTarget.focus()
      element.blur()
      e.currentTarget.blur()
    });
  });

  var element = document.querySelector('.regen')
  // element.addEventListener('focus', handleFocus)
  // element.addEventListener('blur', handleBlur)
  var focus = (isFocused) ? "Yes" : "No"

  const handleSubmit  = (e) => {
    e.preventDefault();

    // Check if the input value is empty
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a name');
    } else {
      // Clear any previous error message
      setErrorMessage('');

      // You can do something with the valid input here, e.g., send it to a server.
      // For now, let's just display it in the console.
      console.log('Submitted value:', inputValue);
      console.log(socket.id)
      socket.emit('connected', { room: inputValue });
      // emitConnected({room: inputValue});
      // Dev comment:
      // window.location.href = '/room'
    }
  };

  return (
    <div className="flex-container">
      <div className="header-container create-room">
        <div className="header"></div>
      </div>
      <h1 className="title title-create">Create Room</h1>
      <div className="content" >
        {/* <div className="room-name"> */}
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="text-input" className="label">Server:</label>
            <input
              className="name-input"
              type="text"
              id="text-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}

              style={{"padding-left": '0.4vw', "padding-bottom": "0.2vh"}}
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="second-button">
            <button className="btn btn-primary button blur-effect create" type="submit">
              <div className= "button-label2">CREATE SERVER</div>
            </button>
          </div>
        </form>
        {/* <button className="button btn btn-primary blur-effect">
          <div className= "button-label">CREATE ROOM</div>
        </button> */}
          {/* <button className="btn btn-primary regen blur-effect" >
            <FontAwesomeIcon icon={faRotateRight} />
          </button> */}
          
          {/* <img className="regen"></img> */}
        {/* </div> */}
      </div>
    </div>  
  );
};

export default CreateRoom;
