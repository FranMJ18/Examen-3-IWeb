import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { doc, setDoc, getFirestore } from "firebase/firestore"
import { useState } from "react"

const Registro = ({setVentana}) => {

    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    function registrarse(e){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setVentana("Articulos")
            })
            
            .catch((error) => {
                const errorMessage = error.message;
                console.log("Error: ", errorMessage)
                document.getElementById("error").innerHTML = errorMessage
                setError(true)
            });
    }

    return (
        <div>
        <h1>Regístrate</h1>
        <form onSubmit={(e) => {
            e.preventDefault()
            registrarse(e)
        }}>
            <input id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}></input><br/>
            <input id="password" type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}></input><br/>
            <p id="error" style={{color : "red"}} hidden={!error}>error</p>

            <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a href="#" onClick={() => setVentana("Login")}>Inicia sesión</a></p>
        </div>
    )

}

export default Registro