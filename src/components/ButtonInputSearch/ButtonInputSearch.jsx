import { Button, Input } from "antd";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SearchOutlined } from "@ant-design/icons";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    bordered,
    textbutton,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(0, 56, 168)',
    onChange  
  } = props;
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onChange(searchValue); 
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex"
    >
      <div style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <Input
            placeholder={placeholder}
            size={size}
            style={{
              backgroundColor: backgroundColorInput,
              borderRadius: '20px 0 0 20px',
              borderRight: 'none', 
            }}
            className="rounded-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
          />
        </div>
        <Button
          style={{
            borderRadius: 0,
            backgroundColor: backgroundColorButton,
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            border: !bordered && 'none',
            color: 'white',
          }}
          size={size}
          icon={<SearchOutlined/>}
          onClick={handleSearch} 

        >
          <span>{textbutton}</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ButtonInputSearch;
