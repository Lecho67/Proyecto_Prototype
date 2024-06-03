import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export const PrivateRoutes = () => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(checkingCredentials({ status: true, email: user.email }));
      } else {
        await dispatch(checkingCredentials({ status: false, email: null }));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
    const { status } = useSelector(state => state.auth)
    console.log(status);  
    return status ? <Outlet /> : <Navigate to="/" />
}


