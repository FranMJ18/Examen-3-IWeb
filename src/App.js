
// https://firebase.google.com/docs/web/setup#available-libraries

import { useState } from "react";
import Registro from "./Registro";
import Barra from "./Barra";
import Articulos from "./Articulos";
import Login from "./Login";
import VenderArticulo from "./VenderArticulo";
import Pujar from "./Pujar"

const App = () => {

  const [ventana, setVentana] = useState("Login")

  return (
    <>
      {
        (ventana !== "Login" && ventana !== "Registro") && <Barra setVentana={setVentana} ></Barra>
      }

      {
        ventana === "Login" ? <Login setVentana={setVentana}></Login> :
          ventana === "Registro" ? <Registro setVentana={setVentana}></Registro> :
            ventana === "Articulos" ? <Articulos setVentana={setVentana}></Articulos> :
              ventana === "Pujar" ? <Pujar setVentana={setVentana}></Pujar> :
                ventana === "VenderArticulo" ? <VenderArticulo setVentana={setVentana}></VenderArticulo> :
                  "No se ha encontrado la pestaña"
      }
    </>
  );
}

export default App