// import { useState, useEffect, useRef } from "react"
// import {getAuth, onAuthStateChanged} from 'firebase/auth'
// import { getStorage, ref, uploadBytesResumable, 
// getDownloadURL} from 'firebase/storage'
// import { addDoc, collection, serverTimestamp } from "firebase/firestore"
// import {db} from '../firebase.config'
// import { useNavigate } from "react-router-dom"
// import Spinner from '../components/Spinner'
// import { toast } from "react-toastify"
// import {v4 as uuidv4} from 'uuid'


// function UploadImage() {
//   // eslint-disable-next-line
//     const [loading, setLoading] = useState(false)
//     const [formData, setFormData] = useState({
//         images: {},
//     })

//     const {images} = formData

//     const auth = getAuth()
//     const navigate = useNavigate()
//     const isMounted = useRef(true)

//     useEffect (() => {
//         if(isMounted) {
//             onAuthStateChanged(auth, (user) => {
//                 if(user) {
//                     setFormData({...formData, userRef: user.uid})
//                 } else {
//                     navigate('/sign-in')
//                 }
//             })
//         }

//         return () => {
//             isMounted.current = false
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isMounted, auth, navigate])

//     const onSubmit = async(e) => {
//         e.preventDefault()

//         setLoading(true)

//         if(images.length > 1) {
//             setLoading(false)
//             toast.error('Sorry, you can only upload 1 image at a time')
//             return
//         }


//         // Store images in firebase-- from firebase docs:
//         const storeImage = async (image) => {
            

//         const imgUrls = await Promise.all(
//             [...images].map((image) => storeImage(image))
//         ).catch(() => {
//             setLoading(false)
//             toast.error('Images not uploaded')
//             return
//         })
// //
//         const formDataCopy = {
//             ...formData,
//             imgUrls,
//             timestamp: serverTimestamp(),
//         }

//         delete formDataCopy.images

//         const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
//         setLoading(false)
//         toast.success('Listing Saved!')
//         navigate(`/category/${formDataCopy.type}/${docRef.id}`)

//         setLoading(false)
//     }

//     const onMutate = (e) => {
//         let boolean = null

//         if(e.target.value === 'true') {
//             boolean = true
//         }
//         if(e.target.value === 'false') {
//             boolean = false
//         }

//         //Files
//         if(e.target.files) {
//             setFormData((prevState) => ({
//                 ...prevState,
//                 images: e.target.files
//             }))
//         }

//         //Text/bool/num
//         if(!e.target.files) {
//             setFormData((prevState) => ({
//                 ...prevState,
//                 [e.target.id]: boolean ?? e.target.value
//             }))
//         }
//     }

//     if(loading) {
//         return <Spinner />
//     }

//   return (
//     <div className="profile">
//         <header>
//         <p className="pageHeader">Create a Listing</p>
//         </header>

//         <main>
//             <form onSubmit={onSubmit}>
//             <label className="formLabel">Receipt Invoice</label>

//             <label className='formLabel'>Images</label>
//               <input
//                 className='formInputFile'
//                 type='file'
//                 id='images'
//                 onChange={onMutate}
//                 max='6'
//                 accept='.jpg,.png,.jpeg'
//                 multiple
//                 required
//               />
//             <button type='submit' className='primaryButton createListingButton'>
//               Create Receipt
//             </button>
//           </form>
//         </main>
//     </div>
//   )
// }

// export default UploadImage