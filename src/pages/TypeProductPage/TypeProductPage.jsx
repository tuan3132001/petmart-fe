import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";

const TypeProductPage = () => {
  const onChange = () => {};
  return (
    <div style={{padding: '0 120px'}} className=' bg-[#efefef]'>
      <Row
        style={{  paddingTop: "10px" }}
        className="bg-[#efefef] flex-nowrap"
      >
        <Col
          span={4}
          className="bg-[#fff] mr-[50px] p-[10px] rounded-[6px] h-[fit-content] mt-[20px] w-full"
        >
          <NavbarComponent />
        </Col>
        <Col span={20}>
        <div className="flex gap-[15px] mt-[20px] flex-wrap">
          {" "}
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <Pagination
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={onChange}
        className='mt-[50px] text-center'
      />
        </Col>
      </Row>
      
    </div>
  );
};

export default TypeProductPage;
