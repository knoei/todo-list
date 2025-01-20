const inputBox = document.getElementById('input-container')
const todoList = document.getElementById('todo-item')
const errorMessage = document.getElementById('error-message')
const greetingMsg = document.getElementById('greeting-msg')

const todos = []

function removeGreeting() {
  if (greetingMsg) {
    greetingMsg.remove()
  }
}

todos.forEach(({ id, text, checked }) => {
  addTodoItem(id, text, checked)
})

function addTodoItem(id, text, checked) {
  const listItem = document.createElement('li')
  listItem.setAttribute('data-id', id)

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = checked
  checkbox.addEventListener('change', () => {
    listItem.className = checkbox.checked ? 'completed' : ''
  })

  const span = document.createElement('span')
  span.textContent = text

  const iconContainer = document.createElement('div')
  iconContainer.className = 'icon-container'

  const editBtn = document.createElement('i')
  editBtn.className = 'far fa-edit edit-item'
  editBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    const newText = prompt('Edit your task:', text)
    if (newText) {
      span.textContent = newText
    }
  })

  const deleteBtn = document.createElement('i')
  deleteBtn.className = 'far fa-times-circle delete-item'
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    listItem.remove()
  })

  iconContainer.appendChild(editBtn)
  iconContainer.appendChild(deleteBtn)

  listItem.appendChild(checkbox)
  listItem.appendChild(span)
  listItem.appendChild(iconContainer)

  listItem.addEventListener('click', (event) => {
    if (event.target === checkbox) return
    checkbox.checked = !checkbox.checked
    listItem.className = checkbox.checked ? 'completed' : ''
  })

  todoList.appendChild(listItem)
}

inputBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const newTask = inputBox.value.trim()

    if (newTask.length < 3) {
      errorMessage.textContent = 'Task must be at least 3 characters long.'
      inputBox.classList.add('error')
      return
    }
    if (/^\d+$/.test(newTask)) {
      errorMessage.textContent = 'Task cannot be only numbers.'
      inputBox.classList.add('error')
      return
    }

    errorMessage.textContent = ''
    inputBox.classList.remove('error')

    removeGreeting()

    const newId = todos.length + 1
    todos.push({ id: newId, text: newTask, checked: false })
    addTodoItem(newId, newTask, false)
    inputBox.value = ''
  }
})
