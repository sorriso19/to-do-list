"use strict";

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const toDoData = []

const uploadLocalStorage = function() {
    const uploadLocStor = localStorage.getItem('todoList')
    if(uploadLocStor !== null) {
        const saveTodo = JSON.parse(uploadLocStor)
        saveTodo.forEach(function(item) {
            toDoData.push(item)
        })    
        
    }
}

const savetoDoData = function() {
    localStorage.setItem('todoList', JSON.stringify(toDoData))
}


const render = function() {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

          
       toDoData.forEach(function(item, index) {
              
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
            savetoDoData()
        })
          
        li.querySelector('.todo-remove').addEventListener('click', function() {
           
            li.remove()
            toDoData.splice(index, 1)
            render()

            if(toDoData.length !== 0) {
                savetoDoData()
            } else {
                localStorage.removeItem('todoList')
            }
        })
            
    });
            
}
                
  
    todoControl.addEventListener('submit', function(event) {
    event.preventDefault()
   
    const newToDo = {
        
        text: headerInput.value,
        completed: false
    }

    if (headerInput.value.trim() !== '') {
    toDoData.push(newToDo)
    headerInput.value = ''
    savetoDoData()
    render()
    }
}) 
    
uploadLocalStorage()   
document.addEventListener('DOMContentLoaded', render) 