import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FullscreenExitOutlined,
  HeartFilled,
  CheckOutlined,
} from "@ant-design/icons";
import Footer from "../../components/FooterComponent/FooterComponent";
export const IntroductionPage = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const introductionRef = useRef(null);

  const handleScrollToIntroduction = () => {
    introductionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
        <button onClick={scrollToTop} className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
       
      </button>
      <h1  ref={introductionRef}
      className="font-bold text-center mt-[20px]  text-[25px] bg-gray-200 pt-[15px] pb-[15px] ml-[20px] mr-[20px]">
        GIỚI THIỆU VỀ PET MART
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col p-4 rounded-lg ml-[20px] border border-gray-300">
          <p
            className="text-[18px] font-[400]"
            style={{ whiteSpace: "pre-line" }}
          >
            Một trong những điều truyền cảm hứng nhất về{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Pet Mart
            </span>{" "}
            là mọi thứ chúng tôi làm để hướng tới sứ mệnh của mình. Chúng tôi
            yêu thú cưng và cam kết cung cấp các sản phẩm, dịch vụ, kết nối và
            chăm sóc mà khách hàng và thú cưng cần trong mọi giai đoạn của cuộc
            đời.{"\n"}
            {"\n"}
            Niềm đam mê dành cho thú cưng này là một phần lý tưởng đích thực và
            là động lực trong hoạt động kinh doanh của chúng tôi. Pet Mart là
            câu chuyện mà rất nhiều người đã nói về chúng tôi là ai và chúng tôi
            làm gì.{"\n"}
            {"\n"}
            Lịch sử của Pet Mart là một câu chuyện thành công khi chúng tôi là
            tập hợp những người yêu động vật biết nắm lấy cơ hội đúng lúc cùng
            với tầm nhìn xa phát triển nâng tầm thành một doanh nghiệp.{"\n"}
            {"\n"}
            Bắt đầu từ cửa hàng nhỏ đầu tiên tại Hà Nội năm 2011, chúng tôi đã
            chứng kiến và tạo ra nhiều thay đổi thú vị trong ngành công nghiệp
            và dịch vụ chăm sóc thú cưng tại Việt Nam.
          </p>
        </div>
        <div className="col p-4 rounded-lg mr-[20px] border border-gray-300">
          {/* Thêm phần ảnh vào đây */}
          <img
            src="https://www.petmart.vn/wp-content/uploads/2023/08/hoi-dap-thu-y-mien-phi1.jpg"
            alt="Description of image"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="rounded-lg mr-[20px] border border-gray-300 ml-[20px] mt-[30px]">
        <div className="flex">
          <FullscreenExitOutlined className="text-[20px] mr-[5px] ml-[5px]" />
          <h1 className="text-[20px] font-bold  mt-[10px] mb-[10px]">
            TẦM NHÌN CỦA CHÚNG TÔI
          </h1>
        </div>
        <hr className="border-gray-300 my-2" />

        <li className="text-[18px] font-[400] ml-[5px] mt-[10px] mb-[10px]">
          Chúng tôi tin rằng đó là nhiệm vụ của chúng tôi để đảm bảo sức khỏe và
          hạnh phúc cho thú cưng. Giúp chúng thật sự hiểu rằng chúng đang được
          yêu thương và an toàn.
        </li>
        <li className="text-[18px] font-[400] ml-[5px]  mt-[10px] mb-[10px]">
          Chúng tôi tin rằng thú cưng sẽ làm cho con người tốt đẹp hơn. Chúng sẽ
          làm phong phú thêm cho cuộc sống của chúng ta và xây dựng xã hội văn
          minh, phát triển.
        </li>
        <li className="text-[18px] font-[400] ml-[5px]  mt-[10px] mb-[10px]">
          Chúng tôi tin tưởng vào những gì chúng tôi đang làm dựa trên những giá
          trị tiêu chuẩn trong việc chăm sóc động vật. Chất lượng sản phẩm và
          chăm sóc khách hàng.
        </li>
      </div>
      <div className="rounded-lg mr-[20px] border border-gray-300 ml-[20px] mt-[30px] bg-blue-200">
        <div className="flex">
          <HeartFilled className="text-[20px] mr-[5px] ml-[5px]" />
          <h1 className="text-[20px] font-bold mt-[10px] mb-[10px]">
            CAM KẾT CỦA CHÚNG TÔI
          </h1>
        </div>
        <hr className="border-gray-400 my-2" />

        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="card bg-white p-4 rounded-lg">
            <img
              src="https://www.petmart.vn/wp-content/uploads/2023/08/khach-san-thu-cung02.jpg"
              alt="Description of image"
              className="w-full h-auto"
            />
            <p className="text-[15px] text-center font-[400]">
              Pet Mart cung cấp những sản phẩm và dịch vụ chất lượng tốt nhất
              dành cho thú cưng.
            </p>
          </div>
          <div className="card bg-white p-4 rounded-lg">
            <img
              src="https://www.petmart.vn/wp-content/uploads/2020/02/chi-phi-cac-khoa-hoc-cat-tia-long-cho-tphcm-va-ha-noi3.jpg"
              alt="Description of image"
              className="w-full h-auto"
            />
            <p className="text-[15px] text-center font-[400]">
              Phát triển nhiều loại dịch vụ phong phú để giúp cho cuộc sống của
              thú cưng đầy đủ và hạnh phúc hơn.
            </p>
          </div>
          <div className="card bg-white p-4 rounded-lg">
            <img
              src="https://www.petmart.vn/wp-content/uploads/2023/08/khach-san-thu-cung01.jpg"
              className="w-full h-auto"
            />
            <p className="text-[15px] text-center font-[400]">
              Xây dựng và mở rộng hệ thống các cửa hàng với những tiện ích tốt
              nhất cho thú cưng.
            </p>
          </div>
          <div className="card bg-white p-4 rounded-lg">
            <img
              src="https://www.petmart.vn/wp-content/uploads/2023/08/khach-san-thu-cung03.jpg"
              alt="Description of image"
              className="w-full h-auto"
            />
            <p className="text-[15px] text-center font-[400]">
              Không ngừng sáng tạo để đáp ứng tốt hơn nữa nhu cầu của vật nuôi
              và mong muốn của khách hàng.
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg mr-[20px] border border-gray-300 ml-[20px] mt-[30px] ">
        <div className="flex">
          <CheckOutlined className="text-[20px] mr-[5px] ml-[5px]" />
          <h1 className="text-[20px] font-bold  mt-[10px] mb-[10px]">
            ĐỊNH HƯỚNG CỦA CHÚNG TÔI
          </h1>
        </div>
        <hr className="border-gray-300 my-2" />
        <p className="mt-[10px] ml-[10px] text-[16px] font-[400]">
          Chúng tôi tin rằng với khả năng tư vấn, giao tiếp và cung cấp dịch vụ
          tốt nhất cho khách hàng sẽ dẫn đến kết quả tài chính vững mạnh và phát
          triển lâu dài. Pet Mart đánh giá những yếu tố góp phần phát triển cho
          công ty ở 4 cấp độ:
        </p>
        <ol
          style={{ listStyleType: "decimal" }}
          className="mt-[10px] mb-[15px] text-[16px] ml-[25px]"
        >
          <li className="mb-[15px]">
            <span className="font-bold">Hiệu quả quản lý lãnh đạo:</span> Chúng
            tôi mong muốn lựa chọn, phát triển và giữ chân những nhân sự tốt
            nhất từ mọi bộ phận để thúc đẩy sự đổi mới phát triển chuyên môn,
            tập trung vào thành kiến vô thức cũng như sự đa dạng và hòa nhập.
            Thúc đẩy môi trường làm việc theo nhóm chuyên nghiệp. Không ngừng
            tái cơ cấu quản lý, chia sẻ tích lũy kinh nghiệm để tạo ra hiệu quả
            giá trị cho công việc.
          </li>
          <li className="mb-[15px]">
            <span className="font-bold">Tâm huyết với nghề:</span> Chúng tôi
            mong muốn lựa chọn, phát triển và giữ chân những nhân sự tốt nhất từ
            mọi bộ phận để thúc đẩy sự đổi mới phát triển chuyên môn, tập trung
            vào thành kiến vô thức cũng như sự đa dạng và hòa nhập. Coi trọng,
            đánh giá và khen thưởng những người có đóng góp tuyệt vời cho công
            ty. Xây dựng những chính sách đãi ngộ tốt nhất cho nhân sự gắn bó
            lâu dài.
          </li>
          <li className="mb-[15px]">
            <span className="font-bold">Giá trị của khách hàng:</span> Chúng tôi
            yêu thú cưng và chúng tôi tin rằng thú cưng khiến chúng ta trở thành
            những người tốt hơn. Pet Mart là đối tác đáng tin cậy của đối tác,
            khách hàng và thú cưng trong mọi khoảnh khắc của cuộc sống. Hãy giữ
            cho khách hàng quay trở lại và đem lại những giá trị thiết thực
            nhất.
          </li>
          <li className="mb-[15px]">
            <span className="font-bold">Điều hành tăng trưởng lợi nhuận:</span>{" "}
            Chúng ta luôn muốn trải nghiệm những điều mới và học hỏi từ những
            sai lầm cũ. Mỗi ngày là một cơ hội để trở nên tốt hơn. Đó chính là
            yếu tố quyết định sự phát triển của doanh nghiệp trong tương lai.
          </li>
        </ol>
      </div>
      <div className="rounded-lg mr-[20px] border border-gray-300 ml-[20px] mt-[30px] bg-[#00205B] mb-[80px]">
        <div className="flex">
          <h1 className="text-[20px] font-bold ml-[10px]  mt-[10px] mb-[10px] text-white">
            CÔNG TY TNHH PET MART VIỆT NAM
          </h1>
        </div>
        <hr className="border-gray-300 my-2" />
        <p className="mt-[10px] ml-[10px] text-[16px] font-[400] text-white">
          Tên giao dịch: PET MART VIET NAM CO., LTD
          <br />
          Giấy chứng nhận ĐKKD số: 0106683363 do Sở KH & ĐT Hà Nội cấp ngày
          05/11/2014.
        </p>
        <li className="mb-[15px] mt-[15px] text-[16px] ml-[25px] text-white">CHI NHÁNH TẠI THÀNH PHỐ HỒ CHÍ MINH – Mã số chi nhánh: 0106683363-001 do Sở KH & ĐT Thành Phố Hồ Chí Minh cấp ngày 17/06/2016.</li>
        <li className="mb-[15px] text-[16px] ml-[25px] text-white">CHI NHÁNH TẠI THÀNH PHỐ ĐÀ NẴNG – Mã số chi nhánh: 0106683363-002 do Sở KH & ĐT Thành Phố Đà Nẵng cấp ngày 30/08/2018.</li>
        <li className="mb-[15px] text-[16px] ml-[25px] text-white">CHI NHÁNH TẠI THÀNH PHỐ HẢI PHÒNG – Mã số chi nhánh: 0106683363-003 do Sở KH & ĐT Thành Phố Hải Phòng cấp ngày 20/09/2019.</li>
      </div>
      <Footer />
    </div>
  );
};
