import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Productos, Navbar, Carrito, Finalizar, Vinoteca, Bodega } from './components';


const App = () => {
    //Estado donde guardamos los productos
    const [productos, setProductos] = useState([]);
    //Es el estado que permite ver el num en el carrito cuando voy agregando productos
    const [cart, setCarrito] = useState({})
    const [order, setOrder] = useState({});
    const [mensjError, setMensjError] = useState('');

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

    const handleModificarCantidad = async (productoId, quantity) =>{
        const { cart } = await commerce.cart.update(productoId, { quantity });
        setCarrito(cart);
    }

    const handleEliminarItems = async (productoId) =>{
        const { cart } = await commerce.cart.remove(productoId);
        setCarrito(cart);
    }

    const handleVaciar = async () =>{
        const { cart } = await commerce.cart.empty();
        setCarrito(cart);
    }

    const rerfrescarCarrito = async () => {
        const limpio = await commerce.cart.refresh();

        setCarrito(limpio);
    }

    const handleFinalizar = async (checkoutTokenId, nuevaOrden) => {
        try {
          const ordenActual = await commerce.checkout.capture(checkoutTokenId, nuevaOrden);
    
          setOrder(ordenActual);
    
          rerfrescarCarrito();
        } catch (error) {
            setMensjError(error.data.error.message);
        }
      };

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
                        handleModificarCantidad = {handleModificarCantidad}
                        handleEliminarItems = {handleEliminarItems}
                        handleVaciar = {handleVaciar}
                        />
                    </Route>
                    <Route  exact path="/finalizar">
                        <Finalizar 
                            cart={cart} 
                            order={order}
                            onFinalizar={handleFinalizar}
                            error={mensjError}
                        />
                    </Route>
                    <Route  exact path="/vinoteca">
                        <Vinoteca/>
                    </Route>
                    <Route  exact path="/bodega">
                        <Bodega />
                    </Route>
                </Switch>        
               
            </div>

        </Router>
    )
}

export default App

