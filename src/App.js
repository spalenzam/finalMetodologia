import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Productos, Navbar, Carrito, Finalizar } from './components';


const App = () => {
    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    //Es el estado que permite ver el num en el carrito cuando voy agregando productos
    const [cart, setCarrito] = useState({})

    const fetchProductos = async () => {
        const { data } = await commerce.products.list();

        //voy guardando todos los datos que me trae en productos
        setProductos(data);
    }

    const fetchCarrito = async () => {
        setCarrito(await commerce.cart.retrieve());
    }

    //Función que agrega al carrito los productos 
    const handleAgregarACarrito = async (productoId, cantidad) => {
        const { cart } = await commerce.cart.add(productoId, cantidad);
        setCarrito(cart);
    }

    const handleModificarCantidad = async (productId, cantidad) =>{
        const { cart } = await commerce.cart.update(productId, { cantidad });
        setCarrito(cart);
    }

    const handleEliminarItems = async (productId) =>{
        const { cart } = await commerce.cart.remove(productId);
        setCarrito(cart);
    }

    const handleVaciar = async () =>{
        const { cart } = await commerce.cart.empty();
        setCarrito(cart);
    }

    //solo se ejecutara al ppio del renderizado
    //llamo a la función para que me traiga la lista de productos de commerce
    useEffect(() => {
        fetchProductos();
        fetchCarrito();
    }, []);

    console.log(cart);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route  exact path="/">
                        <Productos productos = {productos} agregarACarrito={handleAgregarACarrito}/>
                    </Route>
                    <Route  exact path="/carrito">
                        <Carrito 
                        cart={cart} 
                        handleModificarCantidad={handleModificarCantidad}
                        handleEliminarItems={handleEliminarItems}
                        handleVaciar={handleVaciar}
                        />
                    </Route>
                    <Route  exact path="/finalizar">
                        <Finalizar cart={cart} />
                    </Route>
                </Switch>        
               
            </div>

        </Router>
    )
}

export default App

