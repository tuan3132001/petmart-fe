import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone:'',
    address:'',
    avatar:'',
    access_token: '',
    refreshToken: '',
    id: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
           const {name='', email='', access_token='', address='', avatar='', phone='', _id=''} = action.payload;
           state.name = name;
           state.email = email;
           state.address = address;
           state.phone = phone;
           state.avatar = avatar;
           state.access_token = access_token;
           state.id = _id;
         
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
         },
        
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer