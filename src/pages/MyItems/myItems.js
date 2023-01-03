
//template reference: https://www.freecodecamp.org/news/create-a-solid-to-do-app-with-react/

import React from 'react';
import './myItems.css'
import Item from './Item'
import { useState, useEffect, useContext } from 'react'
import { collection, doc, onSnapshot } from "firebase/firestore"
import { db } from '../../firebase'
import AddItem from './AddItem'
import Grid from '@mui/material/Grid';
import { AuthContext } from '../../context';
import { InfinitySpin } from 'react-loader-spinner';
import bg2 from '../../images/background2.jpg';
import bg1 from '../../images/background2.webp'
import bg3 from '../../images/background3.png'

export default function ItemsList() {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [Items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  /* function to get all Items from firestore in realtime */
  useEffect(() => {
    setTimeout(() => { // simulate a delay
      if (!user) {
        setLoading(false); //set loading state
      }
    }, 900);

    (async () => {
      if (user) {
        const usersDocRef = doc(db, "users", user.uid)
        const colRef = collection(usersDocRef, "items")
        onSnapshot(colRef, (snapshot) => {
          setItems(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      }
    })();
  }, [user]);

  if (isLoading) {
    return <div class="centered">
      <InfinitySpin
        width='130'
        height='130'
        color="black"
      />
    </div>
  }

  const bgImage = [bg1, bg2, bg3];
  const delay = 4200;

  function Slideshow() {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    React.useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === bgImage.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );

      return () => {
        resetTimeout();
      };
    }, [index]);

    return (
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {bgImage.map((bg, index) => (
            <img className="slide" key={index} src={bg}></img>
          ))}
        </div>

        <div className="slideshowDots">
          {bgImage.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    );

  }


  return (
    <div id="body">
      <Slideshow />
      <div className='ItemManager'>
        <div className='ItemManager__container'>
          <button
            onClick={() => setOpenAddModal(true)}>
            Add Item +
          </button>
        </div>

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
                  contactNum={items.data.contactNum}

                />
              </Grid>
            ))}

          </Grid>
        </div>

        {openAddModal &&
          <AddItem onClose={() => setOpenAddModal(false)} open={openAddModal} />
        }
      </div>
    </div>

  )
}
