document.addEventListener('DOMContentLoaded', () => {
  const filterDropdown = document.querySelector('.filter')
  const todoList = document.getElementById('todo-item')

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
