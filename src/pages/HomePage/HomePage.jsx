import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";

const HomePage = () => {
  const arr = ["Thức ăn", "Quần áo", "Đồ chơi", "Dụng cụ chăm sóc"];
  return (
    <>
      <div style={{ padding: "0 120px" }} className="h-[50px]">
        <div className="flex align-center gap-[24px] justify-start text-[20px] font-bold">
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </div>
      </div>
      <div id="container" className=" bg-[#efefef]" style={{ padding: "0 120px" }}>
        <SliderComponent arrImages={[slide1, slide2]} />
      </div>
    </>
  );
};

export default HomePage;
