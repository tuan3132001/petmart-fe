import React, { useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
const SignUpPage = () => {
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex items-center justify-center bg-[rgba(0,0,0,0.53)] h-[100vh]">
      <div className="w-[800px] h-[445px] rounded-[6px] bg-white flex">
        <div className="flex-1 p-[40px] md:p-[45px] pb-[24px] flex flex-col">
          <h4 className="font-[500] text-[24px] ">Xin chào,</h4>
          <p className="mt-[15px] mb-[10px] text-[15px] font-[400]">
            Tạo tài khoản
          </p>
          <InputForm
            className="mb-[10px] border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
            placeholder="abc@gmail.com"
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
            >
              {isShowPassword ? (
                <EyeFilled className="text-[13px]" />
              ) : (
                <EyeInvisibleFilled className="text-[13px]" />
              )}
            </span>
            <InputForm
              className="border-b mb-[10px] border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              // onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? (
                <EyeFilled className="text-[13px]" />
              ) : (
                <EyeInvisibleFilled className="text-[13px]" />
              )}
            </span>
            <InputForm
              className='className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"'
              placeholder="comfirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              // onChange={handleOnchangeConfirmPassword}
            />
          </div>

          <button className="bg-red-500 hover:bg-red-700 text-white text-[15px] leading-[28px] py-2 px-4 rounded-[4px] font-[700] border-none transition duration-300 ease-in-out h-[48px] w-[100%] my-[26px] mb-[10px]">
            Đăng ký
          </button>
          <p className="text-[13px]">
            Bạn đã có tài khoản?{" "}
            <span className="text-blue-500 text-[13px] cursor-pointer">
              Đăng nhập
            </span>
          </p>
        </div>
        <div className="w-[300px] flex justify-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex-col items-center gap-[4px] ">
          <Image
            src={imageLogo}
            preview={false}
            alt="logo"
            style={{ width: "203px", height: "203px" }}
          />
          <h4 className="text-[17px] text-[#0B74E5] leading-[1.15] text-normal">
            Mua sắm tại PetMart
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
