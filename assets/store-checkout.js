(() => {
  const storeKey = document.body.dataset.store || "store";
  const currency = document.body.dataset.currency || "$";
  const ORDERS_KEY = "orders_" + storeKey;

  function getProducts() {
    const scripts = document.querySelectorAll('script[type="application/json"][id^="products"]');
    let all = [];
    scripts.forEach((s) => { try { all = all.concat(JSON.parse(s.textContent) || []); } catch {} });
    return all;
  }
  function fmt(n) { return currency + Number(n).toFixed(2); }
  function cart() { try { return JSON.parse(localStorage.getItem("cart_" + storeKey)) || {}; } catch { return {}; } }
  function setCart(c) { localStorage.setItem("cart_" + storeKey, JSON.stringify(c)); }
  function readOrders() { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || {}; } catch { return {}; } }
  function saveOrders(o) { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); }

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  let built = false;
  function buildModal() {
    if (built) return;
    built = true;

    const overlay = el("div", "modal-overlay checkout-overlay");
    overlay.id = "checkout-overlay";
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    const card = el("div", "modal-card checkout-card");
    card.id = "checkout-card";
    card.innerHTML = `
      <div class="checkout-head">
        <h3 id="co-title">Checkout</h3>
        <button class="modal-close" id="co-close" aria-label="Close">✕</button>
      </div>

      <div id="co-step-summary">
        <div class="co-recap" id="co-recap"></div>
        <div class="co-shipping">
          <div class="grid2">
            <div class="field"><label for="co-name">Full name</label><input id="co-name" /></div>
            <div class="field"><label for="co-email">Email</label><input id="co-email" type="email" /></div>
          </div>
          <div class="field"><label for="co-address">Shipping address</label><input id="co-address" /></div>
          <div class="grid2">
            <div class="field"><label for="co-city">City</label><input id="co-city" /></div>
            <div class="field"><label for="co-zip">ZIP / postal code</label><input id="co-zip" /></div>
          </div>
        </div>

        <div class="co-payment">
          <div class="co-pay-head">
            <strong>Payment</strong>
            <span class="pay-badge">Stripe · Demo</span>
          </div>
          <div class="pay-row">
            <span class="card-brand">💳</span>
            <input id="co-card" inputmode="numeric" placeholder="Card number" autocomplete="cc-number" />
            <input id="co-exp" class="short" placeholder="MM / YY" autocomplete="cc-exp" />
            <input id="co-cvc" class="short" placeholder="CVC" autocomplete="cc-csc" />
          </div>
          <button type="button" class="link-fill" id="co-test">Use test card 4242 4242 4242 4242</button>
          <p class="co-note">🔒 Demo checkout — no real payment is processed or charged.</p>
        </div>

        <div class="co-total-row"><span>Total due</span><span id="co-total" class="co-total-val"></span></div>
        <p class="form-error" id="co-error"></p>
        <div class="co-actions">
          <button class="btn ghost" id="co-back">Back to cart</button>
          <button class="btn primary" id="co-pay">Pay <span id="co-pay-amt"></span></button>
        </div>
      </div>

      <div id="co-step-done" style="display:none">
        <div class="co-success">✅</div>
        <h3>Order confirmed!</h3>
        <p>Thank you for your order. A demo receipt has been saved to your account.</p>
        <div class="co-order-num">Order <span id="co-order-id"></span></div>
        <button class="btn primary block" id="co-done-btn">Continue shopping</button>
      </div>
    `;
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById("co-close").addEventListener("click", close);
    document.getElementById("co-back").addEventListener("click", () => { close(); document.getElementById("cart-open").click(); });
    document.getElementById("co-test").addEventListener("click", () => {
      document.getElementById("co-card").value = "4242 4242 4242 4242";
      document.getElementById("co-exp").value = "12/30";
      document.getElementById("co-cvc").value = "123";
      clearCoError();
    });
    document.getElementById("co-card").addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    });
    document.getElementById("co-exp").addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
      e.target.value = v;
    });
    document.getElementById("co-pay").addEventListener("click", submitPayment);
    document.getElementById("co-done-btn").addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  function clearCoError() { document.getElementById("co-error").textContent = ""; }
  function setCoError(m) { document.getElementById("co-error").textContent = m; }
  function open() {
    buildModal();
    if (!Object.keys(cartItems()).length) return toast("Your cart is empty");
    const user = (window.StoreAuth && window.StoreAuth.currentUser()) || null;
    if (!user) {
      toast("Please sign in to check out");
      (window.StoreAuth && window.StoreAuth.open()) || document.getElementById("account-open").click();
      return;
    }
    document.getElementById("co-step-summary").style.display = "block";
    document.getElementById("co-step-done").style.display = "none";
    document.getElementById("co-name").value = user.name || "";
    document.getElementById("co-email").value = user.email || "";
    renderRecap();
    document.getElementById("checkout-overlay").classList.add("open");
    const drawer = document.getElementById("cart-drawer");
    const drawerOv = document.getElementById("cart-overlay");
    if (drawer) drawer.classList.remove("open");
    if (drawerOv) drawerOv.classList.remove("open");
    document.getElementById("co-name").focus();
  }
  function close() {
    document.getElementById("checkout-overlay").classList.remove("open");
  }

  function renderRecap() {
    const items = cart();
    const products = getProducts();
    let rows = "";
    let total = 0;
    Object.entries(items).forEach(([id, qty]) => {
      const p = products.find((x) => String(x.id) === String(id));
      if (!p) return;
      total += Number(p.price) * qty;
      rows += '<div class="co-item"><span>' + p.name + " × " + qty + '</span><span>' + fmt(Number(p.price) * qty) + "</span></div>";
    });
    if (rows === "") rows = "<p style='color:var(--muted)'>Nothing in cart.</p>";
    document.getElementById("co-recap").innerHTML = '<div class="co-recap-title">Order summary</div>' + rows;
    document.getElementById("co-total").textContent = fmt(total);
    document.getElementById("co-pay-amt").textContent = fmt(total);
  }

  function cardDigits(v) {
    return v.replace(/[^0-9]/g, "");
  }

  function submitPayment() {
    clearCoError();
    const card = cardDigits(document.getElementById("co-card").value);
    const exp = document.getElementById("co-exp").value;
    const cvc = document.getElementById("co-cvc").value;
    const name = document.getElementById("co-name").value.trim();
    const email = document.getElementById("co-email").value.trim();

    if (!name) return setCoError("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setCoError("Enter a valid email.");
    if (card.length !== 16 || card.slice(0, 4) !== "4242") return setCoError("Use the demo test card 4242 4242 4242 4242.");
    if (!/^\d{2}\/\d{2}$/.test(exp)) return setCoError("Enter expiry as MM / YY.");
    if (!/^\d{3,4}$/.test(cvc)) return setCoError("Enter a 3-digit CVC.");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) return setCoError("Enter a valid expiry (MM / YY).");

    setCoError("");
    const payBtn = document.getElementById("co-pay");
    payBtn.disabled = true;
    payBtn.textContent = "Processing…";

    setTimeout(() => {
      const user = (window.StoreAuth.currentUser() || { name: name, email: email });
      const items = cart();
      const products = getProducts();
      let total = 0;
      const detail = [];
      Object.entries(items).forEach(([id, qty]) => {
        const p = products.find((x) => String(x.id) === String(id));
        if (!p) return;
        total += Number(p.price) * qty;
        detail.push({ id: String(p.id), name: p.name, qty, price: Number(p.price) });
      });
      const order = {
        id: "ORD-" + Date.now().toString(36).toUpperCase(),
        email: user.email,
        name: user.name || name,
        total,
        items: detail,
        date: new Date().toISOString(),
      };
      const orders = readOrders();
      (orders[user.email] = orders[user.email] || []).push(order);
      saveOrders(orders);

      setCart({});
      window.dispatchEvent(new CustomEvent("cart:updated"));

      document.getElementById("co-step-summary").style.display = "none";
      document.getElementById("co-step-done").style.display = "block";
      document.getElementById("co-order-id").textContent = order.id;
      payBtn.disabled = false;
      payBtn.textContent = "Pay";
      toast("Order placed 🎉 — demo only, no charge");
    }, 1400);
  }

  window.addEventListener("checkout-requested", open);
  window.addEventListener("orders:open", openOrders);

  function openOrders() {
    const user = (window.StoreAuth && window.StoreAuth.currentUser());
    if (!user) { document.getElementById("account-open").click(); return; }

    buildOrdersModal();
    const orders = (readOrders()[user.email] || []).slice().reverse();
    let html = "";
    if (!orders.length) {
      html = '<p style="color:var(--muted);text-align:center;padding:20px 0">No orders yet.</p>';
    } else {
      orders.forEach((o) => {
        const lines = o.items.map((i) => i.name + " × " + i.qty).join(", ");
        html += '<div class="order"><div class="order-top"><strong>' + o.id + "</strong><span>" + fmt(o.total) + "</span></div>" +
          '<p>' + new Date(o.date).toLocaleString() + "</p>" + '<p class="order-items">' + lines + "</p></div>";
      });
    }
    document.getElementById("orders-list").innerHTML = html;
    document.getElementById("orders-overlay").classList.add("open");
  }

  let ordersBuilt = false;
  function buildOrdersModal() {
    if (ordersBuilt) return;
    ordersBuilt = true;
    const overlay = el("div", "modal-overlay checkout-overlay");
    overlay.id = "orders-overlay";
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
    overlay.innerHTML = `
      <div class="modal-card checkout-card">
        <div class="checkout-head"><h3>My Orders</h3><button class="modal-close" id="orders-close">✕</button></div>
        <div class="orders-list" id="orders-list"></div>
        <div style="padding:18px 20px"><button class="btn primary block" id="orders-done">Close</button></div>
      </div>
    `;
    document.getElementById("orders-close").addEventListener("click", () => overlay.classList.remove("open"));
    document.getElementById("orders-done").addEventListener("click", () => overlay.classList.remove("open"));
    document.body.appendChild(overlay);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  window.StoreCheckout = {};
})();