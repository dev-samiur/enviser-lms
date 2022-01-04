import React, { useState, useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import API from '../utils/API'

export default function Paypal({ venueId, venueTitle, price, date }) {
  const [paidFor, setPaidFor] = useState(false);
  const paypalRef = useRef();

  const router = useRouter();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: venueTitle,
                amount: {
                  currency_code: 'USD',
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          saveTransaction();
          bookVenue();
					setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [venueTitle, price]);

  const saveTransaction = () => {
    API({
      method: 'POST',
      url: '/transaction',
      data: {
        courseId: venueId,
        userId: localStorage.getItem('userId'),
				paidBy: localStorage.getItem('email'),
        method: 'Paypal',
        date: date,
      },
    })
      .then((response) => {
        if (response.data.success) console.log('Success saving transaction');
        else alert('Error saving transaction');
      })
      .catch((err) => {
        alert('Error saving transaction');
      });
  };

  const bookVenue = () => {
    API({
      method: 'POST',
      url: '/enroll',
      data: {
        courseId: venueId,
        userId: localStorage.getItem('userId'),
        date,
      },
    })
      .then((response) => {
        if (response.data.success) alert('Successfully enrolled');
        else alert('Error enrolling the course');
      })
      .catch((err) => {
        alert('Error enrolling the course');
      });
  };

  if (paidFor) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h5">
          Congrats, you just enrolled {venueTitle}
        </Typography>
        <Button
          onClick={(e) => router.push('/dashboard')}
          style={{ marginTop: 20 }}
          variant="contained"
          color="primary"
        >
          Go To Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <div style={{display: 'flex', justifyContent:"center", alignItems:"center"}}>
      <div ref={paypalRef} style={{width: 200}} />
    </div>
  );
}
