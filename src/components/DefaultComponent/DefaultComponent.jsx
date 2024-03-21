import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderComponent />
      <div style={{ flex: "1 0 auto", overflowY: "auto" }}>
        {children}
      </div>
    
    </div>
  );
};

export default DefaultComponent;
