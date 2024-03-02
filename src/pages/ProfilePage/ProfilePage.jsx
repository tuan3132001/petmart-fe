import { Button } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { WrapperUploadFile } from "./style";
export const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;
  console.log("dataApp", user.name);
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
 
  useEffect(() => {
    if (isSuccess === true) {
      message.successUpdate();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.errorUpdate();
    }
  }, [user.name]);

  
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
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div className="w-[1270px] mx-auto h-[500px]">
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
              Địa chỉ
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
          <Button onClick={handleUpdate} className="mx-auto">
            Cập nhật
          </Button>
        </div>
      </Loading>
    </div>
  );
};
