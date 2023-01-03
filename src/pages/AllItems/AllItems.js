import React from 'react';
import './allItems.css'
import Item from './Item'
import { useState, useEffect } from 'react'
import { collection, orderBy, onSnapshot,  collectionGroup, query, where, getDocs } from "firebase/firestore"
import { db } from '../../firebase'
import Grid from '@mui/material/Grid';

export default function AllItems() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [Items, setItems] = useState([])

  /* function to get all Items from firestore in realtime */
  useEffect(async () => {
    const allUserRef = query(collectionGroup(db, 'items'));
    onSnapshot(allUserRef, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
     
      })))
    
    })
    console.log(allUserRef)
  }, [])

  return (
    <div className='itemManager'>
      <h1 >Welcome to Loop Store!</h1>
      <h2 >to push your items to Loop Store, go to My Item page </h2>
      <div class="item_grid">

        
        <Grid container spacing={8}>
          {Items.map((items) => (
          
            <Grid key={items} xs={12} sm={6} md={6}>
              <Item
                id={items.id}
                key={items.id}
                completed={items.data.completed}
                title={items.data.title}
                description={items.data.description}
                image={items.data.image}
                contactNum = {items.data.contactNum}
                contactLink= {items.data.contactLink}
              />
            </Grid>
          ))}

        </Grid>
      </div>


    </div>
  )
}
