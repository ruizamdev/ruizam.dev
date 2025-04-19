# 📚 BlogCarousel Web Component

Este archivo define un componente web personalizado llamado `<blog-carousel>`, creado con TypeScript y usando Web Components estándar. Su función principal es mostrar una serie de tarjetas de blog en un carrusel horizontal que se desliza automáticamente.

---

## 🛠️ Características

- Carousel horizontal de tarjetas de blog
- Desplazamiento automático (auto-slide) con reinicio en bucle
- Accesibilidad básica con navegación por teclado
- Hover interactions y animaciones CSS
- Shadow DOM encapsulado con estilos integrados

---

## 🔧 Uso básico

```html
<blog-carousel></blog-carousel>
```

⚠️ Actualmente las tarjetas son estáticas y repetidas por defecto. En futuras versiones puedes reemplazar `getSlides()` con contenido dinámico o desde Markdown.

---

## 🎯 Eventos y comportamiento

### Ciclo de vida

- Al montarse (`connectedCallback`), el carrusel comienza a deslizarse automáticamente.
- Al pasar el mouse o tocar el carrusel, se pausa (`mouseenter`, `touchstart`).
- Al salir del área, continúa (`mouseleave`, `touchend`).

### Accesibilidad (A11Y)

- La primera tarjeta obtiene atributos `role="button"` y `tabindex="0"`.
- Detecta teclas `Enter` o `Espacio` y simula un clic sobre el CTA.

---

## ⚙️ Métodos clave

| Método              | Descripción                                      |
|---------------------|--------------------------------------------------|
| `render()`          | Dibuja el componente                            |
| `getTemplate()`     | Devuelve la estructura HTML completa            |
| `getSlides(count)`  | Genera una cantidad de tarjetas HTML repetidas  |
| `getStyles()`       | Retorna estilos CSS como string                 |
| `startAutoSlide()`  | Inicia el loop automático de deslizamiento      |
| `pauseAutoSlide()`  | Detiene el loop del carrusel                    |
| `loopSlide()`       | Lógica de reinicio de desplazamiento en bucle  |

---

## ✨ Personalización futura sugerida

- Reemplazar slides estáticos con contenido dinámico (`Markdown`, `JSON`, `API`)
- Separar estilos en archivo `.css` o `getStyles()` modular
- Soporte para props como `total-slides`, `interval`, o `autoplay`
- Hacer responsive con `ResizeObserver`

---

## 👨‍💻 Autor

**[ruizamdev](https://github.com/ruizamdev)** — 2025

Este componente está diseñado como parte de una interfaz cyberpunk moderna desarrollada con Astro y Web Components.

---

## 📦 Registro

Este componente se exporta por defecto como clase `BlogCarousel`, y se registra automáticamente si no está previamente definido:

```ts
if (!customElements.get('blog-carousel')) {
  customElements.define('blog-carousel', BlogCarousel);
}
```

Puedes usarlo directamente dentro de proyectos Astro mediante un wrapper `.astro`, o en cualquier proyecto compatible con Web Components.
