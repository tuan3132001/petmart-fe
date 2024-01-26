import { Checkbox, Rate } from "antd";
import React from "react";

const NavbarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return (
            <h1 className="text-[rgb(56,56,61)] text-[12px] font-[400]">
              {option}
            </h1>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group className="w-full flex flex-col" onChange={onChange}>
            {options.map((option) => {
              return (
                <Checkbox className="ml-0" value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div className="flex gap-[4px]">
              <Rate className="text-[12px]" disabled defaultValue={option} />
              <span>Từ {option} sao</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return (
            <div className="rounded-[10px] text-[rgb(56,56,61)] bg-[rgb(238,238,238)] w-fit p-[4px]">
              {option}
            </div>
          );
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <h4 className="text-[rgb(56,56,61)] text-[14px] font-[500] ">Label</h4>
      <div className="flex flex-col gap-[12px]">
        {renderContent("text", [
          "Thức ăn",
          "Đồ chơi",
          "Phụ kiện",
          "Dụng cụ chăm sóc",
        ])}
      </div>
      <div className="flex flex-col gap-[12px]">
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
        ])}
      </div>
      <div className="flex flex-col gap-[12px]">
        {renderContent("star", [3, 4, 5])}
      </div>
      <div className="flex flex-col gap-[12px]">
        {renderContent("price", ["dưới 100.000", "trên 100.000"])}
      </div>
    </div>
  );
};

export default NavbarComponent;
