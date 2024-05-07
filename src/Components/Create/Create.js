import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/firebaseContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { fireStore, firebaseStorage } from '../../firebase/config';
import { toast } from 'sonner';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [name, setName] = useState()
  const [category, setCategory] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState()
const {user} = useContext(AuthContext)
const navigate = useNavigate()
const handleSubmit =(e)=>{
    e.preventDefault()
    
    const imageRef = ref(firebaseStorage,`/Image/${image,name}`)
    const uploadImage = uploadBytesResumable(imageRef,image)

    uploadImage.on("state_changed",(snapshot)=>{},(err)=>{
      toast.error(err.message)
    },()=>{
      getDownloadURL(uploadImage.snapshot.ref).then((url)=>{
        const productCollection = collection(fireStore,'products')
        addDoc(productCollection,{
          name,
          category,
          price,
          url,
          userId:user.uid,
          date:new Date().toDateString()
        }).then(()=>{
          navigate('/')
        }).catch((err)=>{
          toast.error("Can't add product",err.message)
        })
      }).catch((err)=>{
        toast.error("Can't get image URL",err.message)
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price} />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
            type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
