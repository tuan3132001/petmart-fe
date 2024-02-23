import { Input } from "antd";
import React from "react";

const InputForm = (props) => {
  const { placeholder = "Nhập thông tin", ...rests } = props;
  const handleOnChangeinput =(e) =>{
    props.onChange(e.target.value)
  }
  return (
    <Input
      placeholder={placeholder}
      value={props.value}
      {...rests}
      onChange={handleOnChangeinput}
    />
  );
};

export default InputForm;
