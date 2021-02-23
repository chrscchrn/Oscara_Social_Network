import axios from "axios";

export default {
    getUserByEmail: email => {
        return axios.get('/api/user/' + email);
    },
    getUserByHandle: handle => {
        return axios.get('/api/user/handle/' + handle);
    },
    addUser: data => {
        return axios.post('/api/user/add', data);
    },
    getPosts: () => {
        return axios.get('/api/posts');
    },
    makePost: post => {
        return axios.post('/api/posts', post);
    },
    getUsersPosts: data => {
        return axios.get('/api/posts/' + data);
    },
    removePost: id => {
        return axios.delete('/api/posts/' + id);
    },
    likePost: (postId, currentUser) => {
        return axios.get("/api/posts/" + postId + "/" + currentUser)
    },
    replyToPost: data => {
        return axios.post('/api/posts/reply', data);
    },
    getReplies: id => {
        return axios.get("/api/posts/reply/" + id);
    },
}