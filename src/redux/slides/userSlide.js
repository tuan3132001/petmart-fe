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
    gender:'',
    birthday:'',
    city:'',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { email, access_token, role, information, _id='', refreshToken = '' } = action.payload;
            if (information) {
                const { name, address, avatar, phone, gender, birthday, city } = information;
                state.name = name || '';
                state.address = address || '';
                state.phone = phone || '';
                state.avatar = avatar || '';
                state.gender = gender || '';
                state.birthday = birthday || '';
                state.city = city || '';
            }
            state.email = email || '';
            state.id = _id || '';
            state.access_token = access_token || '';
            state.role = role || '';
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
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
            state.city = '';
            state.refreshToken = ''
         },
        
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer