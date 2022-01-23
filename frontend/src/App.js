import React, { useEffect } from "react";
import Header from "./component/layout/Header";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <Router>
        <Header />
      </Router>
    </>
  );
};

export default App;
