import { Button, Radio } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons"; // Import LeftOutlined icon
import { getBase64 } from "../../utils";
import moment from 'moment'; // Import moment
import { WrapperUploadFile } from "./style";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  
  const [birthday, setBirthday] = useState(null);
  const navigate = useNavigate()
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
    setGender(user?.gender);
    setBirthday(user?.birthday);
    setCity(user?.city); 
  }, [user]);

  useEffect(() => {
    if (isSuccess === true) {
      message.successUpdate();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.errorUpdate();
    }
  }, [isSuccess, isError]);

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeCity = (value) => { 
    setCity(value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleOnchangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleOnchangeBirthday = (date) => {
    setBirthday(date);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      information: {
        name,
        phone,
        address,
        city,
        avatar,
        gender,
        birthday,
      },
      access_token: user?.access_token,
    });
  };

  const handleGoBack = () => {
    navigate('/')
  };

  return (
    <div className="w-[1270px] mx-auto h-[500px] relative">
      <div className="absolute top-[20px] left-[20px]">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={handleGoBack}
        >
          Trở về 
        </Button>
      </div>
      <h1 className="text-[#030] text-[20px] font-bold mt-[4px] mb-[20px] text-center">
        Thông tin người dùng
      </h1>
      <Loading isPending={isPending}>
        <div className="flex flex-col border-[1px] border-solid border-[#ccc] w-[600px] mx-auto p-[30px] rounded-[10px] gap-[30px]">
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="name"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Tên người dùng
            </label>
            <InputForm
              id="name"
              className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              value={name}
              onChange={handleOnchangeName}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="email"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Email
            </label>
            <InputForm
              id="email"
              className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              value={email}
              onChange={handleOnchangeEmail}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="address"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Số nhà, đường
            </label>
            <InputForm
              id="address"
              className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              value={address}
              onChange={handleOnchangeAddress}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="city" // Thêm label cho trường "city"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Thành phố
            </label>
            <InputForm
              id="city"
              className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              value={city} 
              onChange={handleOnchangeCity}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="phone"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Số điện thoại
            </label>
            <InputForm
              id="phone"
              className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              value={phone}
              onChange={handleOnchangePhone}
              type="number"
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="avatar"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Avatar
            </label>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                className="h-[60px] w-[60px] rounded-[50%] object-cover"
                alt="avatar"
              />
            )}
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="gender"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Giới tính
            </label>
            <Radio.Group
              onChange={handleOnchangeGender}
              value={gender}
              id="gender"
            >
              <Radio value={"Nam"}>Nam</Radio>
              <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
          </div>
          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="birthday"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Ngày sinh
            </label>
            <input
              type="date"
              id="birthday"
              value={birthday ? moment(birthday).format("YYYY-MM-DD") : ""}
              onChange={(e) => handleOnchangeBirthday(moment(e.target.value))}
              className="border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
            />
          </div>
          <Button onClick={handleUpdate} className="mx-auto">
            Cập nhật
          </Button>
        </div>
      </Loading>
    </div>
  );
};
