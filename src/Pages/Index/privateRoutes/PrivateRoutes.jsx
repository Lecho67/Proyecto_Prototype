import { onAuthStateChanged } from "firebase/auth";
import {checkingCredentials} from "../../../redux/slices/auth/AuthSlice.js"
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export const PrivateRoutes = () => {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            await dispatch(checkingCredentials({ status: true, email: user.email }));
        } else {
            await dispatch(checkingCredentials({ status: false, email: null }));
        }
        setLoading(false);
    });

    return () => unsubscribe();
}, [dispatch]);

const { status } = useSelector(state => state.auth);

if (loading) {
    return <><div className="loadingContainer"><p className="loadingMiOrden">Cargando...</p></div><style>{"body {cursor: wait}"}</style></>;
}

return status ? <Outlet /> : <Navigate to="/login" />;

}


