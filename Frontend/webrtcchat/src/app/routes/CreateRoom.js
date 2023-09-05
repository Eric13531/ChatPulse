import React, { useState, useRef } from "react";
import "./CreateRoom.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';



const CreateRoom = () => {
  const [isFocused, setIsFocused] = useState(false)
  
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      window.location.href = '/room'
    }
  };

  return (
    <div className="flex-container">
      <div className="header-container">
        <div className="header">Header Here {focus}</div>
        <FontAwesomeIcon icon="check-square" />
      </div>
      <h1 className="title title-create">Create Room</h1>
      <div className="content" >
        {/* <div className="room-name"> */}
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="text-input" className="label">Enter Name:</label>
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
            <button className="btn btn-primary button blur-effect" type="submit">
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
