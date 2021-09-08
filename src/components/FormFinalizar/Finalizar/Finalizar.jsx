import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typograohy, CircularProgress, Divider, Button, Typography } from '@material-ui/core';
import FormDireccion from '../FormDireccion';
import FormPago from '../FormPago';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';

const steps = ['Shipping address', 'Payment details'];

const Finalizar = ({ cart }) => {

    const classes = useStyles();
    const [checkoutToken, setCheckoutToken] = useState (null);
    const [activo, setActivo] = useState(0);  
     

    useEffect(() => {
        const generarToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                console.log(cart);
                setCheckoutToken(token);
            } catch (error){

            }
        }

        generarToken();

    }, [cart]);

    const Form = () => activo === 0 ? <FormDireccion checkoutToken={checkoutToken}/> : <FormPago />

    const Confirmacion = () => (
        <div>
            Confirmación
        </div>
    )

    return (
        <>
        <div className={classes.barra}/>
        <main className={classes.layout}>
            <Paper className={classes.general}>
                <Typography variant="h4" align="center">
                    Finalizar
                </Typography>
                <Stepper activeStep={activo} className={classes.pasos}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activo === steps.length ? <Confirmacion/> : checkoutToken && <Form/>}
            </Paper>
        </main>
            
        </>
    )
}

export default Finalizar
