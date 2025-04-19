# 👤 RuizamHeader Web Component

`<ruizam-header>` es un componente web personalizado hecho en **TypeScript** que muestra un encabezado interactivo con avatar SVG, burbuja de diálogo tipo cómic y títulos personalizables. Ideal para cabeceras llamativas en sitios personales o portafolios modernos.

---

## ✨ Características

- Avatar SVG personalizable mediante atributo o SVG inline
- Burbuja de diálogo animada al hacer clic en el avatar
- Título y subtítulo configurables vía atributos
- Estilos responsivos y encapsulados en Shadow DOM
- Fácil integración en proyectos Astro o cualquier framework moderno

---

## 🚀 Uso básico

### HTML

```html
<ruizam-header
  the-avatar='<svg>...</svg>'
  comic-dialog-text="¡Hola! Bienvenido a mi sitio"
  header-title="Armando Ruiz"
  header-subtitle="Frontend Developer"
></ruizam-header>
```

### Astro (con import dinámico)

```astro
---
import { useEffect } from 'astro/client';
useEffect(() => import('@components/web-components/ruizam-header/ruizam-header'));
---

<ruizam-header header-title="Armando Ruiz" header-subtitle="Frontend Developer" />
```

---

## 🧩 Atributos disponibles

| Atributo            | Tipo   | Descripción                                 |
|---------------------|--------|---------------------------------------------|
| `the-avatar`        | string | SVG del avatar (inline o como string)       |
| `comic-dialog-text` | string | Texto de la burbuja de diálogo              |
| `header-title`      | string | Título principal                            |
| `header-subtitle`   | string | Subtítulo                                   |

---

## 🎨 Personalización visual

- Modifica los estilos en el método `getStyles()` dentro del componente.
- Puedes usar variables CSS globales para fuentes y colores.
- El avatar puede ser cualquier SVG que desees.

---

## 🧠 Comportamiento

- Al hacer clic en el avatar, la burbuja de diálogo aparece con animación y se oculta automáticamente después de 3 segundos.
- El contenido y los estilos están encapsulados en Shadow DOM para evitar conflictos de CSS.

---

## 📦 Registro

El componente se registra automáticamente como `ruizam-header` si no existe previamente:

```ts
if (!customElements.get('ruizam-header')) {
  customElements.define('ruizam-header', RuizamHeader);
}
```

---

## 🪪 Licencia

MIT — Hecho con ❤️ por [@ruizamdev](https://github.com/ruizamdev) · 2025
