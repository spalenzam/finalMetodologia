import React from 'react';
import { Input, Select, MenuItem, Button, Grid, Typography, InputLabel } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';

const FormDireccion = () => {

    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom >Dirección de Envío</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='Nombre' lable='Nombre' />
                        <FormInput required name='Apellido' lable='Apellido' />
                        <FormInput required name='Dirección' lable='Dirección' />
                        <FormInput required name='Email' lable='Email' />
                        <FormInput required name='Ciudad' lable='Ciudad' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Provincia</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Subdivisión</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Opciones</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default FormDireccion
