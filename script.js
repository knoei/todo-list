const inputBox = document.getElementById('input-container')
const todoList = document.getElementById('todo-item')
const errorMessage = document.getElementById('error-message')
const greetingMsg = document.getElementById('greeting-msg')
const pagination = document.querySelector('.pagination')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')
const pageLinks = document.querySelectorAll('.pagination ul .link')

const todos = []
let currentPage = 1
const tasksPerPage = 9

function renderGreeting() {
  if (todos.length === 0 && !document.getElementById('greeting-msg')) {
    const greeting = document.createElement('h2')
    greeting.id = 'greeting-msg'
    greeting.className = 'greeting-msg'
    greeting.textContent = "Hi there, are you ready to get today's works done?"
    todoList.appendChild(greeting)
  }
}

function renderTodos() {
  todoList.innerHTML = ''

  const startIndex = (currentPage - 1) * tasksPerPage
  const endIndex = startIndex + tasksPerPage
  const paginatedTodos = todos.slice(startIndex, endIndex)

  paginatedTodos.forEach(({ id, text, checked }) => {
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
        todos[id - 1].text = newText
      }
    })

    const deleteBtn = document.createElement('i')
    deleteBtn.className = 'far fa-times-circle delete-item'
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      todos.splice(id - 1, 1)
      updateIds()
      renderTodos()
      updatePagination()
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
  })

  if (todos.length === 0) {
    renderGreeting()
  }

  updatePagination()
}

function updateIds() {
  todos.forEach((todo, index) => {
    todo.id = index + 1
  })
}

function updatePagination() {
  const totalPages = Math.ceil(todos.length / tasksPerPage)

  pageLinks.forEach((link) => {
    const pageValue = parseInt(link.getAttribute('value'))
    if (pageValue > totalPages) {
      link.style.display = 'none'
    } else {
      link.style.display = 'inline-block'
    }

    link.classList.toggle('active', pageValue === currentPage)
    if (pageValue === currentPage) {
      link.style.backgroundColor = 'var(--button-color)'
      link.style.color = '#fff'
    } else {
      link.style.backgroundColor = ''
      link.style.color = ''
    }
  })

  prevBtn.disabled = currentPage === 1
  nextBtn.disabled = currentPage === totalPages
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--
    renderTodos()
  }
})

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(todos.length / tasksPerPage)
  if (currentPage < totalPages) {
    currentPage++
    renderTodos()
  }
})

pageLinks.forEach((link) => {
  link.addEventListener('click', () => {
    currentPage = parseInt(link.getAttribute('value'))
    renderTodos()
  })
})

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

    const newId = todos.length + 1
    todos.push({ id: newId, text: newTask, checked: false })
    inputBox.value = ''
    renderTodos()
  }
})

renderTodos()
