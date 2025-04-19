# 🌗 ThemeToggle Web Component (TypeScript)

`<theme-toggle>` es un componente Web hecho en **TypeScript** que permite alternar entre los temas **claro y oscuro**, respetando las preferencias del sistema y almacenando la elección del usuario con animaciones suaves e íconos SVG dinámicos.

---

## ✨ Características

- ✔️ Cambia entre modo claro y oscuro automáticamente
- 🌐 Detecta cambios del sistema en tiempo real (`prefers-color-scheme`)
- 🧠 Guarda preferencias en `localStorage`
- 💫 Anima íconos SVG (sol/luna) con fade y transformaciones
- ♿️ Accesible (`aria-label`, `title`, eventos bien conectados)
- 🔒 Shadow DOM encapsulado

---

## 🚀 Uso básico

### HTML directo

```html
<theme-toggle></theme-toggle>
```

### Astro con wrapper

```astro
---
import { useEffect } from 'astro/client';
useEffect(() => import('@components/web-components/ThemeToggle'));
---

<theme-toggle />
```

---

## 🧠 Comportamiento

- En `connectedCallback()`:
  - Renderiza el botón con ícono dinámico
  - Verifica si el sistema está en modo oscuro
  - Aplica la clase `dark` al `<html>`
  - Escucha cambios futuros del sistema si el usuario no ha definido una preferencia

- Al hacer clic:
  - Alterna el modo (claro ↔️ oscuro)
  - Actualiza `localStorage`
  - Cambia el ícono SVG (sol/luna) con transición

---

## 🎨 Personalización visual

Puedes editar directamente los estilos del componente en `getStyles()`, o extraerlos a un módulo si prefieres organizarlos aparte. El componente está diseñado para integrarse fácilmente con variables como:

```css
:root {
  --font-color: #fff;
  --emphasis-color: #ff4081;
}
```

---

## 🪪 Licencia

MIT — Hecho con ❤️ por [@ruizamdev](https://github.com/ruizamdev) · 2025
