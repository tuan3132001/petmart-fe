import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    bordered,
    textbutton,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(0, 56, 168)',
  } = props;
  return (
    <div className="flex">
      <Input
        placeholder={placeholder}
        size={size}
        style={{ backgroundColor: backgroundColorInput }}
        className=" rounded-none"
        {...props}
      />
      <Button
        style={{
          borderRadius: 0,
          backgroundColor: backgroundColorButton,
          border: !bordered && 'none',
          color: 'white',
         
        }}
        size={size}
        icon={<SearchOutlined/>}
      
      ><span >{textbutton}</span>
        
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
