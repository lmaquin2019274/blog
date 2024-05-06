import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/forchan_2/v1',
    timeout: 1000
})

export const login = async (data) => {
    try{
        return await apiClient.post('/usuarios/login', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const register = async (data) => {
    try{
        return await apiClient.post('/usuarios', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async (userId) => {
    try{
        return await apiClient.patch(`/${userId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const putUserSettings = async (userId, data) => {
    try{
        return await apiClient.get(`/${userId}`, data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async (userId) => {
    try{
        return await apiClient.get(`/${userId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}