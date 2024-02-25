import { message } from "antd";

const success = (mes = 'Đăng ký tài khoản thành công') => {
    message.success(mes);
};

const error = (mes = 'Lỗi không đăng ký được tài khoản') => {
    message.error(mes);
};

const warning = (mes = 'Warning') => {
    message.warning(mes);
};

export { success, error, warning }