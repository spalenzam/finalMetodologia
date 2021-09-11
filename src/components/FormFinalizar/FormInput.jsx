import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {

    const { control } = useForm();

    return (
        <Grid item xs={12} sm={6}>
            <Controller 
            render = {({field}) => 
            <TextField 
                {...field}        
                label={label} required
            />}
            name={name}
            control = {control}
            defaultValue=""
            required
        />
        </Grid>
    );
}

export default FormInput
