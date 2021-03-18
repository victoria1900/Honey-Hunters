const form = document.getElementById('data')
const commentsWrapper = document.getElementById('comment-wrapper')
const editBtn = document.getElementById('editBtn')
let pickedComment = null

const name = form.querySelector('[name="name"]'),
    text = form.querySelector('[name="text"]'),
    email = form.querySelector('[name="email"]')

let commentList = [
  {id: 1, name: "Вася", email: "vasya@mail.ru", message: "Сообщение от Василия Пупкина."},
  {id: 2, name: "Маруся", email: "marysia@mail.ru", message: "Всем привет, я Маруся"},
]

render(commentList)

form.addEventListener('submit', retrieveFormValue)

commentsWrapper.addEventListener('click', insertDataInInputs)

editBtn.addEventListener('click', function () {
  pickedComment.name = name.value;
  pickedComment.email = email.value;
  pickedComment.message = text.value;
  render(commentList)
})


/*







Вспомогательные функции








 */

function insertDataInInputs(eventObject) {
  let commentElement = findElementInParents(eventObject.target, 'comment-item')
  pickComment(+commentElement.dataset.id)
}

function findElementInParents(currentElement, stopClass) {
  let stopper = 0
  while (!currentElement.classList.contains(stopClass)) {
    currentElement = currentElement.parentElement
    stopper++
    if (stopper > 10) throw new Error("Слишком глубоко вложен")
  }
  return currentElement
}

function pickComment(commentId) {
  pickedComment = commentList.find(function (comment){
    return comment.id === commentId
  })
  name.value = pickedComment.name;
  email.value = pickedComment.email;
  text.value = pickedComment.message;
}

function addComment(newComment) {
  commentList.push(newComment)
  render(commentList)
}

function render(model) {
  commentsWrapper.innerHTML = ''
  model.forEach(function (comment){
    commentsWrapper.insertAdjacentHTML('beforeend', getTemplate(comment))
  })
}

function getTemplate(comment) {
  return `
  <div class="comment-item" data-id="${comment.id}">
      <h3 class="comment-item__header">${comment.name}</h3>
      <div class="comment-item__description">
         <h4 class="email">${comment.email}</h4>
          <p class="comment-item__message">${comment.message}</p>
      </div>
  </div>
  `
}

function retrieveFormValue(event) {
  event.preventDefault();

  let newComment = {
    id: Date.now(),
    name: name.value,
    email: email.value,
    message: text.value
  }

  addComment(newComment)
}