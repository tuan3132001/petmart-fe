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
    role: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
           const {name='', email='', access_token='', address='', avatar='', phone='', _id='',role=''} = action.payload;
           state.name = name;
           state.email = email;
           state.address = address;
           state.phone = phone;
           state.avatar = avatar;
           state.access_token = access_token;
           state.id = _id;
           state.role = role;
         
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.role = '';
         },
        
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer