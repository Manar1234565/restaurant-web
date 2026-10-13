/* Tarjetas del menú y créditos de fotos, generados a partir de DISHES. */

/* Crea un elemento con propiedades y, opcionalmente, hijos. Evita usar innerHTML con datos. */
function el(tag, props = {}, children = []) {
  const node = Object.assign(document.createElement(tag), props);
  for (const child of children) node.append(child);
  return node;
}

/* Sustituye la foto por la ilustración en canvas del plato. */
function useIllustration(img, dish, index) {
  const canvas = el("canvas", { className: "dish-media", width: 640, height: 480 });
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Illustration of " + dish.name);
  img.replaceWith(canvas);
  if (ART[dish.id]) ART[dish.id](canvas.getContext("2d"), 640, 480, rng(index * 97 + 11));
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");

  DISHES.forEach((dish, index) => {
    const img = el("img", {
      className: "dish-media",
      src: dish.photo || "",
      alt: dish.name,
      width: 800,
      height: 600,
      loading: index < 3 ? "eager" : "lazy",
      decoding: "async"
    });
    img.addEventListener("error", () => useIllustration(img, dish, index), { once: true });

    const addBtn = el("button", { type: "button", className: "add-btn", textContent: "+ Add to order" });
    addBtn.dataset.add = dish.id;

    const tags = el("ul", { className: "tags" }, dish.tags.map(t => el("li", { className: "tag", textContent: t })));
    const text = el("div", { className: "txt" }, [
      el("h3", { textContent: dish.name }),
      el("p", { textContent: dish.desc }),
      tags,
      addBtn
    ]);

    grid.append(el("li", { className: "dish" }, [img, text]));
    if (!dish.photo) useIllustration(img, dish, index);
  });

  grid.addEventListener("click", e => {
    const btn = e.target.closest("button[data-add]");
    if (!btn) return;
    const count = addToOrder(btn.dataset.add);
    btn.textContent = "✓ Added · " + count;
  });

  document.getElementById("dishCount").textContent = DISHES.length;
}

function renderCredits() {
  const list = document.getElementById("creditsList");
  DISHES.filter(d => d.credit).forEach(d => {
    const link = el("a", { href: d.credit.source, textContent: d.credit.author, target: "_blank", rel: "noopener" });
    list.append(el("li", {}, [d.name + ": ", link, " (" + d.credit.license + "), via Wikimedia Commons"]));
  });
}
