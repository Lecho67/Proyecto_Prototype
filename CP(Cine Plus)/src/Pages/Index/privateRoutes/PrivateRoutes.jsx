import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        onAuthStateChanged(auth, async (user) => {
            if(user){
                setIsAuth(true);
                setLoading(false);
            }else{
                setLoading(false);
            }
        })
    }, [])

    if(loading){
        return <div>Cargando...</div>
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" />
}
