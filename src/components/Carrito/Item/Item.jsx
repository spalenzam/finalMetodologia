import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

const Item = ({ item, onModificarCantidad, onEliminarItems }) => {

    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.contenido}>
                <Typography variant="h5" >{item.name}</Typography>
                <Typography variant="h6" color="textSecondary">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>

            <CardActions className={classes.acciones}>
                <div className={classes.botones}>
                    <Button type="button" size="small" onClick={() => onModificarCantidad(item.id, item.quantity - 1)}>
                        -
                    </Button>                    

                    <Typography>{item.quantity}</Typography>

                    <Button type="button" size="small" onClick={() => onModificarCantidad(item.id, item.quantity + 1)}>
                        +
                    </Button>
                    
                </div>
                <Button variant="contained" type="button" color="primary" onClick={() => onEliminarItems(item.id)}>
                    Eliminar
                </Button>
            </CardActions>

        </Card>       
    )
}

export default Item
