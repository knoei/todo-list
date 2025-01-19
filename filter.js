document.addEventListener('DOMContentLoaded', () => {
  const filterDropdown = document.querySelector('.filter')
  const todoList = document.getElementById('todo-item')

  if (!filterDropdown || !todoList) {
    console.error('Filter dropdown or todo list not found.')
    return
  }

  function addTodoItem(text, checked = false) {
    const listItem = document.createElement('li')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = checked
    checkbox.addEventListener('change', () => {
      listItem.className = checkbox.checked ? 'completed' : ''
      updateFilter(filterDropdown.value)
    })

    const span = document.createElement('span')
    span.textContent = text
    span.addEventListener('click', () => {
      checkbox.checked = !checkbox.checked
      listItem.className = checkbox.checked ? 'completed' : ''
      updateFilter(filterDropdown.value)
    })

    listItem.appendChild(checkbox)
    listItem.appendChild(span)
    listItem.className = checked ? 'completed' : ''

    todoList.appendChild(listItem)
  }

  function updateFilter(filter) {
    const todoItems = todoList.querySelectorAll('li')

    todoItems.forEach((item) => {
      const isCompleted = item.classList.contains('completed')

      if (filter === 'all') {
        item.style.display = ''
      } else if (filter === 'completed') {
        item.style.display = isCompleted ? '' : 'none'
      } else if (filter === 'incompleted') {
        item.style.display = !isCompleted ? '' : 'none'
      }
    })
  }

  filterDropdown.addEventListener('change', (e) => {
    updateFilter(e.target.value)
  })

  updateFilter(filterDropdown.value)
})
