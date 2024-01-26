import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import CardComponent from "../../components/CardComponent/CardComponent";

const HomePage = () => {
  const arr = ["Thức ăn", "Quần áo", "Đồ chơi", "Dụng cụ chăm sóc"];
  return (
    <>
      <div style={{ padding: "0 120px" }} className="h-[50px]">
        <div className="flex items-center gap-[24px] justify-start text-[20px] font-bold">
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </div>
      </div>
      <div id="container" className=" bg-[#efefef] h-[1000px]" style={{ padding: "0 120px" }}>
        <SliderComponent arrImages={[slide1, slide2]} />
        <div className="mt-[20px] flex items-center gap-[20px]">
          <CardComponent/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
