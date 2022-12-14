'use strict';

import ls from './ls.js';
import utils from './utils.js';

export default class Todos {
  
  constructor() {
    this.todoList = ls.getSavedData('todos') ?? [];
    this.parentElement = document.getElementById('todoList'); 
    this.filterList = {
      all: (entry) => { return entry; },
      completed: (entry) => {return entry.completed},
      active: (entry) => {return !entry.completed} 
    };
    this.activeFilter = this.filterList['all'];
  }

  // todoList getter
  getTodoList() {
    return this.todoList;
  }

  // todoList setter
  setTodoList(todo) {
    this.todoList.push(todo);
  }

  // activeFilter getter
  getActiveFilter() {
    return this.activeFilter;
  }

  // filterList getter
  getFilterList() {
    return this.filterList;
  }

  // activeFilter setter
  setActiveFilter(filter) {
    this.activeFilter = this.filterList[filter];
  }

  getActiveTodosLength() {
    return this.getTodoList().filter(this.filterList['active']).length;
  }

  getFilteredTodoList() {
    return this.getTodoList().filter(this.getActiveFilter());
  }

  // Save the list to local storage
  saveTodos() {
    ls.saveData('todos', this.getTodoList());
  }

  // Find a todo based on its key
  getTodo(key) {
    return this.getTodoList().find(todo => todo.key === key);
  }

  // Add a todo to todoList
  addTodo(task) {
    const todo = {
      key: Date.now(),
      content: task.trim(),
      completed: false
    };
    this.setTodoList(todo);
  }

  // Remove a todo from todoList
  deleteTodo(key) {
    const index = this.getTodoList().findIndex((todo) => todo.key === key);
    this.getTodoList().splice(index, 1);
  }

  // Complete a todo from todoList
  completeTodo(key) {
    const todo = this.getTodo(key);
    todo.completed = !todo.completed;
  }

  // Render the list of todos, its footer, and create the event listeners
  displayTodos() {
    utils.renderTodoList(this.parentElement, this.getFilteredTodoList());
    this.addCompletedListeners();
    this.addDeleteListeners();
    utils.renderFooter(this.getFilterList(), this.getActiveTodosLength(), this.getActiveFilter());
    this.addFilterListeners();
    this.addSubmitListener();
  }

  // Create checkboxes event listeners
  addCompletedListeners() {
    const childrenArray = [...this.parentElement.children];
    childrenArray.forEach(child => {
      const input = child.children.completeButton;
      input.addEventListener('click', e => {
        const key = parseInt(utils.getParentKey(e.currentTarget));
        this.completeTodo(key);
        this.saveTodos();
        this.displayTodos();
      });
    });
  }

  // Create delete buttons event listeners
  addDeleteListeners() {
    const childrenArray = [...this.parentElement.children];
    childrenArray.forEach(child => {
      const deleteButton = child.children.deleteButton;
      deleteButton.addEventListener('click', e => {
        const key = parseInt(utils.getParentKey(e.currentTarget));
        this.deleteTodo(key);
        this.saveTodos();
        this.displayTodos();
      });
    });
  }

  // Create filters event listeners
  addFilterListeners() {
    const filters = [...document.getElementById('filters').children];
    filters.forEach(child => {
      child.addEventListener('click', () => {
        this.setActiveFilter(child.textContent.toLowerCase());
        this.displayTodos();
      });
    })
  }

  // Create form event listener
  addSubmitListener() {
    const form = document.getElementById('newTodoForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const [input] = form.elements;
      if (input.value.trim() !== '') {
        this.addTodo(input.value);
        input.value = "";
        this.saveTodos();
        this.displayTodos();
      } else {
        input.value = "";
      }
    });
  }
}