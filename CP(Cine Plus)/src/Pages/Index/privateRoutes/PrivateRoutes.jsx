// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { auth } from "../../../firebase/config";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoutes = () => {
    const { status } = useSelector(state => state.auth)
    return status ? <Outlet /> : <Navigate to="/login" />
}


