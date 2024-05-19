import { createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword} from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import { register,login,logout } from "./AuthSlice";


export const registerUser = (email, password) => {
    return async (dispatch) => {
        
        try {
            const response = await createUserWithEmailAndPassword(auth,email, password);  
            if(response){
                console.log(response);
                dispatch(register({email: response.user.email}));
                return Promise.resolve(response)
            }else{
                throw new Error('Error al registrar usuario')
            }
        }catch (error) {
            return Promise.reject(error)
        }

    }
}


export const loginUser = (email, password) => {
    return async (dispatch) => {

    try {
        const response = await signInWithEmailAndPassword(auth,email, password);
        if(response){
            console.log(response)
            dispatch(login({email: response.user.email}))
            return Promise.resolve(response)
        }else{
            throw new Error('Error al iniciar sesion')
        }
    } catch (error) {
        return Promise.reject(error) 
    }    

    }
}

export const cerrarSesion = () => {
    return async (dispatch) => {
        const response = await signOut(auth);
        console.log(response)
    }
}








