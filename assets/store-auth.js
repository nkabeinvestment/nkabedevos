(() => {
  const storeKey = document.body.dataset.store || "store";
  const USERS_KEY = "acc_users_" + storeKey;
  const SESSION_KEY = "acc_session_" + storeKey;

  const ui = {
    accountBox: null,
    accountBtn: null,
    accountLabel: null,
    authOverlay: null,
    authCard: null,
    dropdown: null,
  };

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; }
  }
  function saveUsers(u) {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
  }
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
  }
  function setSession(user) {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }
  let current = getSession();

  function el(tag, cls, html) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function buildAccountButton() {
    ui.accountBox = el("div", "account-box");
    ui.accountBtn = el("button", "account-btn", '👤 <span class="account-label">Sign in</span>');
    ui.accountBtn.id = "account-open";
    ui.accountBox.appendChild(ui.accountBtn);

    const cartBtn = document.getElementById("cart-open");
    if (cartBtn && cartBtn.parentElement) {
      cartBtn.parentElement.insertBefore(ui.accountBox, cartBtn);
    }
  }

  function buildAuthModal() {
    const overlay = el("div", "modal-overlay");
    overlay.id = "auth-overlay";
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeAuth(); });

    const card = el("div", "modal-card auth-card");
    card.id = "auth-card";
    card.innerHTML = `
      <div class="auth-tabs">
        <button class="auth-tab active" data-auth-tab="signin">Sign in</button>
        <button class="auth-tab" data-auth-tab="signup">Create account</button>
        <button class="modal-close" id="auth-close" aria-label="Close">✕</button>
      </div>

      <form id="auth-form" class="auth-form" novalidate>
        <div class="field" id="field-name" style="display:none">
          <label for="auth-name">Full name</label>
          <input id="auth-name" type="text" autocomplete="name" />
        </div>
        <div class="field">
          <label for="auth-email">Email</label>
          <input id="auth-email" type="email" autocomplete="email" />
        </div>
        <div class="field">
          <label for="auth-pass">Password</label>
          <input id="auth-pass" type="password" autocomplete="current-password" />
        </div>
        <p class="form-error" id="auth-error"></p>
        <button type="submit" class="btn primary block" id="auth-submit">Sign in</button>
      </form>

      <div class="auth-divider"><span>or</span></div>
      <button class="btn ghost block" id="demo-login">Continue as demo customer</button>
      <p class="auth-note">Demo store — accounts are stored only in this browser.</p>
    `;
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    ui.authOverlay = overlay;
    ui.authCard = card;

    card.querySelectorAll("[data-auth-tab]").forEach((tab) => {
      tab.addEventListener("click", () => setAuthTab(tab.dataset.authTab));
    });
    document.getElementById("auth-close").addEventListener("click", closeAuth);
    document.getElementById("auth-form").addEventListener("submit", onSubmit);
    document.getElementById("demo-login").addEventListener("click", demoLogin);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAuth(); });
  }

  let authMode = "signin";
  function setAuthTab(mode) {
    authMode = mode;
    ui.authCard.querySelectorAll("[data-auth-tab]").forEach((t) =>
      t.classList.toggle("active", t.dataset.authTab === mode)
    );
    document.getElementById("field-name").style.display = mode === "signup" ? "block" : "none";
    document.getElementById("auth-submit").textContent = mode === "signup" ? "Create account" : "Sign in";
    clearError();
  }

  function showError(msg) {
    const err = document.getElementById("auth-error");
    err.textContent = msg;
  }
  function clearError() {
    document.getElementById("auth-error").textContent = "";
  }

  function onSubmit(e) {
    e.preventDefault();
    clearError();
    const name = (document.getElementById("auth-name").value || "").trim();
    const email = (document.getElementById("auth-email").value || "").trim().toLowerCase();
    const pass = document.getElementById("auth-pass").value;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("Enter a valid email address.");
    if (pass.length < 6) return showError("Password must be at least 6 characters.");

    const users = getUsers();
    if (authMode === "signup") {
      if (!name) return showError("Enter your full name.");
      if (users[email]) return showError("An account with this email already exists. Sign in instead.");
      users[email] = { name, email, password: pass, createdAt: Date.now() };
      saveUsers(users);
      setSession(users[email]);
    } else {
      const u = users[email];
      if (!u || u.password !== pass) return showError("Wrong email or password.");
      setSession(u);
    }
    current = getSession();
    renderAccountUI();
    closeAuth();
    toast("Welcome" + (current.name ? ", " + current.name : ""));
    window.dispatchEvent(new CustomEvent("auth:changed", { detail: { user: current } }));
  }

  function demoLogin() {
    const users = getUsers();
    const email = "demo@client.com";
    if (!users[email]) {
      users[email] = { name: "Demo Client", email, password: "demo1234", createdAt: Date.now() };
      saveUsers(users);
    }
    setSession(users[email]);
    current = getSession();
    renderAccountUI();
    closeAuth();
    toast("Signed in as Demo Client");
    window.dispatchEvent(new CustomEvent("auth:changed", { detail: { user: current } }));
  }

  function buildDropdown() {
    ui.dropdown = el("div", "account-dropdown");
    ui.dropdown.id = "account-menu";
    document.body.appendChild(ui.dropdown);
    ui.dropdown.addEventListener("click", (e) => {
      const action = e.target.closest("[data-action]");
      if (!action) return;
      if (action.dataset.action === "logout") {
        setSession(null);
        current = null;
        renderAccountUI();
        hideDropdown();
        window.dispatchEvent(new CustomEvent("auth:changed", { detail: { user: null } }));
        toast("Signed out");
      } else if (action.dataset.action === "orders") {
        window.dispatchEvent(new CustomEvent("orders:open"));
        hideDropdown();
      }
    });
  }

  function renderAccountUI() {
    if (!ui.accountBtn) return;
    ui.accountLabel = ui.accountBtn.querySelector(".account-label");
    if (current) {
      ui.accountBtn.innerHTML = "👤 <span class='account-label'>" + esc(current.name.split(" ")[0]) + "</span>";
      ui.accountBtn.classList.add("logged-in");
    } else {
      ui.accountBtn.innerHTML = "👤 <span class='account-label'>Sign in</span>";
      ui.accountBtn.classList.remove("logged-in");
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function openAuth() {
    setAuthTab("signin");
    ui.authOverlay.classList.add("open");
    document.getElementById("auth-email").focus();
  }
  function closeAuth() {
    ui.authOverlay.classList.remove("open");
  }

  function showDropdown() {
    if (!current) return openAuth();
    const box = ui.accountBox.getBoundingClientRect();
    ui.dropdown.innerHTML = `
      <div class="dd-user"><strong>${esc(current.name)}</strong><span>${esc(current.email)}</span></div>
      <button class="dd-item" data-action="orders">📦 My Orders</button>
      <button class="dd-item" data-action="logout">🚪 Sign out</button>
    `;
    ui.dropdown.classList.add("open");
    const w = ui.dropdown.offsetWidth;
    let left = Math.min(box.left + box.width / 2 - w / 2, window.innerWidth - w - 12);
    ui.dropdown.style.left = Math.max(12, left) + "px";
    ui.dropdown.style.top = box.bottom + 8 + "px";
  }
  function hideDropdown() {
    ui.dropdown.classList.remove("open");
  }

  function build() {
    buildAccountButton();
    buildAuthModal();
    buildDropdown();
    renderAccountUI();
    ui.accountBtn.addEventListener("click", () => {
      if (current) {
        const isOpen = ui.dropdown.classList.contains("open");
        hideDropdown();
        if (!isOpen) showDropdown();
      } else {
        openAuth();
      }
    });
    document.addEventListener("click", (e) => {
      if (current && ui.dropdown.classList.contains("open") && !ui.accountBox.contains(e.target) && !ui.dropdown.contains(e.target)) {
        hideDropdown();
      }
    });
  }

  build();

  window.StoreAuth = {
    currentUser: () => current,
    open: openAuth,
    close: closeAuth,
    esc,
  };
})();