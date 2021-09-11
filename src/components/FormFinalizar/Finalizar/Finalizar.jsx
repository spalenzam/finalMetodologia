import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import FormDireccion from '../FormDireccion';
import FormPago from '../FormPago';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';

const steps = ['Dirección de Envío', 'Detalles de Pago'];

const Finalizar = ({ cart, order, onFinalizar, error }) => {

    const classes = useStyles();
    const history = useHistory();
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activo, setActivo] = useState(0);
    const [dataE, setDataE] = useState({});

    useEffect(() => {
        const generarToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(cart);
                setCheckoutToken(token);
            } catch (error) {
               
            }
        }

        generarToken();

    }, [cart]);

    const proxPaso = () => setActivo((pasoPrev) => pasoPrev + 1)
    const pasoAnt = () => setActivo((pasoPrev) => pasoPrev - 1)

    const siguiente = (data) => {
        setDataE(data);
        proxPaso();
    }

    
    let Confirmacion = () => (order.customer ? (
        <>
            <div>
                <Typography variant="h5">Gracias por confiar en nosotros, {order.customer.firstname} {order.customer.lastname}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Volver</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ));

    if (error) {
        Confirmacion = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">Volver</Button>
            </>
        );
    }

    const Form = () => activo === 0 ?
    <FormDireccion checkoutToken={checkoutToken} proxPaso={proxPaso} setDataE={setDataE} siguiente={siguiente}/> :
    <FormPago dataE={dataE} checkoutToken={checkoutToken} proxPaso={proxPaso} pasoAnt={pasoAnt} onFinalizar={onFinalizar} />

    return (
        <>
            <CssBaseline />
            <div className={classes.barra} />
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
                    {activo === steps.length ? <Confirmacion /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Finalizar
