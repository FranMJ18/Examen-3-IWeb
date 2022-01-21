import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { getFirestore, collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";

const VenderArticulo = ({ setVentana }) => {

	//lista de files subidos
	const [file, setFile] = useState(null)
	const [descripcion, setDescripcion] = useState("")
	const [precio, setPrecio] = useState(0)
	const [imageLink, setImageLink] = useState(null)

	const subirArticulo = async(e) => {
		const db = getFirestore()
		addDoc(collection(db, "articulos"), {
			vendedor: getAuth().currentUser.email,
			precio: precio,
			descripcion: descripcion,
			imagenes: "",
			comprador: ""
		}).then((docRef) => {
			const storage = getStorage();
			uploadBytes(ref(storage, docRef.id), file).then((snapshot) => {
					console.log('Se ha creado la imagen! ', snapshot.metadata.fullPath);
					getDownloadURL(ref(storage, docRef.id)).then((url) => {
						updateDoc(doc(db, "articulos", docRef.id), {
							imagenes : url
						}).then((e) => {
							setDoc(doc(db,"pujas",docRef.id), {
								comprador : "",
								timestamp : 0,
								cantidad : precio
							})
							setVentana("Articulos")
						})
					}).catch((e) => console.error(e))
			}).catch((error) => console.error(error))
		})
			
	}
		
	return (
		<>
			<h1>Vender artículo</h1>
			Descripcion: <input type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input><br/>
			<input type="file" onChange={(e) => {
				const f = e.target.files[0]
				setFile(f)
				if (f) {
					const fr = new FileReader();
					fr.onload = () => {
						setImageLink(fr.result);
					}
					fr.readAsDataURL(f);
				} else {
					setImageLink(null);
				}
				
			}
			}></input>
			{imageLink !== null && (<img src={imageLink}></img>)
			}
			<br/>Precio: <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)}></input>
			<button onClick={subirArticulo}>Subir</button>
		</>
	)
}

export default VenderArticulo