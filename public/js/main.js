function onSubmit(e) {
    e.preventDefault();
  
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image1').src = '';
    document.querySelector('#image2').src = '';
    document.querySelector('#image3').src = '';

  
    const prompt = document.querySelector('#prompt').value;
  
  
    if (prompt === '') {
      alert('Please add some text');
      return;
    }
  
    generateImageRequest(prompt);
  }
  
  async function generateImageRequest(prompt) {
    try {
      showSpinner();
  
      const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          n: 3,  // specify that you want 3 images
        }),
      });
  
      if (!response.ok) {
        removeSpinner();
        throw new Error('That image could not be generated');
      }
  
      const data = await response.json();
  
      // data.data is an array of image URLs
      const imageUrls = data.data;
  
      // img elements for each of them
      document.querySelector('#image1').src = imageUrls[0];
      document.querySelector('#image2').src = imageUrls[1];
      document.querySelector('#image3').src = imageUrls[2];

  
      removeSpinner();
    } catch (error) {
      document.querySelector('.msg').textContent = error;
    }
  }
  
  
  function showSpinner() {
    document.querySelector('.spinner-container').style.display = 'block';
    document.querySelector('#generate-button').style.display = 'none';
  }
  
  function removeSpinner() {
    document.querySelector('.spinner-container').style.display = 'none';
    document.querySelector('#generate-button').style.display = 'block';
  }
  
  
  
  document.querySelector('#image-form').addEventListener('submit', onSubmit);


//`npm run dev` to start server -->
//`CTR` + `C` to stop server -->