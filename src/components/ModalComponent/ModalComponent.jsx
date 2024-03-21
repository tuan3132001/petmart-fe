import { Modal } from 'antd';
import React from 'react';

const ModalComponent = ({ title = 'Modal', isOpen = false, children, okButtonProps, ...rests }) => {
    return (
        <Modal
            title={<div style={{ textAlign: 'center' }}>{title}</div>} 
            visible={isOpen}
            okButtonProps={{ style: { backgroundColor: '#52c41a', borderColor: '#52c41a' }, ...okButtonProps }}
            {...rests}
        >
            {children}
        </Modal>
    );
};

export default ModalComponent;
