import axios from "axios";
import { axiosJWT } from "./UserService";
export const getAllPost = async () => {
    const res = await axios.get(`https://petmart-be.onrender.com/post/get-post`)
    return res.data
}



export const getAllComment = async (postId) => {
    const res = await axios.get(`https://petmart-be.onrender.com/comment/get-comment?post=${postId}`);
    return res.data
}


export const postComment = async (userId,commentContent,postId,token) => {
    console.log('post',token)
    const res = await axiosJWT.post(`https://petmart-be.onrender.com/comment/add/${userId}`,
    {
        content: commentContent,
        post: postId,  
    },  
    {
        headers: {
            token: `Bearer ${token}`,
          },    
    }
    );
    return res.data
}

export const deleteComment = async (userId,cmtId,token) => {
    const res = await axios.delete(`https://petmart-be.onrender.com/comment/delete/${userId}/${cmtId}`,
    {
        headers: {
            token: `Bearer ${token}`,
          },    
    }
);
    return res.data
}

export const updateComment = async (userId,cmtId,token,data) => {
    console.log('data',userId)
    const res = await axios.put(`https://petmart-be.onrender.com/comment/update/${userId}/${cmtId}`,
    data,
    {
        headers: {
            token: `Bearer ${token}`,
          },    
    }
);
    return res.data
}

export const getDetailsPost = async (id) => {
    const res = await axios.get(`https://petmart-be.onrender.com/post/get-detail-post/${id}`)
    return res.data
}
