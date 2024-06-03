// src/App.js
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "../Principal/Principal";
import Pelicula_info from "../Pelicula_info/Pelicula_info";
import Estrenos from "../Estrenos/Estrenos";
import { PlsSignIn } from "../../Components/Shared/PorfavorInicieSesion/PlsSignIn.jsx";
import { Orden } from "../Orden/Orden";
import { useState, useEffect } from "react";
import { Comidas } from "../Comidas/Comidas";
import { Navigation } from "../../Components/Shared/BarraNavegacion/BarraNavegacion";
import { Login } from "../Login/Login.jsx";
import { Registro } from "../Login/Registro.jsx";
import Error404 from "../../Components/Shared/NoEncontrado/Error404.jsx";
import { PrivateRoutes } from "./privateRoutes/PrivateRoutes.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { checkingCredentials } from "../../redux/slices/auth/AuthSlice.js";
import Reserva from "../Reserva/Reserva.jsx";
import { About } from "../About/About.jsx";
function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(checkingCredentials({ status: true, email: user.email }));
      } else {
        dispatch(checkingCredentials({ status: false, email: null }));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navigation
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Principal />
            </div>
          }
        />
        <Route
          path="/Comidas"
          element={
            <div>
              <Navigation
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Comidas
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
            </div>
          }
        />
        <Route
          path="/Pelicula"
          element={
            <div>
              <Navigation
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Pelicula_info
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
            </div>
          }
        />
        <Route
          path="/Estrenos"
          element={
            <div>
              <Navigation
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Estrenos />
            </div>
          }
        />
        <Route
          path="/Reserva"
          element={
            <div>
              <Navigation
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <Reserva />
            </div>
          }
        />
        <Route
          path="/About"
          element={
            <div>
              <Navigation
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <About />
            </div>
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/Perfil/Orden"
            element={
              <div>
                <Navigation
                  allProducts={allProducts}
                  setAllProducts={setAllProducts}
                  total={total}
                  setTotal={setTotal}
                  countProducts={countProducts}
                  setCountProducts={setCountProducts}
                />
                <Orden allProducts={allProducts} total={total} />
              </div>
            }
          />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Registro />} />
        <Route path="/plssignin" element={<PlsSignIn />}/>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;