
// https://firebase.google.com/docs/web/setup#available-libraries

import { useState } from "react";
import Registro from "./Registro";
import Barra from "./Barra";
import Imagenes from "./Imagenes";
import Login from "./Login";
import SubirImagen from "./SubirImagen";

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
            ventana === "Imagenes" ? <Imagenes Mias={false}></Imagenes> :
              ventana === "MisImagenes" ? <Imagenes Mias={true}></Imagenes> :
                ventana === "SubirImagen" ? <SubirImagen setVentana={setVentana}></SubirImagen> :
                  "No se ha encontrado la pestaña"
      }
    </>
  );
}

export default App