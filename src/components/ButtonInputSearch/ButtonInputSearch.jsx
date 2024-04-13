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
  } = props;

  const [isFocused, setIsFocused] = useState(false);

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
              borderRadius: '20px',
              border: '2px solid', // Add border to make sure it's visible
              borderColor: isFocused ? backgroundColorButton : 'transparent', // Change border color when focused
              transition: 'border-color 0.2s ease-in-out', // Add transition for smooth effect
              transform: isFocused ? 'scale(1.05)' : 'scale(1)', // Scale effect when focused
              transition: 'transform 0.2s ease-in-out', // Add transition for smooth effect
              '&:hover': {
                transform: 'scale(1.05)', // Scale effect when hovered
              }
            }}
            className="rounded-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ButtonInputSearch;
