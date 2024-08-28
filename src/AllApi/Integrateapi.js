import apiUrl from "../ApiAxios";

export const userRegister=(data)=>apiUrl.post(`/api/user/newuser`,data)
export const userLogin=(data)=>apiUrl.post(`/api/user/login`,data)
export const verifytoken=async(token)=>await apiUrl.get(`/api/user/verifytoken`,{
  headers: {
    'Authorization':token,
  },
})
export const forgetPassword=(email)=>apiUrl.post(`/api/user/forgetpassword`,email)
export const resetPassword=(json)=>apiUrl.post(`/api/user/resetpassword`,json)
export const CheckOtp=(email,otp)=>apiUrl.get(`/api/user/check_otp?email=${email}&otp=${otp}`)
// email, otp, newPassword

//post api
export const userNewPost=(data)=>apiUrl.post(`/api/userpost/newpost`,data)
// export const userNewPost=(data)=>apiUrl.post(`/api/userpost/newpost`,data,{
//     headers: {
//         'Content-Type': 'multipart/form-data',
//       },
// })
export const userAllPost=(page,user_id,color,latitude,longitude,work_title,location)=>apiUrl.get(`/api/userpost/getallpost?page=${page}&user_id=${user_id}&color_code=${color}&latitude=${latitude}&longitude=${longitude}&work_title=${work_title}&location=${location}`)

// export const ProfilePicUpdate=(user_id,data)=>apiUrl.put(`/api/user/profilepic/${user_id}`,data,{
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// })
export const ProfilePicUpdate=(data)=>apiUrl.put(`/api/user/profilepic/upload`,data)

export const Userdetails=(user_id)=>apiUrl.get(`/api/user/details/${user_id}`)

export const UserProfilePic=(user_id)=>apiUrl.get(`/api/user/userpic/${user_id}`)


export const SeeOtherUserProfile=(post_id,user_id,request_user_id)=>apiUrl.get(`/api/another_user/details/${post_id}?user_id=${user_id}&request_user_id=${request_user_id}`)

export const UserPostGet=(user_id,page)=>apiUrl.get(`/api/userpost/user/${user_id}?page=${page}`)

export const AnotherUserPostGet=(post_id,page,user_id)=>apiUrl.get(`/api/another_user/post_details/${post_id}?page=${page}&user_id=${user_id}`)

//Message Api
export const sendMessage=(json)=>apiUrl.post(`/api/user/sendmessage`,json)
export const getMessage=(messageId)=>apiUrl.get(`/api/user/recivemessage/${messageId}`)
export const addTwoUser=(data)=>apiUrl.post(`/api/user/useradd`,data)
export const userfriend=(userid)=>apiUrl.get(`/api/user/userfriend/${userid}`)
export const userProfile=(userid)=>apiUrl.get(`/api/user/userprofile/${userid}`)
export const User_connect_or_not=(post_id,user_id,sender_id)=>apiUrl.get(`/api/user/user_connect_or_not/${post_id}?user_id=${user_id}&sender_id=${sender_id}`)
export const get_Perticular_user=(message_id,user_id)=>apiUrl.get(`/api/user/get_specific/${message_id}/${user_id}`)
export const UpdateUnseendata=(message_id,user_id)=>apiUrl.put(`api/user/unseen_message_update?message_id=${message_id}&userid=${user_id}`)

//post comment Api
export const userComment=(json)=>apiUrl.post(`/api/userpost/user/commentpost`,json)
export const userCommentget=(post_id,user_id,page)=>apiUrl.get(`/api/userpost/user/commentget/${post_id}/${user_id}?page=${page}`)

//post Like APi
export const postLike=(post_id,json)=>apiUrl.post(`/post/like/${post_id}`,json)
export const getLike=(post_id,user_id)=>apiUrl.get(`/post/likecount/${post_id}?user_id=${user_id}`)

export const disLike=(post_id,user_id)=>apiUrl.delete(`/post/dislike?post_id=${post_id}&user_id=${user_id}`)


//user save post
export const UserSavePost=(post_id,json)=>apiUrl.post(`/post/usersave_post/${post_id}`,json)

export const User_post_save_or_not=(post_id,user_id)=>apiUrl.get(`/post/user_post_save_or_not?user_id=${user_id}&post_id=${post_id}`)

//User save post get
export const UserSavePostGet=(user_id,page)=>apiUrl.get(`/post/user_all_save_post?user_id=${user_id}&page=${page}&pageSize=7`)

//Search Api integrate

export const SearchTags=(query)=>apiUrl.get(`/api/user/search/tags?q=${query}`)
export const SearchUser_and_Post=(query,user_id,page,user_work,location_user,latitude,longitude,searchby_data)=>apiUrl.get(`/api/user/search/profile?q=${query}&user_id=${user_id}&page=${page}&work_title=${user_work}&location_user=${location_user}&latitude=${latitude}&longitude=${longitude}&searchby_data=${searchby_data}`)  



//Update user
export const UpdateUser=(json)=>apiUrl.put(`/api/user/updateuser`,json)

//get perticular post
export const getPerticular_post=(post_id,user_id)=>apiUrl.get(`/api/userpost/getperticular_post/${post_id}?user_id=${user_id}`)

//delete post
export const delete_post=(post_id,user_id)=>apiUrl.delete(`/api/userpost/delete_post/${post_id}?user_id=${user_id}`)


//Delete prifile
export const Delete_profile=(user_id)=>apiUrl.delete(`/api/user/delete/${user_id}`)

//Delete profilepic

export const Delete_profile_Pic=(user_id)=>apiUrl.delete(`/api/user/delete/profilepic/${user_id}`)
//Profile lock and unlock

export const Profile_Lock_Unlock=(user_id)=>apiUrl.put(`/api/user/lock_unlock/${user_id}`)

//Number show hide
export const Number_Lock_Unlock=(user_id)=>apiUrl.put(`/api/user/number_hide_show/${user_id}`)

//user location
export const UserLocation =(user_id,json)=>apiUrl.patch(`/api/user/user_location/${user_id}`,json)

//Near user list

export const NearUsers=(user_latitude,user_longitude,user_id,page)=>apiUrl.get(`/api/user/get_users_location/${user_latitude}/${user_longitude}?page=1&limit=${page}&user_id=${user_id}`)


//Report post 

export const ReportPost=(user_id,post_id,json)=>apiUrl.post(`/report_post/${user_id}/${post_id}`,json)

//Follow user

export const FollowUser=(post_user_id,user_id)=>apiUrl.post(`/follow_users?connect_user_id=${post_user_id}&request_user_id=${user_id}`)

export const FollowUserList=(user_id,page,debouncedValue)=>apiUrl.get(`/follow_users_list?user_id=${user_id}&q=${debouncedValue}&limit=10&page=${page}`)

export const FollowersUserList=(message_id,page,debouncedValue)=>apiUrl.get(`/followers_users_list?message_id=${message_id}&q=${debouncedValue}&limit=10&page=${page}`)



//delete comment 

export const DeleteComment=(comment_id)=>apiUrl.delete(`/api/userpost/user/delete?comment_id=${comment_id}`)
export const EditComment=(comment_id,user_id,json)=>apiUrl.put(`/api/userpost/user/edit?comment_id=${comment_id}&user_id=${user_id}`,json)

//Block user
export const BlockUser=(message_connect_id,message_id)=>apiUrl.put(`api/user/block/user?message_connect_id=${message_connect_id}&message_id=${message_id}`)

export const BlockUserList=(message_id,page)=>apiUrl.get(`/api/user/block/user/list?message_id=${message_id}&page=${page}&limit=10`)


//other user follow following 
export const FollowOtherUserList=(user_id,page,debouncedValue)=>apiUrl.get(`/api/another_user/follow_users_list?user_id=${user_id}&q=${debouncedValue}&limit=10&page=${page}`)

export const FollowerOtherUserList=(message_id,page,debouncedValue)=>apiUrl.get(`/api/another_user/followers_users_list?message_id=${message_id}&q=${debouncedValue}&limit=10&page=${page}`)

//All location
export const AllLocation=()=>apiUrl.get(`/api/user/all_location`)

//All job details
export const CreateJob=(job_details)=>apiUrl.post(`/api/user/job_approved/${job_details}`)
export const GetJob=()=>apiUrl.get(`/api/user/job_all`)

//Deal price
export const DealCreate=(json)=>apiUrl.post(`/create_price`,json)
export const GetDeal=(sort,post_id,page)=>apiUrl.get(`/get_price?sort=${sort}&post_id=${post_id}&page=${page}`)
