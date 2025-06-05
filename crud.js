let editIndex = null;

    document.addEventListener("DOMContentLoaded", () => {
      renderTodos();

      document.getElementById("write-btn").addEventListener("click", () => {
        editIndex = null;
        document.getElementById("form").reset();
        document.getElementById("popup").classList.add("active");
      });

      document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("popup").classList.remove("active");
      });

      document.getElementById("popup-save-btn").addEventListener("click", () => {
        const task = document.getElementById("task").value.trim();
        const priority = document.getElementById("priority").value;
        const memo = document.getElementById("memo").value.trim();
        if (!task || memo.length < 10) {
          alert("이름을 입력하고 자기소개는 10자 이상 입력해주세요.");
          return;
        }

        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const newTodo = { task, priority, memo };
        if (editIndex !== null) {
          todos[editIndex] = newTodo;
        } else {
          todos.push(newTodo);
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
        document.getElementById("popup").classList.remove("active");
      });
    });

    function renderTodos() {
      const list = document.getElementById("contents-list");
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      list.innerHTML = "";
      todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${todo.task}</strong> (${todo.priority})<br/>
          ${todo.memo}<br/>
          <button class="edit" onclick="editTodo(${index})">수정</button>
          <button class="delete" onclick="deleteTodo(${index})">삭제</button>
          <button class="duplicate" onclick="duplicateTodo(${index})">추가</button>
        `;
        list.appendChild(li);
      });
    }

    function deleteTodo(index) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }

    function duplicateTodo(index) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.splice(index + 1, 0, { ...todos[index] });
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }

    function editTodo(index) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const todo = todos[index];
      editIndex = index;
      document.getElementById("task").value = todo.task;
      document.getElementById("priority").value = todo.priority;
      document.getElementById("memo").value = todo.memo;
      document.getElementById("popup").classList.add("active");
    }
