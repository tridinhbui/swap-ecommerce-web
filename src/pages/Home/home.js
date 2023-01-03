import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import bg1 from '../../images/background1.jpg';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import algoliasearch from 'algoliasearch/lite';
import { InfinitySpin } from 'react-loader-spinner';
import { AuthContext } from '../../context';
import { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCircleCheck, faBullseye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  Pagination
} from 'react-instantsearch-dom';
import Hit from './hit'
import './home.css'



const searchClient = algoliasearch(
  'FUH27QK0B4',
  '95975dfd853601f433605af8a9de4734'
);


const Home = () => {

  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  /* function to get all Items from firestore in realtime */
  useEffect(() => {
    setTimeout(() => { // simulate a delay
      if (!user) {
        setLoading(false); //set loading state
      }
    }, 500);
    console.log("user data successfully loaded")

  }, []);
  if (isLoading) {
    return <div class="spinner-container">
      <InfinitySpin
        width='130'
        height='130'
        color="black"
      />
    </div>
  }

  return (
    <div class ="body">
      <Box
        class="background"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5"
        }}>
    <CssBaseline />
        <Container maxWidth="sm">

          <Typography
            sx={{ pt: 5 }}
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            font="Abril Fatface"
            gutterBottom
          >
            <h3 class="title-text-1">LOOP</h3> 
            <Stack
              sx={{ pt: 55 }}
              direction="row"
              spacing={2}
              justifyContent="center">
              <Button
                style={{
                  backgroundColor: "#000000",
                  padding: "18px 36px",
                  fontSize: "18px",
                 
                }} variant="contained">
                <a id = "start-shopping"
                  activeClass="active"
                  href={(!user) ? '/login' : '#searchbox'}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  
                >Start Shopping</a>
              </Button>
              
            </Stack>
          </Typography>

        </Container>

    
      </Box>

      <section id="features">
        <div class="row">
          <div class="feature-box col-lg-4 col-md-12">
            <FontAwesomeIcon class="icon fa-solid fa-circle-check fa-4x" icon={faCircleCheck} />
            <h3 class="feature-text-1">Safety</h3>
            <p class="feature-text-2">Only Macalester students can access</p>
          </div>
          <div class="feature-box col-lg-4 col-md-12 ">
            <FontAwesomeIcon class="icon fa-solid fa-bullseye fa-4x" icon={faBullseye} />
            <h3 class="feature-text-1">Find everything you need</h3>
            <p class="feature-text-2">Shop now and find the perfect outfit for any occasion</p>
          </div>
          <div class="feature-box col-lg-4 col-md-12">
            <FontAwesomeIcon class="icon fa-solid fa-heart fa-4x" icon={faHeart} />
            <h3 class="feature-text-1">User friendly</h3>
            <p class="feature-text-2">Easy to use, one click to connect!</p>
          </div>
        </div>
      </section>

      <div className="container">
        { user? <InstantSearch searchClient={searchClient} indexName="items">
          <Configure hitsPerPage={6} />
          <div id="searchbox"> <SearchBox translations={{ placeholder: "Search for items" }} /> </div>
          <div id="hits"> <Hits hitComponent={Hit} /> </div>
          <div id="pagination"> <Pagination /> </div>
        </InstantSearch> : null}

      </div>
    </div>
  );
}

export default Home;