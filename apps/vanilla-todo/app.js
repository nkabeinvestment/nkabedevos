(() => {
  const STORAGE_KEY = "portfolio-todos";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const empty = document.getElementById("empty");
  const count = document.getElementById("count");
  const clearBtn = document.getElementById("clear");
  const filterBtns = document.querySelectorAll("[data-filter]");

  let todos = load();
  let filter = "all";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function visible() {
    return todos.filter((t) =>
      filter === "all" ? true : filter === "completed" ? t.done : !t.done
    );
  }

  function render() {
    const items = visible();
    list.innerHTML = "";

    items.forEach((todo) => {
      const li = document.createElement("li");
      if (todo.done) li.classList.add("completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.setAttribute("aria-label", "Mark task done");

      const span = document.createElement("span");
      span.className = "text";
      span.textContent = todo.text;

      const del = document.createElement("button");
      del.className = "del";
      del.textContent = "✕";
      del.setAttribute("aria-label", "Delete task");

      checkbox.addEventListener("change", () => {
        todo.done = checkbox.checked;
        save();
        render();
      });

      del.addEventListener("click", () => {
        todos = todos.filter((t) => t !== todo);
        save();
        render();
      });

      li.append(checkbox, span, del);
      list.appendChild(li);
    });

    const remaining = todos.filter((t) => !t.done).length;
    count.textContent = `${remaining} left`;
    empty.style.display = items.length ? "none" : "block";
    clearBtn.style.display = todos.some((t) => t.done) ? "inline-block" : "none";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.push({ text, done: false });
    input.value = "";
    save();
    render();
  });

  filterBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      render();
    })
  );

  clearBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.done);
    save();
    render();
  });

  render();
})();