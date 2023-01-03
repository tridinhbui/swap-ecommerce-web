import React from 'react';
import Modal from "./Modal"
import './itemView.css'

function ItemView({onClose, open, title, description, image}) {

  return (
    <Modal onClose={onClose} open={open}>
      <div className='viewItem'>
        <h2 element class="ais-Panel-header">{title}</h2>
        <p element class="hit-description">{description}</p>
        <div element class="hit-image-details"> <img src={image}/> </div>


      </div>
    </Modal>
  )
}

export default ItemView
