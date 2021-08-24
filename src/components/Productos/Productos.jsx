import React from 'react';
import {Grid} from '@material-ui/core';
import Producto from './Producto/Producto';
import useStyles from './styles';

const Productos = ({ productos, agregarACarrito }) => {
    
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}> 
                {productos.map((producto) => (
                    <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3} >
                        <Producto product={producto} agregarACarrito={agregarACarrito}/>
                    </Grid>
                )
                )}
            </Grid>
        </main>
    )
    
    
}














export default Productos
