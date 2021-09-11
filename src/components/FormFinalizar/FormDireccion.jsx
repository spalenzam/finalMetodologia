import React, { useState, useEffect } from 'react';
import { Input, Select, MenuItem, Button, Grid, Typography, InputLabel } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';

const FormDireccion = ({ checkoutToken, siguiente }) => {

    const methods = useForm();
    const [paises, setPaises] = useState([]);
    const [pais, setPais] = useState('');
    const [provincias, setProvincias] = useState([]);
    const [provincia, setProvincia] = useState('');
    //const countries = Object.entries(paises).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(provincias).map(([code, name]) => ({ id: code, label: name }))

    const fetchPaises = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setPaises(countries);
        setPais(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setProvincias(subdivisions);
        setProvincia(Object.keys(subdivisions)[0]);
    }

    useEffect(() => {
        fetchPaises(checkoutToken.id);
      }, []);

    useEffect(() => {
        if(pais) fetchSubdivisions(pais);

    }, [pais]);

    return (
        <>
            <Typography variant="h6" gutterBottom >Dirección de Envío</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => siguiente({ ...data, pais, provincia}))}>
                    <Grid container spacing={3}>
                        <FormInput name='Nombre' label="Nombre" />
                        <FormInput name='Apellido' label='Apellido' />
                        <FormInput name='Dirección' label='Dirección' />
                        <FormInput name='Email' label='Email' />
                        <FormInput name='Ciudad' label='Ciudad' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Provincia</InputLabel>
                            <Select value={provincia} fullWidth onChange={(e) => setProvincia(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}                                
                            </Select>
                        </Grid> 
                    </Grid> 
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/carrito" variant="outlined"> Regresar al carrito </Button>
                        <Button type="submit" variant="contained" color="primary"> Siguiente </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default FormDireccion
