/* Punto de entrada: se ejecuta cuando el resto de scripts (defer) ya están cargados. */
renderMenu();
renderCredits();
initOrderForm();
initHeroPaella();
document.getElementById("year").textContent = new Date().getFullYear();
