import axios from "axios";

 
// main URL
// const mainURL = `https://meet-app-prj.herokuapp.com/api`;
const mainURL = `http://localhost:4000`;

// signup post request finction
export const signUp = async (newUser: any) => {
    return await axios.post(`${mainURL}/api/signup`,newUser)
    .then(response=>{
        if(response){
            return Promise.resolve(response)
        }
    })
    .catch(error=>{
        return Promise.reject(error.response)
    })
}

export const login = async (user: any) =>{
    return  await axios.post(`${mainURL}/api/login`,user)
    .then(response => {
        if(response.data.verifyJwt){
            localStorage.setItem('user-authentication-token',response.data.verifyJwt);
        }
        if(response.data.verifyJwt){
            localStorage.setItem('user',response.data.username);
        }
        return Promise.resolve(response.data)
    })
    .catch(error => {
        return Promise.reject(error.response.data)
    })
}

export const logout = () => {
    localStorage.removeItem('user-authentication-token');
    localStorage.removeItem('user');
    return { message: "successfully logout"}
}

export const saveReport = async (newUser: any) => {
    return await axios.post(`${mainURL}/user/newReport`,newUser)
    .then(response=>{
        if(response){
            return Promise.resolve(response)
        }
    })
    .catch(error=>{
        return Promise.reject(error.response)
    })
}
export const getRecord = async (payload : any) =>{
    console.log(payload)
    return await axios.get(`${mainURL}/user/reports`, {
        headers: payload
      })
    .then(response => {
        
        return Promise.resolve(response.data)
    })
    .catch(error => {
        return Promise.reject(error.response.data)
    })
}