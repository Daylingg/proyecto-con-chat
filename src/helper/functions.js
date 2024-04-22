import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { db, storage } from "../firebase/firebase-config";


export const  uploadFile = async(file) => {
 
    const dateId = new Date().getTime();//para establecer un id unico
    const fileName = `${dateId}.jpg`; // Nombre del archivo con extensión JPG
    try {
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, file, { contentType: 'image/jpeg' })
        const url= await getDownloadURL(storageRef)//crea una referencia url del archivo

        return url
    } catch (error) {
        Swal.fire('Error',error,'error')
    }
    
}

// Función para convertir una imagen base64 en un archivo
export const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  };
/**
 * export const uploadFile = async (file) => {
  const dateId = new Date().getTime(); // Establecer un ID único para el nombre del archivo
  const fileName = `${dateId}.jpg`; // Nombre del archivo con extensión JPG

  try {
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file, { contentType: 'image/jpeg' }); // Especificar el tipo de archivo como imagen/jpeg
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return null;
  }
 */


export const loadChats = async (uid, funct) => {

    
        const unsub =await onSnapshot(doc(db, "userChats", uid), (doc) => {
            
            funct(doc.data())
            
        })

        return ()=>{
        unsub()
        }
    
}

export const selectChat=async(combineId,uid,name,photo,user)=>{
    try {
        const res = await getDoc(doc(db, "chats", combineId)) //se llama a la coleccion de chat y si no existe

        if(!res.exists()){
            await setDoc(doc(db,  "chats", combineId),{messages:[]})//se crea el chat en la coleccion de chats

            //se crea el chat al usuario
            await updateDoc(doc(db, "userChats", uid), {
            [combineId + ".userInfo"]: {
                uid: user.uid,
                name: user.name,
                photoURL: user.photoURL,
            },
            [combineId + ".date"]: serverTimestamp(),
            })

            await updateDoc(doc(db, "userChats", user.uid), {
            [combineId + ".userInfo"]: {
                uid: uid,
                name: name,
                photoURL: photo,
            },
            [combineId + ".date"]: serverTimestamp(),
            })
        }
    } catch (error) {
    Swal.fire('Error', error,'error')
    
    }
}


export const loadNotes = async (uid) => {

    const colRef =  collection(db,`users/${uid}/notes`) 
    const notesSnap = await getDocs(query(colRef))

    const notes = []
    

    notesSnap.docs.map(snapHijo =>{
    
        return notes.push({
            id:snapHijo.id,
            ...snapHijo.data()
        })
    })


    return notes
}


export const canvasCreator = (refCanvas) => {
    let context =  refCanvas.current.getContext("2d")
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

//For drawing lines
const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
};

const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
};

const body = () => {
    drawLine(70, 40, 70, 80);
};

const leftArm = () => {
    drawLine(70, 50, 50, 70);
};

const rightArm = () => {
    drawLine(70, 50, 90, 70);
};

const leftLeg = () => {
    drawLine(70, 80, 50, 110);
};

const rightLeg = () => {
    drawLine(70, 80, 90, 110);
};

//initial frame
const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
};

return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};



export const drawMan = (count,canvasR) => {
let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator(canvasR);
switch (count) {
    case 1:
    head();
    break;
    case 2:
    body();
    break;
    case 3:
    leftArm();
    break;
    case 4:
    rightArm();
    break;
    case 5:
    leftLeg();
    break;
    case 6:
    rightLeg();
    break;
    default:
    break;
}
};


export const removeAccents = (str) => {
    return str.normalize('NFD')
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
    .normalize()
    //normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

export const validateWord=(word,wordApi='')=>{
    if(wordApi.length===5){
        if(word.trim().length<5 || word.trim().length>5){
            return 'La palabra debe tener 5 caracteres'
        }else{
            let expReg=/^[A-Za-zñ\s]+$/g.test(word)
            if(!expReg){
            return 'La palabra no debe tener numeros'
            }
        } 
    }else  if(wordApi.length===4){
        if(word.trim().length<4 || word.trim().length>4){
            return 'La palabra debe tener 4 caracteres'
        }else{
            let expReg=/^[A-Za-zñ\s]+$/g.test(word)
            if(!expReg){
                return 'La palabra no debe tener numeros'
                
        }   
        } 
    }
}

export const obtPalabraFetch = async() => {

    try {
        const resp=await fetch('https://clientes.api.greenborn.com.ar/public-random-word')
        
        let data=await resp.json()

        const palabra=data[0]
    

    return palabra
    } catch (error) {
        
        throw new Error(error.statusText); 
        
    }
    
}

export const obtPalabra = async() => {

    try {
        const resp=await fetch('https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=5')
        
        let data=await resp.json()

        const palabra=data[0]
    

    return palabra
    } catch (error) {
        
        throw new Error(error.statusText); 
        
    }
    
}

export const initialAlfabet=[
    { letra:'A', select:false}, { letra:'B', select:false}, { letra:'C', select:false}, { letra:'D', select:false},
    { letra:'E', select:false}, { letra:'F', select:false}, { letra:'G', select:false}, { letra:'H', select:false},
    { letra:'I', select:false}, { letra:'J', select:false}, { letra:'K', select:false}, { letra:'L', select:false},
    { letra:'M', select:false}, { letra:'N', select:false}, { letra:'Ñ', select:false}, { letra:'O', select:false},
    { letra:'P', select:false}, { letra:'Q', select:false}, { letra:'R', select:false}, { letra:'S', select:false},
    { letra:'T', select:false}, { letra:'U', select:false}, { letra:'V', select:false}, { letra:'W', select:false},
    { letra:'X', select:false}, { letra:'Y', select:false}, { letra:'Z', select:false},
]

