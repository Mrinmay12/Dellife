import apiUrl from "../ApiAxios";

export const userRegister=(data)=>apiUrl.post(`/api/user/newuser`,data)
export const userNewPost=(data)=>apiUrl.post(`/api/userpost/newpost`,data,{
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})
export const userAllPost=(page)=>apiUrl.get(`/api/userpost/getallpost?page=${page}`)

// export const ProfilePicUpdate=(user_id,data)=>apiUrl.put(`/api/user/profilepic/${user_id}`,data,{
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// })
export const ProfilePicUpdate=(data)=>apiUrl.put(`/api/user/profilepic/upload`,data)

export const Userdetails=(user_id)=>apiUrl.get(`/api/user/details/${user_id}`)

export const UserProfilePic=(user_id)=>apiUrl.get(`/api/user/userpic/${user_id}`)


export const SeeOtherUserProfile=(post_id,user_id)=>apiUrl.get(`/api/another_user/details/${post_id}?user_id=${user_id}`)
