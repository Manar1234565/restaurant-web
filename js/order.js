/* Formulario de pedido: cantidades, días de meal prep, validación y envío a FormSubmit. */

const qty = {};

function $(id) {
  return document.getElementById(id);
}

function fieldValue(id) {
  return $(id).value.trim();
}

function announce(message) {
  $("announcer").textContent = message;
}

function totalPortions() {
  return Object.values(qty).reduce((a, b) => a + b, 0);
}

function setQty(id, value) {
  qty[id] = Math.max(0, Math.min(MAX_PORTIONS, value));
  $("q-" + id).textContent = qty[id];
  $("row-" + id).classList.toggle("on", qty[id] > 0);
  $("total").textContent = totalPortions();
}

/* Usado por los botones "+ Add to order" del menú. Devuelve la cantidad nueva. */
function addToOrder(id) {
  setQty(id, qty[id] + 1);
  const dish = DISHES.find(d => d.id === id);
  announce(dish.name + " added to your order. " + qty[id] + " portion" + (qty[id] > 1 ? "s" : "") + ".");
  return qty[id];
}

function renderRows() {
  const rows = $("rows");
  DISHES.forEach(dish => {
    qty[dish.id] = 0;

    const minus = el("button", { type: "button", textContent: "−" });
    minus.setAttribute("aria-label", "Fewer portions of " + dish.name);
    minus.dataset.d = dish.id;
    minus.dataset.v = "-1";

    const plus = el("button", { type: "button", textContent: "+" });
    plus.setAttribute("aria-label", "More portions of " + dish.name);
    plus.dataset.d = dish.id;
    plus.dataset.v = "1";

    const out = el("output", { id: "q-" + dish.id, textContent: "0" });
    out.setAttribute("aria-live", "polite");

    rows.append(el("div", { className: "row", id: "row-" + dish.id }, [
      el("span", { textContent: dish.name }),
      el("div", { className: "stepper" }, [minus, out, plus])
    ]));
  });

  rows.addEventListener("click", e => {
    const btn = e.target.closest("button[data-d]");
    if (btn) setQty(btn.dataset.d, qty[btn.dataset.d] + Number(btn.dataset.v));
  });
}

function renderDays() {
  const days = $("days");
  DELIVERY_DAYS.forEach(day => {
    const box = el("input", { type: "checkbox", id: "day-" + day, value: day });
    days.append(el("label", {}, [box, " " + day]));
  });

  const daysWrap = $("daysWrap");
  document.querySelectorAll('input[name="kind"]').forEach(radio => {
    radio.addEventListener("change", () => { daysWrap.hidden = !$("kindWeek").checked; });
  });
  $("prepBtn").addEventListener("click", () => {
    $("kindWeek").checked = true;
    daysWrap.hidden = false;
  });
}

/* Devuelve { message, field } con el primer error, o null si todo está bien. */
function validate() {
  ["fName", "fPhone", "fEmail", "fDate"].forEach(id => $(id).removeAttribute("aria-invalid"));

  if (totalPortions() === 0) {
    return { message: "Add at least one dish and the number of portions.", field: $("rows").querySelector("button[data-v='1']") };
  }
  if (!fieldValue("fName")) {
    return { message: "Please add your name.", field: $("fName") };
  }
  if (!fieldValue("fPhone") && !fieldValue("fEmail")) {
    return { message: "Please add a phone number or email so we can confirm.", field: $("fPhone") };
  }
  if (fieldValue("fEmail") && !$("fEmail").checkValidity()) {
    return { message: "That email doesn’t look right.", field: $("fEmail") };
  }
  if (fieldValue("fPhone") && !/^\+?[\d\s()-]{7,}$/.test(fieldValue("fPhone"))) {
    return { message: "That phone number doesn’t look right.", field: $("fPhone") };
  }
  if (fieldValue("fDate") && fieldValue("fDate") < $("fDate").min) {
    return { message: "Please choose a date from today onwards.", field: $("fDate") };
  }
  return null;
}

function buildSummary(kind, days, items) {
  const lines = ["SALT AND PEPPER · Meal request", "", "Type: " + kind];
  if (kind === "Weekly meal prep" && days.length) lines.push("Days: " + days.join(", "));
  lines.push("", "Dishes:");
  items.forEach(d => lines.push("• " + d.name + " × " + qty[d.id] + " portion" + (qty[d.id] > 1 ? "s" : "")));
  lines.push("Total portions: " + totalPortions(), "", "Name: " + fieldValue("fName"));

  const optional = [["Phone", "fPhone"], ["Email", "fEmail"], ["Address", "fAddr"], ["Preferred date", "fDate"], ["Notes", "fNotes"]];
  optional.forEach(([label, id]) => { if (fieldValue(id)) lines.push(label + ": " + fieldValue(id)); });
  return lines.join("\n");
}

async function sendOrder(kind, days, items) {
  const response = await fetch(ORDER_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      _subject: "New order – " + fieldValue("fName"),
      _template: "box",
      _captcha: "false",
      _honey: $("fHoney").value,
      _replyto: fieldValue("fEmail"),
      name: fieldValue("fName"),
      phone: fieldValue("fPhone"),
      email: fieldValue("fEmail"),
      address: fieldValue("fAddr"),
      date: fieldValue("fDate"),
      type: kind,
      days: days.join(", "),
      dishes: items.map(d => d.name + " x" + qty[d.id]).join(", "),
      notes: fieldValue("fNotes")
    })
  });
  if (!response.ok) throw new Error("FormSubmit " + response.status);
}

function initOrderForm() {
  renderRows();
  renderDays();

  // No se pueden elegir fechas pasadas
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $("fDate").min = today.toISOString().slice(0, 10);

  const form = $("orderForm");
  const err = $("err");
  const summary = $("summary");
  const status = $("sendStatus");
  const submitBtn = $("submitBtn");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const problem = validate();
    if (problem) {
      err.textContent = problem.message;
      err.hidden = false;
      if (problem.field.tagName === "INPUT") problem.field.setAttribute("aria-invalid", "true");
      problem.field.focus();
      return;
    }
    err.hidden = true;

    const kind = document.querySelector('input[name="kind"]:checked').value;
    const days = [...$("days").querySelectorAll("input:checked")].map(i => i.value);
    const items = DISHES.filter(d => qty[d.id] > 0);

    $("summaryText").textContent = buildSummary(kind, days, items);
    status.textContent = "Sending your request…";
    status.className = "send-status";
    summary.hidden = false;
    summary.scrollIntoView({ behavior: "smooth", block: "start" });
    summary.focus({ preventScroll: true });

    submitBtn.disabled = true;
    try {
      await sendOrder(kind, days, items);
      status.textContent = "Sent! We’ll contact you soon to confirm.";
      status.className = "send-status ok";
    } catch (_) {
      status.textContent = "We couldn’t send it automatically. Copy the request and email it to us at esdibmanar@gmail.com.";
      status.className = "send-status err";
    } finally {
      submitBtn.disabled = false;
    }
  });

  $("copyBtn").addEventListener("click", async e => {
    const text = $("summaryText");
    try {
      await navigator.clipboard.writeText(text.textContent);
      e.target.textContent = "Copied";
    } catch (_) {
      const selection = getSelection();
      const range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
      e.target.textContent = "Text selected, press Ctrl+C";
    }
  });

  $("editBtn").addEventListener("click", () => {
    summary.hidden = true;
    $("rows").scrollIntoView({ behavior: "smooth" });
    $("rows").querySelector("button").focus({ preventScroll: true });
  });
}
