import React from 'react';
import './item.css'
import { useState } from 'react'
import ItemView from './ItemView'
import EditItem from './EditItem'
import { collection, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db, auth } from '../../firebase'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { AuthContext } from '../../context';
import { useContext } from 'react';


function MyItems({ id, title, description, image, completed }) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({ edit: false, view: false })
  const { user } = useContext(AuthContext);

  const handleClose = () => {
    setOpen({ edit: false, view: false })
  }

  /* function to update firestore */
  const handleChange = async () => {
    if (user) {
      const usersDocRef = doc(db, "users", user.uid)
      console.log(usersDocRef);
      const colRef = doc(usersDocRef, "items", id)
      try {
        await updateDoc(colRef, {
          completed: checked
        })
      } catch (err) {
        alert(err)
      }
    }
  }

  /* function to delete a document from firestore */
  const handleDelete = async () => {
    if (user) {
      const usersDocRef = doc(db, "users", user.uid)
      const colRef = doc(usersDocRef, "items", id)
      try {
        await deleteDoc(colRef)
      } catch (err) {
        alert(err)
      }
    }
  }

  const submit = () => {

    confirmAlert({
      title: 'Are you sure?',
      message: 'This action cannot be undone. This will permanently delete this item from your list. Do you still want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete()
        },
        {
          label: 'No',
        }
      ]
    });
  }

  return (
    <div className={`item ${'item--borderColor'}`}>
      <div className='item__body'>
        <h2 element class="ais-Panel-header">{title}</h2>
        <p element class="hit-description">{description}</p>
        <div div element class="hit-image">
          <img width="200" height="200" src={image} />
        </div>
        <div className='item__buttons'>
          <div className='item__deleteNedit'>
            <button
              className='item__editButton'
              onClick={() => setOpen({ ...open, edit: true })}>
              Edit
            </button>
            <button className='item__deleteButton' onClick={submit}>Delete</button>
          </div>
          <button className='item_viewButton'
            onClick={() => setOpen({ ...open, view: true })}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <ItemView
          onClose={handleClose}
          title={title}
          description={description}
          image={image}
          open={open.view} />
      }

      {open.edit &&
        <EditItem
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          open={open.edit}
          id={id} />
      }
    </div>
  )
}

export default MyItems