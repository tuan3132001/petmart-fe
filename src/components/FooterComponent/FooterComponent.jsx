import React from 'react';
import backgroundImage from "../../assets/images/headerLogo.jpg"; 
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: '100%',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        height: '100%'
      }}
    >
      
      <div>
        <h1 onClick={() => navigate('sign-in')} style={{ textAlign: 'center', marginTop: '20px', color: '#006CE4', fontSize: '15.4px', cursor: 'pointer', fontWeight:'bold' }}>Đăng nhập vào PetMart</h1>
      </div>
      <div style={{ marginTop: '20px', fontSize: '11.2px', color: '#6B6B6B' }}>Bản quyền © 2001–20234 Petmart.com™. Bảo lưu mọi quyền.</div>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '12px', color: '#6B6B6B', marginTop: '20px' }}>Petmart.com là shop phụ kiện thú cưng hàng đầu thành phố về chất lượng và các dịch vụ liên quan.</h1>
      </div>
      <div>
        <ul style={{ display: 'flex', gap: '30px', marginTop: '42px', marginBottom: '20px' }}>
          <li><img className='h-[40px] w-[155px]' src="https://www.petmart.vn/wp-content/uploads/2019/10/dmca-compliant.png" alt="" /></li>
          <li><img className='h-[40px] w-[155px]' src="https://www.petmart.vn/wp-content/uploads/2019/10/dmca-protecte.png?ID=785ceaee-9d79-4b8a-9ab1-a09991c670a3" alt="" /></li>
          <li><img className='h-[40px] w-[155px]' src="https://www.petmart.vn/wp-content/uploads/2017/01/bo-cong-thuong.png" alt="" /></li>
          <li><img className='h-[70px] w-[75px]' src="https://www.petmart.vn/wp-content/uploads/2020/09/VNCLC.png" alt="" /></li>
          
        </ul>
      </div>
    </div>
  );
};

export default Footer;
