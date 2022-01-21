import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, runTransaction, DocumentReference, deleteDoc, updateDoc, doc, getDoc, getDocFromCache } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const Articulos = ({ setVentana }) => {
	const [articulos, setArticulos] = useState([])
	const [descripcion, setDescripcion] = useState("")
	const [cantidad, setCantidad] = useState(0)
	const [cantidadComparar, setCantidadComparar] = useState(0)
	const [id, setID] = useState("")
	const [error, setError] = useState(false)

	const pujar = async() => {
		if(cantidad < cantidadComparar){
			document.getElementById("errorPuja").innerHTML = "La cantidad debe ser superior"
			setError(true)
		} else {
			const db = getFirestore()
			const u = await updateDoc(doc(db,"pujas",id), {
				cantidad : cantidad,
				timestamp : 0
			})
		}
	}

	const cargarArticulos = () => {
		setArticulos([])
		const db = getFirestore()
		getDocs(query(collection(db, "articulos"))).then(snapshot => {
			const storage = getStorage()
			snapshot.docs.filter((doc) => 			
				((descripcion == "") || doc.data().descripcion.includes(descripcion))
			).map((docu) => {
				getDoc(doc(db,"pujas",docu.id)).then((docSnap)=> {
					setCantidad(docSnap.data().cantidad)
					setArticulos((old) => [...old, {...docu.data(), id: docu.id, cantidad: docSnap.data().cantidad, timestamp: docSnap.data().timestamp}])
				})
			})
		}).catch(e => console.error(e))
	}

	useEffect(cargarArticulos, [])

	return (
		<>
			<h1>Todos los artículos</h1>
			<input placeholder="Texto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
			<button onClick={cargarArticulos}>Buscar</button>
			{articulos.length === 0 ? <p>No hay artículos disponibles</p> : ""}
			{
				articulos !== null && articulos.map((elem, idx) => {
					return (
						<div key={idx} onClick={(e) => {setID(elem.id);setCantidadComparar(elem.cantidad)}}>
							<p>{elem.vendedor}</p>
							<p>{elem.descripcion}</p>
							<img src={elem.imagenes}></img>
							<p>Precio: {elem.precio}</p>
							<>
							{elem.comprador === "" ? 
								( <div>Cantidad a pujar: <input type="number" value={cantidad} onChange={(e) => {setCantidad(e.target.value)}}></input>
								<button onClick={() => pujar()}>Pujar</button>
								</div>
							 ) :
							<p>Este artículo ya ha sido adjudicado</p>}
							</>
							<p id="errorPuja" style={{color : "red"}} hidden={!error}>error</p>
						</div>
					)
				})
			}
		</>
	)
}

export default Articulos