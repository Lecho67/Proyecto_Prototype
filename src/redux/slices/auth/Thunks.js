import { createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import { register,login,logout } from "./AuthSlice";
import cinePlusApi from "../../../api/cinePlusApi.js";

export const registerUser = (email, password) => {
    return async (dispatch) => {
        
        try {
            const {data} = await cinePlusApi.post('/crearUsuario', {email, password});
            const response = await createUserWithEmailAndPassword(auth,email, password);  
            if(response && data){
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

export const loginGoogle = () => {
    return async (dispatch) => {
        const provider = new GoogleAuthProvider();
        try {
            // Autenticar al usuario con Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Intentar registrar/verificar al usuario en la base de datos
            try {
                const { data } = await cinePlusApi.post('/crearUsuarioGoogle', { email: user.email });
                // Despachar la acción de login
                dispatch(login({ email: user.email }));
                return Promise.resolve(result);
            } catch (error) {
                // Si falla, cerrar la sesión de Firebase
                await signOut(auth);
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const cerrarSesion = () => {
    return async (dispatch) => {
        const response = await signOut(auth);
        console.log(response)
    }
}








