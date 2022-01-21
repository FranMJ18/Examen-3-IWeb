import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { doc, setDoc, getFirestore } from "firebase/firestore"
import { useState } from "react"

const Registro = ({setVentana}) => {

    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")

    const registrarse = (e) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const db = getFirestore()
                setDoc(doc(db, "usuarios", user.uid), {
                    nombre : nombre,
                    email : email,
                    telefono : telefono
                }).then(
                    setVentana("MisImagenes")
                )
            })
            
            .catch((error) => {
                const errorMessage = error.message;
                console.log("Error: ", errorMessage)
            });
    }

    return (
        <div>
        <h1>Regístrate</h1>
            <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input id="password" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input id="nombre" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
            <input id="telefono" type="text" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
            <button type="submit" onClick={registrarse}>Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="#" onClick={() => setVentana("Login")}>Inicia sesión</a></p>
        </div>
    )

}

export default Registro