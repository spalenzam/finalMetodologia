import React, { useState, useEffect } from 'react';
import { Input, Select, MenuItem, Button, Grid, Typography, InputLabel } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';

const FormDireccion = ({ checkoutToken }) => {

    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))

    console.log(countries); 

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries); 
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
      }, []);

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    return (
        <>
            <Typography variant="h6" gutterBottom >Dirección de Envío</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='Nombre' label="Nombre" />
                        <FormInput required name='Apellido' label='Apellido' />
                        <FormInput required name='Dirección' label='Dirección' />
                        <FormInput required name='Email' label='Email' />
                        <FormInput required name='Ciudad' label='Ciudad' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>País</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}                                
                            </Select>
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Provincia</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}                                
                            </Select>
                        </Grid> 
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Opciones</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid> 
                </form>
            </FormProvider>
        </>
    )
}

export default FormDireccion
