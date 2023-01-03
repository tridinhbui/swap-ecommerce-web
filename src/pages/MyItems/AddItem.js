import React from 'react';
import Modal from "./Modal"
import './addItem.css'
import { collection, addDoc, Timestamp, doc } from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage, auth, db } from '../../firebase';
import { useState } from "react";

function AddItem({ onClose, open }) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUpload, setImageUpload] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [url, setImageUrl] = useState('');

  const uploadFile = async () => {
    const user = auth.currentUser;

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        const usersDocRef = doc(db, "users", user.uid)
        const colRef = collection(usersDocRef, "items")
        addDoc(colRef, {
          title: title,
          description: description,
          image: url,
          uid: user.uid,
          completed: false,
          contactLink: contactLink,
          contactNum: contactNum,
          created: Timestamp.now()
        })
      });
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      uploadFile();
      onClose();
    } catch (err) {
      alert(err)
    }
  }


  return (
    <Modal modalLable='Add Item' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addItem' name='addItem'>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder='Enter title' />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter item description'
          value={description}></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
          
        />
        <input
          type='text'
          name='ContactLink'
          value={contactLink}
          onChange={(e) => setContactLink(e.target.value)}
          placeholder='Enter contact link - full with https:// part' />
          <input
          type='text'
          name='PhoneNumber'
          value={contactNum}
          onChange={(e) => setContactNum(e.target.value)}
          placeholder='Enter your phone number ' />
        
        <div class='image-map'>
        </div>
        <button type='submit'>Done</button>
      </form>
    </Modal>
  )
}

export default AddItem
