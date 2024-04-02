import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  shippingAddress: {
  },
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSuccessOrder: false,
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const existingOrderItemIndex = state.orderItems.findIndex(item => item.userId === orderItem.userId && item.product === orderItem.product);
  
      if (existingOrderItemIndex !== -1) {
          // Nếu đã có orderItem cho userId và sản phẩm tương ứng trong giỏ hàng, tăng số lượng
          if (state.orderItems[existingOrderItemIndex].amount + orderItem.amount <= state.orderItems[existingOrderItemIndex].countInStock) {
              // Kiểm tra xem số lượng yêu cầu có vượt quá số lượng có sẵn trong kho không
              state.orderItems[existingOrderItemIndex].amount += orderItem.amount;
              state.isSuccessOrder = true;
              state.isErrorOrder = false;
          } else {
              // Xử lý trường hợp số lượng yêu cầu vượt quá số lượng có sẵn trong kho
              state.isErrorOrder = true;
              state.errorMessage = "Số lượng sản phẩm không đủ";
          }
      } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
          state.orderItems.push(orderItem);
          state.isSuccessOrder = true;
          state.isErrorOrder = false;
      }
  },
  
    resetOrder: (state) => {
      state.isSuccessOrder = false
    },
    increaseAmount: (state, action) => {
      const {idProduct} = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct)
      itemOrder.amount++;
      if(itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const {idProduct} = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct)
      itemOrder.amount--;
      if(itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const {idProduct} = action.payload
      
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
      const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => item?.product !== idProduct)

      state.orderItems = itemOrder;
      state.orderItemsSlected = itemOrderSeleted;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
    
      const updatedOrderItems = state.orderItems.filter(item => !listChecked.includes(item.product));
      const updatedOrderItemsSelected = state.orderItemsSlected.filter(item => !listChecked.includes(item.product));
    
      return {
        ...state,
        orderItems: updatedOrderItems,
        orderItemsSlected: updatedOrderItemsSelected
      };
    },
    selectedOrder: (state, action) => {
      const {listChecked} = action.payload
      const orderSelected = []
      state.orderItems.forEach((order) => {
        if(listChecked.includes(order.product)){
          orderSelected.push(order)
        };
      });
      state.orderItemsSlected = orderSelected
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct,increaseAmount,decreaseAmount,removeOrderProduct,removeAllOrderProduct, selectedOrder,resetOrder } = orderSlide.actions

export default orderSlide.reducer