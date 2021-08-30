import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typograohy, CircularProgress, Divider, Button, Typography } from '@material-ui/core';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Finalizar = () => {

    const classes = useStyles();
    const [activo, setActivo] = useState(0);    

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
            </Paper>
        </main>
            
        </>
    )
}

export default Finalizar
