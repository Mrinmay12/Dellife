import apiUrl from "../ApiAxios";

export const userRegister=(data)=>apiUrl.post(`/api/user/newuser`,data)
export const userNewPost=(data)=>apiUrl.post(`/api/userpost/newpost`,data,{
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})
export const userAllPost=(page)=>apiUrl.get(`/api/userpost/getallpost?page=${page}`)