# 🚀 ruizam.dev

Bienvenido al repositorio de **ruizam.dev**, el portafolio personal de Armando Ruiz. Este proyecto está construido con [Astro](https://astro.build/), TypeScript y Web Components personalizados para mostrar proyectos, artículos y recursos de desarrollo frontend.

---

## ✨ Características

- ⚡️ Astro para renderizado rápido y moderno
- 🧩 Web Components personalizados (`ruizam-header`, etc.)
- 🎨 Estilos globales y encapsulados
- 📱 Diseño responsive y accesible
- 📝 Blog y sección de proyectos
- 🌙 Soporte para modo oscuro

---

## 🚀 Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ruizamdev/ruizam.dev.git
   cd ruizam.dev
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

---

## 📦 Estructura del proyecto

```text
src/
  components/
    web-components/
    wrappers/
  layouts/
  pages/
  styles/
public/
astro.config.mjs
tsconfig.json
```

---

## 🧩 Componentes principales

- **ruizam-header**: Encabezado personalizado con avatar y burbuja de diálogo.
- **BlogCarousel**: Carrusel de artículos destacados.
- **ThemeToggle**: Cambia entre modo claro y oscuro.
- **WebsiteNavbar**: Navegación principal del sitio.

---

## 🛠️ Alias y configuración

Asegúrate de que los alias estén configurados en `tsconfig.json` y `astro.config.mjs`:

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
export default defineConfig({
  alias: { '@': './src' }
});
```

---

## 📄 Licencia

Apache 2.0 — Hecho con ❤️ por [@ruizamdev](https://github.com/ruizamdev)
