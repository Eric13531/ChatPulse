import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

import socket from "../components/socketService"
// import {connectSocket, disconnectSocket, onConnected, emitConnected, onMessage, emitMessage, emitDisconnect} from "../components/socketService"



const CreateRoom = () => {
  const [isFocused, setIsFocused] = useState(false)
  
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log("Message: ", data.message);
    })

    // onMessage((data) => {
    //   console.log("Message: ", data.message)
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
      return
      // setErrorMessage('Please enter a value');
    } else {
      // Clear any previous error message
      // setErrorMessage('');

      // You can do something with the valid input here, e.g., send it to a server.
      // For now, let's just display it in the console.
      console.log('Submitted value:', inputValue);
      setInputValue("");
      setMessages((prevState) => {
        return [...prevState, {name: "Eric Zhang", content: inputValue}]
      })
      console.log(messages);
      socket.emit("message", {message: inputValue})
      // emitMessage({message: inputValue})
    }
  };

  return (
    <div className="flex-container-msg">
      <div className="header-container-chat">
        <div className="header create">Header Here {focus}</div>
        <button className="button btn-disconnect btn" 
        onClick={() => {
          // TODO: Socket is a reserved name!
          socket.emit("disconnected");
          // emitDisconnect();
          window.location.href = '/';
        }}>Disconnect</button>
      </div>
      <div className="body">
        {messages.map((key, index) => {
          return (
            <div classname="msg">
              <div className="msg-info">{key.name}</div>
              <div className="msg-content"
              style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100%', wordBreak: 'break-all' }}>
                {key.content}
              </div>
            </div>
          )
        })}
      </div>
      <div className="msg-enter">
        <form className="msg-inner" onSubmit={handleSubmit}>
          <input className="text" 
            type="text"
            id="text-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}></input>
          <button className="send" type="submit"> Send</button>
        </form>
      </div>
    </div>  
  );
};

export default CreateRoom;
