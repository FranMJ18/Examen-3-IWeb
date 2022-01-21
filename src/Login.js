import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

//  https://firebase.google.com/docs/auth/web/start

const Login = ({ setVentana }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const iniciarSesion = (e) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setVentana("MisImagenes")
			})
			.catch((error) => {
				console.log(error)
			});
	}
	const registrarse = (e) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setVentana("MisImagenes")
			})
			.catch((error) => {
				console.error(error)
			});
	}

	return (
		<div>
			<h1>Inicio de sesión</h1>
			<form onSubmit={(e) => {
				e.preventDefault()
				iniciarSesion(e)
			}}>
				<input type="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input><br/>
				<input type="password" value={password} placeholder="Contraseña" required onChange={(e) => setPassword(e.target.value)}></input><br/>
				<button type="submit">Iniciar sesion</button>
			</form>
			<p>¿No tienes cuenta? <a href="#" onClick={() => setVentana("Registro")}>Registrarse</a></p>
		</div>
	)
}

export default Login