import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Resumen'

const stripePromise = loadStripe('...');

const FormPago = ({ dataE, checkoutToken, proxPaso, pasoAnt, onFinalizar }) => {

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
    
        if (!stripe || !elements) return;
    
        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
        if (error) {
          console.log('[error]', error);
        } else {
          const DatosDeLaOrden = {
            line_items: checkoutToken.live.line_items,
            customer: { firstname: dataE.firstName, lastname: dataE.lastName, email: dataE.email },
            shipping: { 
                name: 'International', 
                street: dataE.address1, 
                town_city: dataE.city, 
                county_state: dataE.shippingSubdivision, 
                postal_zip_code: dataE.zip, 
                country: dataE.shippingCountry },
            fulfillment: { shipping_method: dataE.shippingOption },
            payment: {
              gateway: 'stripe',
              stripe: {
                payment_method_id: paymentMethod.id,
              },
            },
          };
    
          onFinalizar(checkoutToken.id, DatosDeLaOrden);
    
          proxPaso();
        }
      };

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Metodo de Pago</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={pasoAnt}>Volver</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                Pagar {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Button>
                        </div>
                    </form>
                )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default FormPago
