# CLAUDE.md

Guía para trabajar en este proyecto. Responde al usuario en español; el contenido visible de la web está en inglés (clientes en Dublín) y debe seguir en inglés.

## Qué es

**Salt and Pepper**: web de una sola página para un servicio de comida casera a domicilio y meal prep semanal en Dublín (Manar Eddib y Hajar Anouar). Secciones: hero con paella animada en canvas → menú → banda de meal prep → formulario de pedido → contacto → footer con créditos de fotos.

HTML/CSS/JS vanilla, sin dependencias ni paso de build. Se abre con doble clic en `index.html` o se sirve como estático.

## Objetivo del trabajo

**Solo mejorar calidad y estructura.** No cambiar el concepto, el diseño visual, la paleta, los textos de marketing ni añadir funcionalidades nuevas salvo que el usuario lo pida. Si una mejora implica cambiar algo visible, proponerla antes de hacerla.

## Estructura

```
/
├── index.html              # Marcado semántico + <head> completo (SEO, Open Graph, favicon)
├── css/styles.css          # Tokens (:root) → base → secciones → responsive
├── js/
│   ├── config.js           # ORDER_ENDPOINT (FormSubmit), MAX_PORTIONS, DELIVERY_DAYS
│   ├── dishes.js           # DISHES: datos del menú (nombre, texto, tags, foto, crédito)
│   ├── canvas/
│   │   ├── utils.js        # rng, blob, inCircle, grains, shadow
│   │   ├── ingredients.js  # gamba, mejillón, limón, pollo, guisante, plato, cuenco…
│   │   ├── paella.js       # drawPaella + initHeroPaella (animación del hero)
│   │   └── dishes-art.js   # ART: ilustración de reserva por plato (mismo id que DISHES)
│   ├── menu.js             # el() helper, tarjetas del menú, créditos de fotos
│   ├── order.js            # Formulario: cantidades, días, validación, envío, copiar
│   └── main.js             # Punto de entrada: llama a los init
├── assets/img/             # Fotos de platos (800×600 .webp) y og-image.jpg (1200×630)
└── salt-and-pepper.html    # Versión antigua de un solo archivo (borrar cuando se confirme la nueva)
```

- **Scripts clásicos con `defer`**, no módulos ES: así funciona abriendo el archivo con `file://`. Comparten ámbito global, por lo que el **orden de los `<script>` en `index.html` importa** (config → datos → canvas → menú → pedido → main). No reutilizar nombres globales ya existentes (`$`, `el`, `qty`, `rng`, `ART`, `DISHES`…).
- Toda la página (tarjetas, filas del formulario, créditos, contador de platos) se genera a partir de `DISHES`. Para añadir un plato basta con editar `js/dishes.js` (y opcionalmente `ART`).

## Convenciones

- **CSS**: todos los colores vía custom properties en `:root`; el modo oscuro solo redefine tokens (`prefers-color-scheme` + `[data-theme]`). `--chili` es para fondos con texto blanco; `--accent-text` para texto en color de acento (cambia en modo oscuro para mantener contraste). Breakpoints: 900px y 640px. Nada de estilos inline en el HTML.
- **JS**: código legible, una sentencia por línea. Construir DOM con `el()`/`textContent`, **nunca `innerHTML` con datos**. El código de dibujo en canvas puede ser compacto, pero cada función lleva un comentario corto de qué dibuja.
- **Imágenes**: locales en `assets/img/`, 800×600 WebP (calidad ~80), recortadas a 4:3. No enlazar imágenes externas (Pinterest, loremflickr…). Si la foto es CC BY/BY-SA, rellenar `credit` en `DISHES` (se muestra en el footer). Las actuales vienen de Wikimedia Commons.
- Los comentarios dirigidos a la dueña (cómo cambiar email, fotos, platos) se escriben en español.
- Accesibilidad: labels/`fieldset`+`legend` en todos los campos, `aria-invalid` + foco en el primer error, anuncios por `#announcer` (aria-live), contraste AA.

## Pendiente / ideas

- `og:image` y `og:url` necesitan URL absoluta cuando haya dominio.
- FormSubmit: la primera vez envía un email de activación a esdibmanar@gmail.com; hay que confirmarlo para que lleguen los pedidos.
- Sustituir las fotos de Commons por fotos propias de los platos cuando existan (entonces `credit: null`).

## Verificación

No hay tests. Tras cada cambio:
- `node --check` sobre los `.js` modificados.
- Abrir `index.html` y revisar la consola: cero errores. Con Chrome headless: `chrome --headless=new --screenshot=out.png --window-size=1280,3600 file:///C:/proyectos/index.html` (en headless el ancho mínimo real es ~500px; para móvil usar DevTools).
- Comprobar móvil, tablet y escritorio, en modo claro y oscuro.
- Probar el flujo: añadir platos desde el menú, ajustar cantidades, cambiar a meal prep, enviar con datos incompletos (debe marcar el error) y completos.
- No enviar pedidos reales de prueba al email de FormSubmit sin avisar al usuario.
