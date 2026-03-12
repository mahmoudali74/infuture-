// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

function App() {
  return (
    <div>
      <CustomNavbar />

      <Home />
      <Footer />
    </div>
  );
}

export default App;
