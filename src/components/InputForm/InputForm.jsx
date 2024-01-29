import { Input } from "antd";
import React, { useState } from "react";

const InputForm = (props) => {
  const [valueInput, setvalueInput] = useState("");
  const { placeholder = "Nhập thông tin", ...rests } = props;
  return <Input placeholder={placeholder} value={valueInput} {...rests} />;
};

export default InputForm;
