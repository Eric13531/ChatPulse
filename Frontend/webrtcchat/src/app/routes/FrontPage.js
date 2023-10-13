import React, { useEffect, useState, useContext } from "react";
import "./FrontPage.css"

import SocketContext from "../components/socketContext";
// import {connectSocket, disconnectSocket, onConnected, emitConnected, onMessage, emitMessage, emitDisconnect} from "../components/socketService"
import { Link, useNavigate } from "react-router-dom";

const FrontPage = () => {
  const [showText, setShowText] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); 
  const socket = useContext(SocketContext)

  const newRoom = () => {
    console.log(socket.id)
    // window.location.href = '/create'
    navigate('/create')
  }

  const blurElements = document.querySelectorAll('.blur-effect');
  blurElements.forEach(element => {
    element.addEventListener('mouseleave', (e) => {
      element.blur()
    });
  });

  useEffect(() => {
    socket.on('connectCallback', (data) => {
      console.log("Connected!");
      // window.location.href = '/room';
      navigate('/room')
    })

    console.log(socket.id);

    // onConnected((data) => {
    //   console.log("Connected!")
    //   window.location.href = '/room'
    // })
  }, [])

  return (
    <div className="flex-container">
      <div className="header-container front-page">
        <div className="header"></div>
      </div>
      <h1 className="title">ChatPulse</h1>
      <div className="content" >
        {/* <button onClick={newRoom} className="button btn btn-primary button blur-effect">
          <div className= "button-label">CREATE SERVER</div>
        </button> */}
        {showText ? 
        <form className="form front-page"
        onSubmit={(e) => {
              e.preventDefault();
              console.log("emitted value:", inputValue)
              console.log(socket.id)
              socket.emit('connected', { room: inputValue });
              // emitConnected({room: inputValue})
              
              // Dev comment:
              // window.location.href = '/room';
        }}>
        <input 
              className="name-input front-page"
              type="text"
              id="text-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}

              style={{"padding-left": '0.4vw', "padding-bottom": "0.2vh"}}></input> 

              <button type="submit" className="btn button btn-secondary">SUBMIT</button>
        </form>
         : 
        <button onClick={() => {
          setShowText(true);
        }} className="btn btn-primary button blur-effect">
          <div className= "button-label">ENTER SERVER</div>
        </button>}
        
      </div>
    </div>  
  );
};

export default FrontPage;
