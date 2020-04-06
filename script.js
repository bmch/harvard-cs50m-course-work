const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  listClass.createNewTodo();
}

class TodoList {
  constructor() {
    this.count = 0;
    this.uncheckedCount = 0;
  }

  handleCheckBox = (e) => {
    e.target.checked ? this.uncheckedCount-- : this.uncheckedCount++;
    this.replaceUncheckedCount();
  };

  replaceCount = () => {
    const countnode = document.createTextNode(this.count);
    itemCountSpan.replaceChild(countnode, itemCountSpan.childNodes[0]);
  };

  replaceUncheckedCount = () => {
    const uncheckednode = document.createTextNode(this.uncheckedCount);
    uncheckedCountSpan.replaceChild(
      uncheckednode,
      uncheckedCountSpan.childNodes[0]
    );
  };
  handleDelete = (e) => {
    const listItem = document.getElementById('item-' + e.target.id);
    const checkbox = listItem.childNodes[1];
    if (checkbox.checked === false) {
      this.uncheckedCount--;
      this.replaceUncheckedCount();
    }
    listItem.remove();
    this.count--;
    this.replaceCount();
  };

  createCheckBox = () => {
    const checkbox = document.createElement('input');
    checkbox.classList.add(classNames.TODO_CHECKBOX);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.onclick = this.handleCheckBox;
    return checkbox;
  };

  createDeleteButton = () => {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add(classNames.TODO_DELETE);
    deleteButton.innerText = 'delete';
    deleteButton.onclick = this.handleDelete;
    return deleteButton;
  };
  addErrorMessage = () => {
    document.getElementById('error-message').innerText = 'Please enter a value';
  };
  removeErrorMessage = () => {
    document.getElementById('error-message').innerText = '';
  };
  createNewTodo = () => {
    const randomID = new Date().toISOString();

    const listItem = document.createElement('li');
    listItem.classList.add(classNames.TODO_ITEM);
    listItem.id = 'item-' + randomID;

    const val = document.getElementById('todo-id').value;
    if (val.length == 0) {
      this.addErrorMessage();
      return;
    }
    if (val.length > 0) {
      this.removeErrorMessage();
    }
    const textnode = document.createTextNode(val);
    document.getElementById('todo-id').value = '';

    const checkbox = this.createCheckBox();
    const deleteButton = this.createDeleteButton();

    deleteButton.id = randomID;

    listItem.appendChild(textnode);
    listItem.appendChild(checkbox);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    this.count++;
    this.uncheckedCount++;

    this.replaceCount();
    this.replaceUncheckedCount();
  };
}

const listClass = new TodoList();
