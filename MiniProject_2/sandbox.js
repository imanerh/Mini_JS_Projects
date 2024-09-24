const form = document.querySelector('#add-todo-form');
const todoList = document.querySelector('#todo-list');
const searchInput = document.querySelector('#search-todo');

// Function to generate a todo
function generateTodoTemplate(todo) {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  todoList.innerHTML += html;
}

// Event listener for adding todos
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const todo = form.add.value.trim();
  if (todo.length) {
    generateTodoTemplate(todo);
    form.reset();
  }
});

// Event listener for deleting todos
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

// Function to filter todos
function filterTodos(term) {
    const nonMatchingTodos = Array.from(todoList.children)
      .filter((todo) => !todo.textContent.toLowerCase().includes(term));
    nonMatchingTodos.forEach((todo) => todo.classList.add('filtered'));

    const matchingTodos = Array.from(todoList.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(term));
    matchingTodos.forEach((todo) => todo.classList.remove('filtered'));
}

// Event listener for filtering todos based on search input
searchInput.addEventListener('keyup', () => {
  const term = searchInput.value.trim().toLowerCase();
  filterTodos(term);
});
