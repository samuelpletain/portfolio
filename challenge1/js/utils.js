'use strict';

const utils = {
  createHTMLElement(tag, attributes) {
    const element = document.createElement(tag);
    for (const attribute in attributes) {
      element[attribute] = attributes[attribute];
    }
    return element;
  },
  getParentKey(target) {
    return target.parentNode.dataset.key;
  },
  renderOneTodo(todo) {
    const item = this.createHTMLElement('li', 
    {
      classList: 'todo_list__todo todo', 
      innerHTML: `
        <input type="checkbox" class="todo__toggle" name="completeButton" ${todo.completed ? 'checked' : ''}>
        <p class="todo__content">${todo.content}</p>
        <div class="todo__delete_button" name="deleteButton"><span class="material-symbols-outlined">
        cancel
        </span></div>
        `
    });
    item.dataset.key = todo.key;
    if (todo.completed) {
      item.classList.toggle("todo--completed");
    }
    return item;
  },
  isEmpty(array) {
    return array.length === 0;
  },
  renderTodoList(parent, todoList) {
    parent.innerHTML = '';
    if (!this.isEmpty(todoList)) {
      parent.classList.remove('empty');
      todoList.forEach(todo => {
        parent.appendChild(this.renderOneTodo(todo));
      });
    } else {
      parent.classList.add('empty');
    }
  },
  renderFooter(filterList, tasksLeft, currentFilter) {
    const parent = document.getElementById('list_footer');
    const p = this.createHTMLElement('p', {textContent: `${tasksLeft} task${tasksLeft <= 1 ? '' : 's'} left`});
    const list = this.createHTMLElement('ul', {id: "filters"});
    
    parent.innerHTML = "";
    parent.appendChild(p);
    for(const filter in filterList) {
      const li = this.createHTMLElement('li', {classList: "filters__filter filter", textContent: filter.charAt(0).toUpperCase() + filter.slice(1)});
      
      if (filterList[filter] === currentFilter) {
        li.classList.add('filter--selected')
      }
      list.appendChild(li);
    }
    parent.appendChild(list);  
  }
} 

export default utils;