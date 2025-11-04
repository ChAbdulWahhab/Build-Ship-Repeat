// ===== YEAR STAMP IN FOOTER =====

const yearSpan = document.getElementById("year");

if (yearSpan) {

  yearSpan.textContent = new Date().getFullYear();

}

// ===== THEME TOGGLE =====

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");

const quickDark = document.getElementById("quickDark");

// helper function

const applyTheme = (dark) => {

  root.setAttribute("data-theme", dark ? "dark" : "light");

  localStorage.setItem("theme", dark ? "dark" : "light");

};

// apply saved theme

applyTheme(localStorage.getItem("theme") === "dark");

// navbar toggle button

themeToggle?.addEventListener("click", () => {

  const isDark = root.getAttribute("data-theme") !== "dark";

  applyTheme(isDark);

});

// quick demo button

quickDark?.addEventListener("click", () => {

  const isDark = root.getAttribute("data-theme") !== "dark";

  applyTheme(isDark);

});

// ===== DEMO TO-DO LIST =====

// Hook: button with data-action="demo" data-demo="todo"

const todoBtn = document.querySelector('[data-action="demo"][data-demo="todo"]');

todoBtn?.addEventListener("click", () => {

  // simple demo: inject todo list in body

  const existing = document.getElementById("todoDemo");

  if (existing) {

    existing.remove(); // toggle off

    return;

  }

  const wrapper = document.createElement("div");

  wrapper.id = "todoDemo";

  wrapper.style.position = "fixed";

  wrapper.style.bottom = "1rem";

  wrapper.style.right = "1rem";

  wrapper.style.padding = "1rem";

  wrapper.style.background = "var(--card-bg)";

  wrapper.style.border = "1px solid var(--accent)";

  wrapper.style.borderRadius = "0.6rem";

  wrapper.style.width = "250px";

  wrapper.style.boxShadow = "0 6px 12px var(--shadow)";

  wrapper.innerHTML = `

    <h4 style="margin-bottom:0.5rem">📝 To-Do Demo</h4>

    <input id="todoInput" type="text" placeholder="Add task..." style="width:100%;padding:0.4rem;margin-bottom:0.5rem;border:1px solid var(--accent);border-radius:0.4rem;" />

    <ul id="todoList" style="list-style:none;padding:0;margin:0;max-height:150px;overflow:auto"></ul>

  `;

  document.body.appendChild(wrapper);

  const input = wrapper.querySelector("#todoInput");

  const list = wrapper.querySelector("#todoList");

  // load saved items

  let todos = JSON.parse(localStorage.getItem("todos") || "[]");

  const render = () => {

    list.innerHTML = "";

    todos.forEach((t, i) => {

      const li = document.createElement("li");

      li.textContent = t;

      li.style.padding = "0.3rem 0";

      li.style.cursor = "pointer";

      li.onclick = () => {

        todos.splice(i, 1);

        localStorage.setItem("todos", JSON.stringify(todos));

        render();

      };

      list.appendChild(li);

    });

  };

  render();

  input.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && input.value.trim()) {

      todos.push(input.value.trim());

      localStorage.setItem("todos", JSON.stringify(todos));

      input.value = "";

      render();

    }

  });

});