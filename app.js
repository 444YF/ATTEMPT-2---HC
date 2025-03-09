document.getElementById('payNow').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: '1f1f2a61-5b68-4725-a0ce-9560514ec00b',
        amount: 15.02,
        currency: 'gbp',
        customer: {
          customer_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          first_name: 'Edward',
          last_name: 'Johnson',
          email: 'ejohnson@acquired.com',
          phone: { country_code: '44', number: '2039826580' },
        },
        redirect_url: 'https://yourdomain.com/redirect',
        webhook_url: 'https://yourdomain.com/webhook',
      })
    });
    const data = await response.json();

    if (data.paymentLink) {
      window.location.href = data.paymentLink;
    } else {
      alert('Error: Unable to create payment link');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error connecting to the payment API');
  }
});
