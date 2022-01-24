import React from "react";
import googlePlayImg from "../../../images/googlePlayImg.png";
import appleStoreImg from "../../../images/appleStoreImg.png";

const Footer = () => {
  return (
    <>
      <div id="footer">
        <div className="left">
          <h3>The Official Bridge Application</h3>
          <p>Catch us on Android and IOS</p>
          <img src={googlePlayImg} alt="Google Play" />
          <img src={appleStoreImg} alt="Apple Store" />
        </div>
        <div className="center">
          <h1>B R I D G E</h1>
          <p>Welcome to our family</p>
          <p>Copyright 2020 &copy; theBridgeTeam</p>
        </div>
        <div className="right">
          <h4>Follow Us</h4>
          <a href="https://www.reddit.com/">Reddit</a>
          <a href="https://www.reddit.com/">Instagram</a>
          <a href="https://www.reddit.com/">Twitter</a>
        </div>
      </div>
    </>
  );
};

export default Footer;
