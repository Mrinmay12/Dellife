import apiUrl from "../ApiAxios";

export const userRegister=(data)=>apiUrl.post(`/api/user/newuser`,data)
export const userLogin=(data)=>apiUrl.post(`/api/user/login`,data)
export const verifytoken=async(token)=>await apiUrl.get(`/api/user/verifytoken`,{
  headers: {
    'Authorization':token,
  },
})
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

export const UserPostGet=(user_id,page)=>apiUrl.get(`/api/userpost/user/${user_id}?page=${page}`)

export const AnotherUserPostGet=(post_id,page)=>apiUrl.get(`/api/another_user/post_details/${post_id}?page=${page}`)

//Message Api
export const sendMessage=(json)=>apiUrl.post(`/api/user/sendmessage`,json)
export const getMessage=(messageId)=>apiUrl.get(`/api/user/recivemessage/${messageId}`)
export const addTwoUser=(data)=>apiUrl.post(`/api/user/useradd`,data)
export const userfriend=(userid)=>apiUrl.get(`/api/user/userfriend/${userid}`)
export const userProfile=(userid)=>apiUrl.get(`/api/user/userprofile/${userid}`)