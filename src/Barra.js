import { getAuth } from "firebase/auth"

const Barra = ({ setVentana }) => {
	return (
		<div>
			<p>Usuario {getAuth().currentUser.uid}</p>
			<button onClick={() => {
				getAuth().signOut()
				setVentana("Login")
			}} >Cerrar sesión</button>
			<button onClick={() => {
				setVentana("Articulos")
			}} >Todos los articulos</button>
			<button onClick={() => {
				setVentana("VenderArticulo")
			}} >Vender artículo</button>
		</div>
	)
}

export default Barra