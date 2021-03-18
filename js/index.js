const form = document.getElementById('data')

function retrieveFormValue(event) {
  event.preventDefault();

  const name = form.querySelector('[name="name"]'),
    text = form.querySelector('[name="text"]'),
    email = form.querySelector('[name="email"]')

  const values = {
    name: name.value,
    text: text.value,
    email: email.value
  }
  console.log('index', values)
}

form.addEventListener('submit', retrieveFormValue)