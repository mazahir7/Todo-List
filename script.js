"use strict";

const noteContainer = document.querySelector(".todo-container ul");
const notes = document.querySelectorAll("li");
const noteInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add");

noteInput.focus();

function todosLoader() {

  const previousTodos = JSON.parse(localStorage.getItem("allTodos"));
  const previousCompletedTodos = JSON.parse(localStorage.getItem("completedTodos"));

  previousTodos && previousTodos.forEach((todo) => {
    createNote(todo);
  });

  previousCompletedTodos && updateCompletedTodosUI(previousCompletedTodos);
}

todosLoader();

noteInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  createNote(noteInput.value);
  noteInput.value = "";
});

addBtn.addEventListener("click", () => {
  createNote(noteInput.value);
  noteInput.value = "";
});


function toggleNote(e) {
  e.classList.toggle("completed");
  updateLocalStorage();
}

function deleteNote(e) {
  e.remove();
  updateLocalStorage();
}

function createNote(text) {

  if (text.trim() === "") return;

  const note = document.createElement("li");

  note.innerHTML = `
        <p class="todo-text">${text} 
        </p>
        <div class="todo-options">
          <button class="btn complete">Complete</button>
          <button class="btn delete">Delete</button>
        </div>
  `;

  noteContainer.appendChild(note);

  note.addEventListener("click", function (e) {

    const targetEl = e.target;

    if (!targetEl.classList.contains("btn")) return;

    if (targetEl.classList.contains("complete")) {
      toggleNote(targetEl.parentElement.parentElement);
    }

    if (targetEl.classList.contains("delete")) {
      deleteNote(targetEl.parentElement.parentElement);
    }
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const allTodos = document.querySelectorAll("li");

  const todosText = [];
  const completedTodos = [];

  allTodos.forEach(todo => {
    todosText.push(todo.firstElementChild.innerText);

    if (todo.classList.contains("completed")) {
      completedTodos.push(true);
    }
    else {
      completedTodos.push(false);
    }
  });

  localStorage.setItem("allTodos", JSON.stringify(todosText));
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));

}

function updateCompletedTodosUI(completedTodos) {
  const allTodos = document.querySelectorAll("li");

  allTodos.forEach((todo, idx) => {
    completedTodos[idx] && toggleNote(todo);
  });
}