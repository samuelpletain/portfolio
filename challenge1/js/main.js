'use strict';

import Todos from './Todos.js';

const todos = new Todos();

todos.parentElement.addEventListener('load', todos.displayTodos());    
document.getElementById('todoContent').focus();