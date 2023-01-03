import React from 'react';
import {
  Highlight,
} from 'react-instantsearch-dom';
import { useState } from 'react'
import './home.css'
import ItemView from '../AllItems/swap'

export default function Hit(props) {

  const [open, setOpen] = useState({ view: false })

  const handleClose = () => {
    setOpen({ view: false })
  }
  

    return (
      <div>
        <div>
        <h2 element class="ais-Panel-header"> <Highlight attribute="title" hit={props.hit}/>         
        <div className='hit-button'>
          <button 
          onClick={() => setOpen({ ...open, view: true })}>
          Details
          </button>
        </div> </h2>
        <p element class="hit-description"> <Highlight attribute="description" hit={props.hit} /> </p>
        <div element class="hit-image"> <img width = "150" height = "150" src={props.hit.image} /> </div>

      </div>

      {open.view &&
        <ItemView
          onClose={handleClose}
          title={props.hit.title}
          description={props.hit.description}
          image = {props.hit.image}
          open={open.view}
          contactLink={props.hit.contactLink}
          contactNum={props.hit.contactNum} />
      }
    </div>
    );
  }