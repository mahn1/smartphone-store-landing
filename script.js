const PRODUCTS = [
  { id: 1, brand: "Apple", name: "iPhone 17 Pro", specs: "256 ГБ · 6,3″ · 48 Мп", price: 129990, old: 139990, colors: ["#c9c6c0", "#3b4152", "#e8722c"], screen: "#ff8a3d", camera: "pro", popular: 10, tag: "Хит" },
  { id: 2, brand: "Apple", name: "iPhone 17", specs: "128 ГБ · 6,3″ · 48 Мп", price: 84990, colors: ["#b9c8e8", "#f3f3f3", "#1d1d1f"], screen: "#6a8dff", camera: "dual", popular: 9, tag: "Новинка" },
  { id: 3, brand: "Apple", name: "iPhone 16", specs: "128 ГБ · 6,1″ · 48 Мп", price: 69990, old: 74990, colors: ["#9fd1c9", "#f1c4d6", "#1d1d1f"], screen: "#3fb8a5", camera: "dual", popular: 7 },
  { id: 4, brand: "Samsung", name: "Galaxy S25 Ultra", specs: "256 ГБ · 6,9″ · 200 Мп", price: 109990, old: 124990, colors: ["#4a4f5c", "#c7ccd6", "#a8b9a0"], screen: "#5d7bff", camera: "vertical", popular: 8, tag: "Хит" },
  { id: 6, brand: "Samsung", name: "Galaxy A56", specs: "128 ГБ · 6,7″ · 50 Мп", price: 34990, colors: ["#c7b8ea", "#a8d8c8", "#2a2d34"], screen: "#8f6bff", camera: "vertical", popular: 5 },
  { id: 7, brand: "Xiaomi", name: "Xiaomi 15", specs: "256 ГБ · 6,4″ · Leica 50 Мп", price: 69990, colors: ["#1d1d1f", "#f3f3f3", "#a8d8b9"], screen: "#ff6b6b", camera: "square", popular: 6, tag: "Новинка" },
  { id: 8, brand: "Xiaomi", name: "Redmi Note 14 Pro", specs: "256 ГБ · 6,67″ · 200 Мп", price: 27990, old: 31990, colors: ["#6d5ba8", "#2a2d34", "#cfe3f2"], screen: "#7c5cff", camera: "square", popular: 8 },
  { id: 9, brand: "HONOR", name: "HONOR 400", specs: "256 ГБ · 6,55″ · 200 Мп", price: 39990, colors: ["#e9e4da", "#2a2d34", "#c7d8ec"], screen: "#e0a64f", camera: "round", popular: 4 },
];

const rub = (n) => n.toLocaleString("ru-RU").replace(/\s/g, " ") + " ₽";

// Рисуем телефон вид сзади: цвет корпуса и модуль камер
function phoneSVG(p) {
  const body = p.colors[0];
  const cams = {
    pro: `<rect x="14" y="14" width="46" height="46" rx="12" fill="rgba(0,0,0,.12)"/><circle cx="27" cy="27" r="8.5" fill="#1b1d22"/><circle cx="27" cy="47" r="8.5" fill="#1b1d22"/><circle cx="46" cy="37" r="8.5" fill="#1b1d22"/>`,
    dual: `<rect x="14" y="14" width="30" height="46" rx="12" fill="rgba(0,0,0,.12)"/><circle cx="29" cy="27" r="8" fill="#1b1d22"/><circle cx="29" cy="47" r="8" fill="#1b1d22"/>`,
    vertical: `<circle cx="24" cy="24" r="8" fill="#1b1d22"/><circle cx="24" cy="44" r="8" fill="#1b1d22"/><circle cx="24" cy="64" r="8" fill="#1b1d22"/>`,
    square: `<rect x="26" y="14" width="48" height="48" rx="14" fill="rgba(0,0,0,.14)"/><circle cx="40" cy="28" r="7.5" fill="#1b1d22"/><circle cx="60" cy="28" r="7.5" fill="#1b1d22"/><circle cx="40" cy="48" r="7.5" fill="#1b1d22"/><circle cx="60" cy="48" r="7.5" fill="#1b1d22"/>`,
    round: `<circle cx="50" cy="42" r="28" fill="rgba(0,0,0,.14)"/><circle cx="40" cy="34" r="8" fill="#1b1d22"/><circle cx="60" cy="34" r="8" fill="#1b1d22"/><circle cx="50" cy="54" r="8" fill="#1b1d22"/>`,
  };
  return `
    <svg viewBox="0 0 150 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.name}">
      <rect x="62" y="6" width="84" height="176" rx="18" fill="#14161c"/>
      <rect x="66" y="10" width="76" height="168" rx="15" fill="${p.screen}"/>
      <rect x="66" y="10" width="76" height="168" rx="15" fill="url(#glare${p.id})"/>
      <rect x="4" y="26" width="100" height="180" rx="20" fill="${body}"/>
      <rect x="4" y="26" width="100" height="180" rx="20" fill="url(#shade${p.id})"/>
      <g transform="translate(4 26)">${cams[p.camera]}</g>
      <defs>
        <linearGradient id="shade${p.id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
        <linearGradient id="glare${p.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
    </svg>`;
}

// Каталог
const productsEl = document.getElementById("products");
const brandFilter = document.getElementById("brand-filter");
const sortEl = document.getElementById("sort");
let brand = "all";

function renderProducts() {
  let list = PRODUCTS.filter((p) => brand === "all" || p.brand === brand);
  const sorters = {
    popular: (a, b) => b.popular - a.popular,
    cheap: (a, b) => a.price - b.price,
    expensive: (a, b) => b.price - a.price,
  };
  list = [...list].sort(sorters[sortEl.value]);

  productsEl.innerHTML = list.map((p) => `
    <article class="product">
      ${p.tag ? `<span class="product__tag${p.tag === "Новинка" ? " product__tag--new" : ""}">${p.tag}</span>` : ""}
      <div class="product__img">${phoneSVG(p)}</div>
      <h3 class="product__name">${p.name}</h3>
      <p class="product__specs">${p.specs}</p>
      <div class="product__colors">${p.colors.map((c) => `<i style="background:${c}"></i>`).join("")}</div>
      <div class="product__price"><b>${rub(p.price)}</b>${p.old ? `<s>${rub(p.old)}</s>` : ""}</div>
      <p class="product__monthly">от ${rub(Math.ceil(p.price / 12))}/мес без переплаты</p>
      <button class="btn" data-add="${p.id}">В корзину</button>
    </article>`).join("");
}

brandFilter.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  brand = chip.dataset.brand;
  brandFilter.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  renderProducts();
});
sortEl.addEventListener("change", renderProducts);
renderProducts();

// Корзина
const cart = new Map();
const cartEl = document.getElementById("cart");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("is-shown");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 2200);
}

function renderCart() {
  let count = 0;
  let total = 0;
  const rows = [];
  cart.forEach((qty, id) => {
    const p = PRODUCTS.find((x) => x.id === id);
    count += qty;
    total += p.price * qty;
    rows.push(`<li><div><span>${p.name}</span><small>${qty} шт. × ${rub(p.price)}</small></div><button data-remove="${id}">Удалить</button></li>`);
  });
  cartCount.textContent = count;
  cartTotal.textContent = rub(total);
  cartList.innerHTML = rows.join("") || '<li class="cart__empty">Пока пусто — добавьте смартфон из каталога</li>';
}

productsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const id = Number(btn.dataset.add);
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  btn.textContent = "Добавлено ✓";
  btn.classList.add("is-added");
  setTimeout(() => { btn.textContent = "В корзину"; btn.classList.remove("is-added"); }, 1400);
  cartBtn.classList.remove("bump");
  void cartBtn.offsetWidth;
  cartBtn.classList.add("bump");
  showToast(`${PRODUCTS.find((p) => p.id === id).name} в корзине`);
});

cartList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove]");
  if (!btn) return;
  cart.delete(Number(btn.dataset.remove));
  renderCart();
});

function toggleCart(open) {
  cartEl.classList.toggle("is-open", open);
  cartEl.setAttribute("aria-hidden", !open);
}
cartBtn.addEventListener("click", () => toggleCart(true));
document.getElementById("cart-close").addEventListener("click", () => toggleCart(false));
cartEl.addEventListener("click", (e) => { if (e.target === cartEl) toggleCart(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleCart(false); });
document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.size) return showToast("Корзина пуста");
  cart.clear();
  renderCart();
  toggleCart(false);
  showToast("Заказ оформлен! Менеджер перезвонит за 10 минут");
});
renderCart();

// Калькулятор рассрочки
const priceInput = document.getElementById("price");
const priceOut = document.getElementById("price-out");
const monthsEl = document.getElementById("months");
const monthlyEl = document.getElementById("monthly");
const overpayEl = document.getElementById("overpay");
let months = 6;

function updateInstallment() {
  const price = Number(priceInput.value);
  priceOut.textContent = rub(price);
  // 0% до 12 месяцев, на 24 месяца — 9% годовых, аннуитет
  let monthly = price / months;
  let overpay = 0;
  if (months > 12) {
    const r = 0.09 / 12;
    monthly = (price * r) / (1 - Math.pow(1 + r, -months));
    overpay = Math.round(monthly * months - price);
  }
  monthlyEl.textContent = rub(Math.ceil(monthly));
  overpayEl.textContent = overpay ? `Переплата: ${rub(overpay)}` : "Переплата: 0 ₽";
  overpayEl.style.color = overpay ? "#e5484d" : "";
}

monthsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  months = Number(btn.dataset.months);
  monthsEl.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
  updateInstallment();
});
priceInput.addEventListener("input", updateInstallment);
updateInstallment();

// Оценка trade-in
const tradeForm = document.getElementById("tradein-form");
const conditionEl = document.getElementById("condition");
const tradeSum = document.getElementById("tradein-sum");
let condition = 1;

function updateTradeIn() {
  const base = 45000;
  const k = Number(tradeForm.brand.value) * Number(tradeForm.year.value) * condition;
  const sum = Math.max(1000, Math.round((base * k) / 500) * 500);
  tradeSum.textContent = `до ${rub(sum)}`;
}

conditionEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  condition = Number(btn.dataset.k);
  conditionEl.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
  updateTradeIn();
});
tradeForm.addEventListener("change", updateTradeIn);
updateTradeIn();

// Форма подбора (демо: данные никуда не отправляются)
const leadForm = document.getElementById("lead-form");
leadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  leadForm.querySelectorAll("[required]").forEach((f) => {
    const bad = !f.value.trim();
    f.classList.toggle("is-invalid", bad);
    if (bad) ok = false;
  });
  if (!ok) return;
  leadForm.querySelector(".lead__ok").hidden = false;
  leadForm.reset();
});

// Мобильное меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("is-open");
});
