# 🧭 MyNavbar Web Component

Este componente personalizado (`<my-navbar>`) está desarrollado en **TypeScript** usando **Web Components estándar**. Se trata de un menú de navegación vertical/horizontal adaptable, con íconos SVG integrados, pensado para proyectos Astro u otros entornos modernos.

---

## 🛠️ Características

- Renderizado a través de Shadow DOM
- Iconografía SVG inline
- Atributos configurables vía HTML
- Animaciones y estados visuales con CSS puro
- Emitido como `CustomEvent` (`nav-change`) al hacer clic
- Adaptable a pantallas móviles

---

## 🔧 Uso básico

### HTML

```html
<my-navbar
  active-index="0"
  home-link="/"
  blog-link="/blog"
  portfolio-link="https://miportafolio.com"
  github-link="https://github.com/ruizamdev"
  facebook-link="https://facebook.com/tuusuario"
  twitter-link="https://twitter.com/tuusuario">
</my-navbar>
```

### Evento emitido

Al hacer clic en una opción, se emite un evento `nav-change`:

```ts
navbarElement.addEventListener('nav-change', (e) => {
  const index = (e as CustomEvent).detail.index;
  console.log('Navegación seleccionada:', index);
});
```

---

## 🧪 Atributos disponibles

| Atributo         | Tipo     | Descripción                          |
|------------------|----------|--------------------------------------|
| `active-index`   | `number` | Índice activo inicial                |
| `home-link`      | `string` | Enlace del icono Home                |
| `blog-link`      | `string` | Enlace del icono Blog                |
| `portfolio-link` | `string` | Enlace del icono Portafolio          |
| `github-link`    | `string` | Enlace externo a GitHub              |
| `facebook-link`  | `string` | Enlace externo a Facebook            |
| `twitter-link`   | `string` | Enlace externo a Twitter             |

---

## 🧱 Estructura interna

- `getTemplate()` genera la estructura del navbar dinámicamente
- `getStyles()` devuelve los estilos embebidos
- Cada botón está formado por:
  - SVG icónico
  - Texto (label)
  - `data-index` para identificar la posición

---

## 📌 Notas

- Este componente se puede registrar automáticamente en Astro mediante un wrapper `.astro`
- El uso de estilos `:host` permite su adaptación sin colisiones de CSS
- El archivo es extensible y modularizable (íconos y estilos se pueden extraer)

---

## ✨ Autor

[ruizamdev](https://github.com/ruizamdev) — 2025

¡Forkea, modifícalo y úsalo como base para tus propios menús animados!
