const formElement = document.querySelector('form');
const responseText = document.querySelector('#responseText');


const handleFormSubmit = async event => {
  event.preventDefault();
  responseText.innerText = 'Loading...'
  const form = new FormData(formElement);
  const slug = form.get('slug');
  const url = form.get('url');
  const newUrl = {
    slug,
    url
  }
  const response = await fetch('/url', {
    method: 'POST',
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify(newUrl)
  });
  if (response.status === 400) {
    responseText.innerText = 'Slug in use 🍔.'
    // console.log(response);
    return
  }
  // console.log(response);
  const data = await response.json();
  responseText.innerHTML = `Slug: ${data.slug} <br>Url: ${data.url}`
  console.log(data);

}

formElement.addEventListener('submit', handleFormSubmit)
