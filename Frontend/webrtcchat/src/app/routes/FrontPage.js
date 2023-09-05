import React from "react";
import "./FrontPage.css"

const FrontPage = () => {
  const newRoom = () => {
    window.location.href = '/create'
  }

  const blurElements = document.querySelectorAll('.blur-effect');
  blurElements.forEach(element => {
    element.addEventListener('mouseleave', (e) => {
      element.blur()
    });
  });

  return (
    <div className="flex-container">
      <div className="header-container">
        <div className="header">Header Here</div>
      </div>
      <h1 className="title">Web RTC App</h1>
      <div className="content" >
        <button onClick={newRoom} className="button btn btn-primary button blur-effect">
          <div className= "button-label">CREATE SERVER</div>
        </button>
        <button onClick={() => {
          window.location.href = '/room'
        }} className="btn btn-primary button blur-effect">
          <div className= "button-label">ENTER SERVER</div>
        </button>
      </div>
    </div>  
  );
};

export default FrontPage;
