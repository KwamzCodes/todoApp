const input = document.getElementById('todoInput');
const button = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

loadTodos();
//you must loadTodos before the start of everything.
 
function addTask(){
const value = todoInput.value.trim();

if(value){
  createElement(value);
  todoInput.value = '';
  saveTask();
}
else{
  alert('Please add task')
}

}

button.addEventListener('click', addTask);
button.addEventListener('keyup', e => {
  e.preventDefault();
if(e.keyCode === 13){
  addTask();
}
}
);

function createElement(value){
const listItem = document.createElement('li');
listItem.textContent = value;
todoList.appendChild(listItem );

const completeBtn = document.createElement('button');
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete'
deleteBtn.className = 'del';
completeBtn.textContent = 'Complete';
completeBtn.className = 'complete';
todoList.appendChild(deleteBtn);
todoList.appendChild(completeBtn);

completeBtn.addEventListener('click', function(){
  listItem.style.textDecoration = 'line-through';
  completeBtn.style.visibility = 'hidden';
  deleteBtn.style.visibility = 'visible';
  listItem.style.color = 'black';
  listItem.style.backgroundColor = 'grey';
  saveTask();
})

deleteBtn.addEventListener('click', function(){
todoList.removeChild(listItem);
deleteBtn.style.display = "none";

saveTask();
})

}



function saveTask(){
  let todos = [];
  todoList.querySelectorAll('li').forEach(function(item){
    todos.push(item.textContent.trim()) ;
  });
  /*the code above means, all the list elements has been selected with the querySelector and a For Each method is run thru each one of them,
  the item in the function represent each of the individual list elements. The list element is then pushed into the todos array one after the 
  other and trimmed to prevent whitespace.*/
  localStorage.setItem('todos', JSON.stringify(todos))
}

function loadTodos(){

const todos = JSON.parse(localStorage.getItem('todos')) || [];
todos.forEach(createElement);
/*so the code above means, before you can load an element it needs to be back in the array form since we converted it all into string,
After converting it back to the array form, you must run a For Eacbh method to every single one of them and give them a place to stay
hence calling the createElement function.*/
}