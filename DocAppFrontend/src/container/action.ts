import * as actionType from './actiontype';
import* as authServiece from '../service/auth.service';


export const signupAction = (payload: any) =>(dispatch: any) => {
    return authServiece.signUp(payload)
    .then(response => {
        dispatch({
            type: actionType.SUCCESSFULLY_SIGNUP,
            payload: response?.data
        })
        return Promise.resolve(response?.data)
    })
    .catch(error => {
        dispatch({
            type: actionType.FAIL_SIGNUP,
            payload:{err:error.message || "Error occured"}
        })
        
        return Promise.reject(error)
    })
}

export const loginAction = (payload: any)=> (dispatch: any) =>{
    return authServiece.login(payload)
    .then(data => {
        dispatch({
            type: actionType.SUCCESSFULLY_LOGIN,
            payload: data
        })
        return Promise.resolve(data);
    })
    .catch(error => {
        dispatch({
            type: actionType.FAIL_LOGIN,
            payload: {err: error.message || " Login Fail"}
        })
        return Promise.reject(error);
    })
}
export const getRecordAction = (payload: any) =>{
    return authServiece.getRecord(payload)
    .then(data => {
        return Promise.resolve(data.data);
    })
    .catch(error => {
        return Promise.reject(error);
    })
}

export const logoutAction = ()=> (dispatch: any) => {
    const message = authServiece.logout();
    dispatch({
        type: actionType.LOGOUT,
        payload: message
    })

    return Promise.resolve(message);
}



export const saveReportAction = (payload: any) => {
    return authServiece.saveReport(payload)
    .then(response => {
        // console.log(response)
        localStorage.setItem('data',JSON.stringify(response?.data))
        // dispatch({
            //     type: actionType.SUCESSFULL_UPLOAD,
            //     payload: response.data
        // })
        return Promise.resolve(response?.data)
    })
    .catch(error => {
        console.log(error)
        // dispatch({
        //     type: actionType.UNSUCESSFULL_UPLOAD,
        //     payload:{err:error.message || "Error occured"}
        // })
        
        return Promise.reject(error)
    })
}