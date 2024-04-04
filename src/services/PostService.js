import axios from "axios";
import { axiosJWT } from "./UserService";
export const getAllPost = async () => {
    const res = await axios.get(`http://localhost:3000/post/get-post`)
    return res.data
}



export const getAllComment = async (postId) => {
    const res = await axios.get(`http://localhost:3000/comment/get-comment?post=${postId}`);
    return res.data
}


export const postComment = async (userId,commentContent,postId,token) => {
    console.log('post',token)
    const res = await axiosJWT.post(`http://localhost:3000/comment/add/${userId}`,
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

export const getDetailsPost = async (id) => {
    const res = await axios.get(`http://localhost:3000/post/get-detail-post/${id}`)
    return res.data
}
