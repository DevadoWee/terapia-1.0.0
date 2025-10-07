document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://eollyai2hp5gjhv.m.pipedream.net', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Form sent successfully!');
      e.target.reset();
    } else {
      alert('Something went wrong. Try again.');
    }
  } catch (error) {
    alert('Error sending form.');
    console.error(error);
  }
});
