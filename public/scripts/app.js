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
  const data = await response.json();
  if (response.status === 400) {
    responseText.innerText = data.message
    console.log(response);
    return
  }
  // console.log(response);
  responseText.innerHTML = `Slug: ${data.slug} <br>Url: ${data.url}`
  console.log(data);

}

formElement.addEventListener('submit', handleFormSubmit)
