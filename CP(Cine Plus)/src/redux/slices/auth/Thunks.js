import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../../firebase/config.js";
import { register } from "./AuthSlice";


const registerUser = (email, password) => {
    return async (dispatch) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        if(response){
            await updateProfile(auth.currentUser, {
                displayName: 'user',
                photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            })

        const {email} = response.user;
        dispatch(register({email}))

        }else{
            throw Error('Error al registrar usuario')
        }

    }
}