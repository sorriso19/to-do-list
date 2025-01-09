"use strict";

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todosElems = document.getElementsByClassName('.todo')
const todoCompleted = document.querySelector('.todo-completed')
const addBtn = document.querySelector('.header-button')
const btnRemove = document.querySelector('.todo-remove')
const text = document.getElementsByClassName('.text-todo')



const todo = JSON.parse(localStorage.getItem("todo"));



const toDoData = []


const render = function() {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

          
       toDoData.forEach(function(item) {
              
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' + 
		    '<button class="todo-remove"></button>' + 
		    '<button class="todo-complete"></button>' + 
		    '</div>'
        
        if(item.completed) {
            todoCompleted.append(li) 
        } else {
            todoList.append(li)
        }
    
        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed
        
            render()
        })
       
            
        })
    }
   

todoControl.addEventListener('submit', function(event) {
    event.preventDefault()

    const newToDo = {
        text: headerInput.value,
        completed: false
    }

    toDoData.push(newToDo)
    headerInput.value = ''

    
    render()
})

function updateLocalStorage() {
    const li = document.querySelectorAll("li");
    const toDoData = [];
    toDoData.forEach(function() {
      toDoData.push({
        text: headerInput.innerText,
        completed: todoCompleted.classList.contains("completed"),
      });
    });
  
    localStorage.setItem("todo", JSON.stringify(toDoData));
  }


  btnRemove.addEventListener('click', function() {
    if(todoCompleted){
        localStorage.removeItem('li')
    }
  })

  window.addEventListener('storage', ({ key, newValue: value }) => {  
	
	toDoData.push(value);
	render();
});