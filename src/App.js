import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Productos, Navbar } from './components';
import { CardMembershipTwoTone } from '@material-ui/icons';

const App = () => {
    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    //Es el estado que permite ver el num en el carrito cuando voy agregando productos
    const [cart, setCarrito] = useState({})

    const fetchProductos = async () =>  {
        const { data } = await commerce.products.list();

        //voy guardando todos los datos que me trae en productos
        setProductos(data);
    }

    const fetchCarrito = async () => {
        setCarrito(await commerce.cart.retrieve());
    }

    //Función que agrega al carrito los productos 
    const handleAgregarACarrito = async (productoId, cantidad) => {
        const item = await commerce.cart.add(productoId, cantidad);
        setCarrito(item.cart);
    }

    //solo se ejecutara al ppio del renderizado
    //llamo a la función para que me traiga la lista de productos de commerce
    useEffect(() => {
        fetchProductos();
        fetchCarrito();
    }, []);
    
    console.log(cart);

    return (
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Productos productos = {productos} agregarACarrito={handleAgregarACarrito}/>
            {/* <Carrito carrito/> */}
        </div>
    )
}

export default App

  