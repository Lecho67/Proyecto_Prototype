import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../../firebase/config.js";
import { register } from "./AuthSlice";


export const registerUser = (email, password) => {
    return async (dispatch) => {
        const response = await createUserWithEmailAndPassword(auth,email, password);
        if(response){
            console.log(response)
            dispatch(register({email: response.user.email}))
        }else{
            throw new Error('Error al registrar el usuario')
        }
    }
}



