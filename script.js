const inputBox = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const listContainer = document.querySelector('.list-container');

addBtn.addEventListener('click', addTask);
inputBox.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = inputBox.value;
    
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '\u00d7';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveData();
    });
    
    li.appendChild(deleteBtn);
    
    li.addEventListener('click', function() {
        li.classList.toggle('checked');
        saveData();
    });
    
    listContainer.appendChild(li);
    inputBox.value = '';
    saveData();
}

function saveData() {
    localStorage.setItem('tasks', listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem('tasks') || '';
    
    const tasks = listContainer.querySelectorAll('li');
    tasks.forEach(task => {
        const deleteBtn = task.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                task.remove();
                saveData();
            });
        }
        task.addEventListener('click', function() {
            task.classList.toggle('checked');
            saveData();
        });
    });
}

window.addEventListener('DOMContentLoaded', loadData);

