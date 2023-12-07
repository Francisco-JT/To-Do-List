// Seleção de elementos
const todoForm = document.getElementById('form');
const todoInput = document.getElementById('input');
const todoList = document.getElementById('todo-list');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

let oldInputValue;


// Funçôes
const saveTudo = (text) => {

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="bi bi-check2-all"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="bi bi-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="bi bi-x"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
};

const toggleForm = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}

// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        // save todo
        saveTudo(inputValue);
    };
});

document.addEventListener('click', (e) => {

const targeEl = e.target;
const parentEl = targeEl.closest('div');
let todoTitle;

if (parentEl && parentEl.querySelector('h3')) {
    todoTitle = parentEl.querySelector('h3').innerText;
}

if (targeEl.classList.contains('finish-todo')) {
    parentEl.classList.toggle('done');
}

if (targeEl.classList.contains('remove-todo')) {
    parentEl.remove();
}

if (targeEl.classList.contains('edit-todo')) {
    toggleForm();

    editInput.value = todoTitle
    oldInputValue = todoTitle
}

});


cancelEditBtn.addEventListener('click', (e) => {
    
    e.preventDefault();

    toggleForm();

});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForm();
})