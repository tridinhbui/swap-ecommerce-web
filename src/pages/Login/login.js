// template from https://github.com/mui/material-ui/blob/v5.10.7/docs/data/material/getting-started/templates/sign-in/SignIn.js

import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signInWithGoogle} from "../../firebase";
import macImg from "../../images/macalester.jpeg"
import "./login.css"
import { useContext } from "react";
import { AuthContext } from "../../context";
import { useNavigate } from 'react-router-dom';



export default function LogIn() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    if(user){
        navigate('/search');
    }

    return (

        <body>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img id = "macPic" src = {macImg}/> 
                    <Typography component="h1" variant="h5">
                         Login with Macalester email to start!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Button onClick={signInWithGoogle}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2 }}
                            startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="googleLogo" height={25} ></img>}
                        >
                            Sign in With Google
                        </Button>
                    </Box>
                </Box>
            </Container>
        </body>
    )
};