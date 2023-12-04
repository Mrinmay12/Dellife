import apiUrl from "../ApiAxios";

export const userRegister=(data)=>apiUrl.post(`/api/user/newuser`,data)