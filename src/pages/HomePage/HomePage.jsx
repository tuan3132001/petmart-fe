import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import slide3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Button, Menu } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import Footer from "../../components/FooterComponent/FooterComponent";
import { usePrevious } from "../../hooks/usePrevious";
import "./HomePage.css";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [typeProducts, setTypeProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [menuVisible, setMenuVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const prevMenuVisible = usePrevious(menuVisible);
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    try {
      const res = await ProductService.getAllProduct(search, limit);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (menuVisible && !prevMenuVisible) {
      const interval = setInterval(() => {
        setHighlightedIndex((prevIndex) =>
          prevIndex === typeProducts.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [menuVisible, prevMenuVisible, typeProducts.length]);

  const {
    isPending,
    data: products,
    isFetching,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    config: {
      retries: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    },
  });

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  return (
    <Loading isPending={isPending || loading}>
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
          <SliderComponent
            arrImages={[slide1, slide2, slide3]}
            style={{ width: "100%", minWidth: "300px", maxWidth: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s",
                borderWidth: "1px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={toggleMenu}
              className="font-bold text-[20px]"
            >
              Danh mục sản phẩm
            </Button>
          </div>

          {/* Menu */}
          <Menu
            style={{
              left: menuVisible ? 0 : -300,
              transition: "left 0.5s",
              position: "fixed",
              top: 0,
              bottom: 0,
              zIndex: 1000,
              width: 300,
              marginTop: 50,
              marginBottom: 150,
              border: "1px solid #82cfff", 
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 10, 
            }}
          >
           
            <div style={{ height: 50 }}></div>
            {/* Content of the menu */}
            <h1 className="text-center text-[20px] font-bold mb-[50px]">Loại sản phẩm </h1> 
            {typeProducts.map((item, index) => (
              <Menu.Item
                key={item._id}
                className={`text-[15px] ${
                  menuVisible ? "menu-item-highlight" : ""
                }`}
                style={{
                  borderBottom:
                    index < typeProducts.length - 1
                      ? "1px solid rgba(0, 0, 0, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                
                <TypeProduct name={item.name} id={item._id} />
              </Menu.Item>
            ))}
          </Menu>

          <h1
            className="text-[20px] font-[700] mt-[25px] mb-4"
            style={{
              borderBottom: "1px solid #ccc",
              width: "100%",
              marginBottom: "40px",
              paddingBottom: "20px",
            }}
          >
            {" "}
            Sản phẩm bán chạy
          </h1>
          <div
            className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]"
            style={{ width: "100%", minWidth: "300px", maxWidth: "100%" }}
          >
            {products?.data
              ?.sort((a, b) => b.selled - a.selled)
              .map((product) => (
                <CardComponent
                  key={product._id}
                  costPrice={product.costPrice}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  status={product.status}
                  type={product.type}
                  unit={product.unit}
                  id={product._id}
                  selled={product.selled}
                  promotion={product.promotion}
                  style={{ minWidth: "200px" }}
                />
              ))}
          </div>
          <div
            className="w-[100%] flex items-center mt-[10px] justify-center mb-[50px]"
            style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}
          >
            <Button
              type="primary"
              ghost
              className="rounded-[4px] w-[240px] h-[38px] mt-[20px] mb-[20px] hover:bg-blue-500 hover:border-blue-500 hover:text-white"
              onClick={() => setLimit((prevLimit) => prevLimit + 6)}
              disabled={
                products && products.data && products.data.length < limit
              }
            >
              Xem thêm
            </Button>
          </div>
        </div>
        <div
          className="text-left mt-[20px] mb-4 ml-4"
          style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}
        >
          <h2
            className="text-[20px] font-[700] mb-[25px] mt-[30px]"
            style={{
              borderBottom: "1px solid #ccc",
              width: "100%",
              marginBottom: "40px",
              paddingBottom: "20px",
            }}
          >
            Chính sách giao hàng của PetMart
          </h2>
        </div>
        <div
          className="flex justify-between w-full"
          style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}
        >
          <div className="w-[570px] h-[750px] bg-[white] p-4 ml-1 rounded-xl mb-[60px] border border-gray-300">
            <div>
              <img
                src="https://www.petmart.vn/wp-content/uploads/2023/09/chinh-sach-giao-hang-petmart1.jpg"
                alt=""
              />
              <p className="text-[17px] font-[500] mb-[30px] mt-[30px]">
                Áp dụng theo chính sách giao hàng thông qua các đối tác giao
                hàng như <span className="text-[blue]">FAST, GOJEK...</span> bao gồm các Quận, Huyện, Xã và tất cả
                các tỉnh thành.
              </p>
              <p className="text-[17px] font-[500] mb-[30px]">
              <span className="text-[blue]">Pet Mart</span> giao hàng miễn phí đối với đơn hàng trên 500,000₫.
                10,000₫ cho đơn hàng dưới 200,000₫ và 20,000₫ cho đơn hàng từ
                200,000₫ trở lên.
              </p>
              <p className="text-[17px] font-[500]">
                Phí vận chuyển đã bao gồm 10% VAT và phí dịch vụ COD nếu giá trị
                đơn hàng trên 2,000,000₫ (tùy theo quy định của mỗi bên đối tác
                giao hàng).
              </p>
            </div>
          </div>
          <div className="w-[570px] h-[750px] bg-[white] p-4 mr-1 rounded-xl border border-gray-300">
            <p className="text-[17px] font-[500] mb-[30px] mt-[30px]">
              Thời gian giao hàng tối đa trong vòng 24 giờ tính từ lúc quý khách
              xác nhận đặt mua hàng.
            </p>
            <p className="text-[17px] font-[500] mb-[30px]">
              Khách hàng có thể thanh toán trực tiếp hoặc chuyển khoản qua ngân
              hàng. Với một số đơn hàng khác có thể thanh toán sau khi nhận
              hàng.
            </p>
            <img
              src="https://www.petmart.vn/wp-content/uploads/2023/09/chinh-sach-giao-hang-petmart.jpg"
              alt=""
            />
          </div>
        </div>

        <div
          className="text-left mt-[20px] mb-4 ml-4"
          style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}
        >
          <h2
            className="text-[20px] font-[700] mb-[25px] mt-[30px]"
            style={{
              borderBottom: "1px solid #ccc",
              width: "100%",
              marginBottom: "40px",
              paddingBottom: "20px",
            }}
          >
            Hệ thống của hàng
          </h2>
        </div>
        <div
          className="flex justify-between w-full"
          style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}
        >
          <div className="w-[570px] h-[750px] bg-[#00205B] p-4 ml-1 rounded-xl mb-[60px]">
            <h2 className="text-white text-[20px] font-[700] mb-[15px]">
              {" "}
              📍 Pet Mart tại Hà Nội (12)
            </h2>

            <li className="text-white text-[15px] mb-[10px]">
              3 Đại Cồ Việt, Phường Cầu Dền, Quận Hai Bà Trưng
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              476 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              83 Nghi Tàm, Phường Yên Phụ, Quận Tây Hồ
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              206 Kim Mã, Phường Kim Mã, Quận Ba Đình
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              18 Chả Cá, Phường Hàng Đào, Quận Hoàn Kiếm
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              242 Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              290 Nguyễn Văn Cừ, Phường Bồ Đề, Quận Long Biên
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              81 Quang Trung, Phường Quang Trung, Quận Hà Đông
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              Villa E10 Đỗ Đình Thiện, Phường Mỹ Đình, Quận Nam Từ Liêm
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              SH12A - S2.03 Vinhomes Smart City, Phường Tây Mỗ, Quận Nam Từ Liêm
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              SH02 - S2.08 Vinhomes Ocean Park, Xã Đa Tốn, Huyện Gia Lâm
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              324 Hồ Tùng Mậu, Phường Phú Diễn, Quận Bắc Từ Liêm - Cầu Giấy
            </li>

            <h2 className="text-white text-[20px] font-[700] mt-[25px] mb-[15px]">
              {" "}
              📍 Pet Mart tại Đà Nẵng (1)
            </h2>
            <li className="text-white text-[15px] mb-[10px]">
              151 Nguyễn Văn Linh, Phường Nam Dương, Quận Hải Châu
            </li>
            <h2 className="text-white text-[20px] font-[700] mt-[25px] mb-[15px]">
              {" "}
              📍 Pet Mart tại Hải Phòng (1)
            </h2>
            <li className="text-white text-[15px] mb-[10px]">
              177 Tô Hiệu, Phường Trại Cau, Quận Lê Chân
            </li>
          </div>
          <div className="w-[570px] h-[750px] bg-[#00205B] p-4 mr-1 rounded-xl">
            <h2 className="text-white text-[20px] font-[700] mb-[15px] ">
              📍 Pet Mart tại TP.Hồ Chí Minh (20)
            </h2>

            <li className="text-white text-[15px] mb-[10px]">
              14P Quốc Hương, Phường Thảo Điền, Quận 2
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              244 Khánh Hội, Phường 6, Quận 4
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              347 Nguyễn Trãi, Phường 7, Quận 5
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              180 Hậu Giang, Phường 6, Quận 6
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              489 Nguyễn Thị Thập, Phường Tân Phong, Quận 7
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              84 Phan Khiêm Ích, Phường Tân Phong, Quận 7
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              378 Phạm Hùng, Phường 5, Quận 8
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              116 Ba Tháng Hai, Phường 12, Quận 10
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              257 Lê Đại Hành, Phường 13, Quận 11
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              1387 Nguyễn Ảnh Thủ, Phường Trung Mỹ Tây, Quận 12
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              252 Quang Trung, Phường 10, Quận Gò Vấp
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              938 Cách Mạng Tháng 8, Phường 5, Quận Tân Bình
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              217 Phan Đăng Lưu, Phường 1, Quận Phú Nhuận
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              179 Xô Viết Nghệ Tĩnh, Phường 17, Quận Bình Thạnh
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              359 Lũy Bán Bích, Phường Hiệp Tân, Quận Tân Phú
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              284 Võ Văn Ngân, Phường Bình Thọ, Quận Thủ Đức
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              544 Lê Văn Việt, Phường Long Thạnh Mỹ, Quận 9 Thủ Đức
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              150 Đỗ Xuân Hợp, Phường Phước Long A, Quận 9 Thủ Đức
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              38 Đường 17A, Phường Bình Trị Đông B, Quận Bình Tân
            </li>
            <li className="text-white text-[15px] mb-[10px]">
              779 Lê Trọng Tấn, Phường Bình Hưng Hòa, Quận Bình Tân
            </li>
          </div>
        </div>
      </div>

      <df-messenger
        intent="WELCOME"
        chat-title="PetMart_Shop"
        agent-id="5b506500-8b0f-4062-a68c-3e92288916a6"
        language-code="en"
      ></df-messenger>

      <Footer />
    </Loading>
  );
};

export default HomePage;
