import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { Typography, Container, Button } from '@material-ui/core';
import useStyles from './styles';
import { spacing } from '@material-ui/system';
import Bodega1 from './Bodega1';
import { Link } from 'react-router-dom'


const Bodega = () => {
    const classes = useStyles();
    return (
        <>
            <Container>
                <div className={classes.barra} />

                <Typography className={classes.titulo} align="center" variant="h4" color="inherit">
                    BODEGAS
                </Typography>

                <Typography align="center" variant="h5" className={classes.subtitulo1} >
                    <Link className={classes.subtitulo1} to="/bodega1" underline="none" > BODEGA UNO </Link>
                </Typography>

                <Bodega1></Bodega1>
         
                <Typography align="center" variant="h5" className={classes.subtitulo}>
                    <Link className={classes.subtitulo} to="/bodega1" underline="none"> BODEGA DOS </Link>
                </Typography>

                <Bodega1></Bodega1>

                <Typography align="center" variant="h5" className={classes.subtitulo}>
                    <Link className={classes.subtitulo} to="/bodega1" underline="none"> BODEGA TRES </Link>
                </Typography>

                <Bodega1></Bodega1>

            </Container>
        </>
    )
}


export default Bodega
