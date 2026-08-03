(() => {
  const body = document.body;
  const storeKey = body.dataset.store || "store";
  const currency = body.dataset.currency || "$";

  const state = {
    items: load(),
  };

  function load() {
    try {
      return JSON.parse(localStorage.getItem("cart_" + storeKey)) || {};
    } catch {
      return {};
    }
  }

  function save() {
    localStorage.setItem("cart_" + storeKey, JSON.stringify(state.items));
  }

  function fmt(n) {
    return currency + Number(n).toFixed(2);
  }

  function getProducts() {
    const scripts = document.querySelectorAll('script[type="application/json"][id^="products"]');
    let all = [];
    scripts.forEach((s) => {
      try {
        all = all.concat(JSON.parse(s.textContent) || []);
      } catch (e) {
        console.error("Bad product JSON in " + s.id, e);
      }
    });
    return all;
  }

  function findProduct(id) {
    return getProducts().find((p) => String(p.id) === String(id));
  }

  function renderProducts() {
    document.querySelectorAll("[data-grid]").forEach((grid) => {
      const sourceId = grid.dataset.products;
      const raw = sourceId ? document.getElementById(sourceId) : null;
      const products = raw ? (() => { try { return JSON.parse(raw.textContent) || []; } catch { return []; } })() : [];
      grid.innerHTML = "";
      products.forEach((p) => {
        const card = document.createElement("article");
        card.className = "card";

        const img = document.createElement("div");
        img.className = "product-img";
        img.setAttribute("aria-hidden", "true");
        img.textContent = p.icon || "🛍";
        if (p.tag) {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = p.tag;
          img.appendChild(tag);
        }

        const bodyEl = document.createElement("div");
        bodyEl.className = "card-body";

        const cat = document.createElement("div");
        cat.className = "cat";
        cat.textContent = p.category || "Product";

        const h3 = document.createElement("h3");
        h3.textContent = p.name;

        const desc = document.createElement("p");
        desc.textContent = p.desc || "";

        const split = document.createElement("div");
        split.className = "row-split";

        const price = document.createElement("span");
        price.className = "price";
        price.textContent = fmt(p.price);

        const add = document.createElement("button");
        add.className = "add";
        add.textContent = "Add to cart";
        add.addEventListener("click", () => addToCart(p));

        split.append(price, add);
        bodyEl.append(cat, h3, desc, split);
        card.append(img, bodyEl);
        grid.appendChild(card);
      });
    });
  }

  function addToCart(p) {
    const id = String(p.id);
    state.items[id] = (state.items[id] || 0) + 1;
    save();
    renderCart();
    toast("Added " + p.name + " to cart");
  }

  function changeQty(id, delta) {
    state.items[id] = (state.items[id] || 0) + delta;
    if (state.items[id] <= 0) delete state.items[id];
    save();
    renderCart();
  }

  function renderCart() {
    const all = getProducts();
    const total = Object.entries(state.items).reduce((sum, [id, qty]) => {
      const p = all.find((x) => String(x.id) === String(id));
      return p ? sum + Number(p.price) * qty : sum;
    }, 0);

    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = Object.values(state.items).reduce((a, b) => a + b, 0);
      el.style.display = Object.keys(state.items).length ? "inline-flex" : "none";
    });

    const itemsEl = document.getElementById("cart-items");
    const emptyEl = document.getElementById("cart-empty");
    const totalEl = document.getElementById("cart-total");
    const entries = Object.entries(state.items);

    if (!itemsEl) return;

    if (!entries.length) {
      if (emptyEl) emptyEl.style.display = "block";
      itemsEl.innerHTML = "";
    } else {
      if (emptyEl) emptyEl.style.display = "none";
      itemsEl.innerHTML = "";
      entries.forEach(([id, qty]) => {
        const p = all.find((x) => String(x.id) === String(id));
        if (!p) return;
        const row = document.createElement("div");
        row.className = "drawer-item";

        const thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.textContent = p.icon || "🛍";

        const info = document.createElement("div");
        info.className = "info";
        const name = document.createElement("div");
        name.className = "name";
        name.textContent = p.name;
        const qtyEl = document.createElement("div");
        qtyEl.className = "qty";
        qtyEl.textContent = qty + " × " + fmt(p.price) + " = " + fmt(Number(p.price) * qty);
        info.append(name, qtyEl);

        const rm = document.createElement("button");
        rm.className = "remove";
        rm.textContent = "✕";
        rm.setAttribute("aria-label", "Remove item");
        rm.addEventListener("click", () => changeQty(id, -1));

        row.append(thumb, info, rm);
        itemsEl.appendChild(row);
      });
    }

    if (totalEl) totalEl.textContent = fmt(total);
  }

  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  function toggleDrawer(open) {
    document.getElementById("cart-drawer").classList.toggle("open", open);
    document.getElementById("cart-overlay").classList.toggle("open", open);
  }

  function init() {
    renderProducts();
    renderCart();

    document.getElementById("cart-open").addEventListener("click", () => toggleDrawer(true));
    document.getElementById("cart-close").addEventListener("click", () => toggleDrawer(false));
    document.getElementById("cart-overlay").addEventListener("click", () => toggleDrawer(false));
    document.getElementById("checkout").addEventListener("click", () => {
      if (!Object.keys(state.items).length) return toast("Your cart is empty");
      window.dispatchEvent(new CustomEvent("checkout-requested"));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleDrawer(false);
    });
    window.addEventListener("cart:updated", () => {
      state.items = load();
      renderCart();
    });
  }

  init();
})();