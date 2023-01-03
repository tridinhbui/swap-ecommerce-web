import React from 'react';
import Modal from "./Modal"
import {useState} from 'react'
import './editItem.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'
import { AuthContext } from '../../context';
import { useContext } from 'react';

function EditItem({open, onClose, toEditTitle, toEditDescription, id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)
  const { user } = useContext(AuthContext);

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const usersDocRef = doc(db, "users", user.uid)
    console.log(usersDocRef);
    const colRef = doc(usersDocRef, "items", id)
    try{
      await updateDoc(colRef, {
        title: title,
        description: description
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Item' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editItem'>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditItem