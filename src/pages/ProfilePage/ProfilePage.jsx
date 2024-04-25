import { Button, Radio } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons"; 
import { getBase64 } from "../../utils";
import moment from "moment"; 
import { WrapperUploadFile } from "./style";
import { useNavigate } from "react-router-dom";
import { provinces } from "./provinces";
export const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [districtName, setDistrictName] = useState(user?.district || "");
  const [districts, setDistricts] = useState([]);
  const [birthday, setBirthday] = useState(null);
  const navigate = useNavigate();
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const dispatch = useDispatch();
  const { isPending, isSuccess, isError } = mutation;
  const districtsByProvince = {
    "Hà Nội": [
      "Ba Đình",
      "Bắc Từ Liêm",
      "Cầu Giấy",
      "Đống Đa",
      "Hà Đông",
      "Hai Bà Trưng",
      "Hoàn Kiếm",
      "Hoàng Mai",
      "Long Biên",
      "Nam Từ Liêm",
      "Tây Hồ",
      "Thanh Xuân",
      "Sơn Tây",
      "Ba Vì",
      "Chương Mỹ",
      "Đan Phượng",
      "Đông Anh",
      "Gia Lâm",
      "Hoài Đức",
      "Mê Linh",
      "Mỹ Đức",
      "Phú Xuyên",
      "Phúc Thọ",
      "Quốc Oai",
      "Sóc Sơn",
      "Thanh Oai",
      "Thanh Trì",
      "Thường Tín",
      "Ứng Hòa",
    ],
  };

  useEffect(() => {
    if (city === "Hà Nội") {
      setDistricts(districtsByProvince[city]);
    } else {
      setDistricts([]);
    }
  }, [city]);

  useEffect(() => {
    if (city === "Hà Nội") {
      setDistrictName(user?.district || "");
    }
  }, [city, user]);

  

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
    setGender(user?.gender);
    setBirthday(user?.birthday);
    setCity(user?.city);
    setDistrictName(user?.district);
  }, [user]);

  useEffect(() => {
    if (isSuccess === true) {
      message.successUpdate();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.errorUpdate();
    }
  }, [user]);

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
  const handleOnchangeDistrict = (value) => {
    setDistrictName(value);
  };
  const handleOnchangeCity = (value) => {
    setCity(value);
    if (value !== "Hà Nội") {
      // Nếu không phải là "Hà Nội", xóa quận/huyện
      setDistrictName("");
      setDistricts([]); // Đảm bảo rằng danh sách quận/huyện sẽ được xóa khi thành phố không phải là "Hà Nội"
    } else {
      setDistricts(districtsByProvince[value]);
    }
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
        district: districtName,
      },
      access_token: user?.access_token,
    });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="w-[1270px] mx-auto h-[500px] relative">
      <div className="absolute top-[20px] left-[20px]">
        <Button type="text" icon={<LeftOutlined />} onClick={handleGoBack}>
          Trở về
        </Button>
      </div>
      <h1 className="text-[#030] text-[20px] font-bold mt-[4px] mb-[10px] text-center pt-[10px]">
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
              htmlFor="city"
              className="text-[#000] text-[14px] leading-[30px] font-[600]"
              style={{ minWidth: "120px" }}
            >
              Tỉnh, thành phố
            </label>
            <select
              id="city"
              className="text-[14px] border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
              value={city}
              onChange={(e) => handleOnchangeCity(e.target.value)}
            >
              {/* Lặp qua danh sách các tỉnh/thành phố */}
              {provinces.map((province) => (
                <option className="text-[14px]" key={province} value={province}>
                  {province }
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-[20px]">
            <label
              htmlFor="district"
              className="text-[#000] text-[14px] leading-[30px] font-[600] "
              style={{ minWidth: "120px" }}
            >
              Quận, huyện
            </label>
            {/* Kiểm tra nếu là Hà Nội, hiển thị dropdown danh sách quận/huyện từ state districts */}
            {city === "Hà Nội" ? (
              <select
                id="district"
                className="text-[14px] border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            ) : (
              // Ngược lại, hiển thị input để người dùng nhập tay
              <InputForm
                id="district"
                className="text-[14px] border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
                value={districtName}
                onChange={(value) => handleOnchangeDistrict(value)} // Thay đổi thành truyền giá trị vào hàm handleOnchangeDistrict
              />
            )}
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
              className="text-[14px] border-b border-gray-300 focus:outline-none focus:border-none focus:border-b-2 focus:border-blue-500 focus:bg-blue-100"
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
