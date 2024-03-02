import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    bordered,
    textButton,
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
      
      ><span >{textButton}</span>
        
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
