/* =====================================================================
   PLATOS DEL MENÚ
   - Para añadir un plato: copia un bloque, cambia id, textos y foto.
     Si quieres dibujo de reserva, añade también una entrada en js/canvas/dishes-art.js con el mismo id.
   - FOTOS: pon la imagen en assets/img/ (800×600, mejor .webp) y escribe su ruta en "photo".
     Si una foto no carga, se muestra automáticamente el dibujo del plato.
   - "credit" es la atribución de la foto (obligatoria en fotos con licencia CC BY / CC BY-SA).
     Si la foto es tuya, pon credit: null.
   ===================================================================== */
const DISHES = [
  {
    id: "soup",
    name: "Vegetable soup",
    desc: "Seasonal vegetables slow-simmered in a light, warming broth.",
    tags: ["Vegan", "Light"],
    photo: "assets/img/soup.webp",
    credit: { author: "Horacio Cambeiro", license: "CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Traditional_Vegetable_Soup_from_Argentina.jpg" }
  },
  {
    id: "paella",
    name: "Paella",
    desc: "Saffron rice with prawns, mussels, chicken and peppers. Made in the big pan.",
    tags: ["Spanish", "Signature"],
    photo: "assets/img/paella.webp",
    credit: { author: "Wilfredor", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Paella_de_fruit_de_mer.jpg" }
  },
  {
    id: "chicken",
    name: "Arroz con pollo",
    desc: "Golden rice cooked with chicken, peas and red pepper.",
    tags: ["Family favourite"],
    photo: "assets/img/chicken.webp",
    credit: { author: "Kobako", license: "CC BY-SA 2.5", source: "https://commons.wikimedia.org/wiki/File:Arroz-con-Pollo.jpg" }
  },
  {
    id: "burger",
    name: "Healthy grilled burger",
    desc: "Lean grilled patty with fresh salad, served with roasted sweet potato.",
    tags: ["High protein", "Healthy"],
    photo: "assets/img/burger.webp",
    credit: { author: "Nick Clement", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Burger_and_a_Salad_(Unsplash).jpg" }
  },
  {
    id: "kabsa",
    name: "Kabsa",
    desc: "Spiced Arabian rice with tender chicken, toasted almonds and raisins.",
    tags: ["Arabic", "Halal"],
    photo: "assets/img/kabsa.webp",
    credit: { author: "Basel15", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Kabsa.jpg" }
  },
  {
    id: "couscous",
    name: "Couscous",
    desc: "Fluffy couscous with seven vegetables and chickpeas. Quick, done right.",
    tags: ["Moroccan", "Halal"],
    photo: "assets/img/couscous.webp",
    credit: { author: "ZRAFIQA", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Couscous_%227_vegetables%22.jpg" }
  },
  {
    id: "mashawi",
    name: "Grilled mashawi",
    desc: "Charcoal-style skewers of marinated meat, peppers and onion.",
    tags: ["Grill", "Halal"],
    photo: "assets/img/mashawi.webp",
    credit: { author: "Maksym Kozlenko", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:2023-01-20_Lamb_Shish_Kebab.jpg" }
  },
  {
    id: "hummus",
    name: "Hummus",
    desc: "Smooth chickpea and tahini dip with olive oil and paprika.",
    tags: ["Vegan", "Mezze"],
    photo: "assets/img/hummus.webp",
    credit: { author: "Orenrosenfeld", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Hummus_plate.jpg" }
  },
  {
    id: "tabbouleh",
    name: "Tabbouleh",
    desc: "Lebanese salad of parsley, tomato, mint, bulgur and lemon.",
    tags: ["Vegan", "Fresh"],
    photo: "assets/img/tabbouleh.webp",
    credit: { author: "cyclonebill", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Flickr_-_cyclonebill_-_Tabbouleh.jpg" }
  }
];
