# Portfolio Astro


![Astro](https://img.shields.io/badge/Astro-1B253A?logo=astro&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-FF3E00?logo=svelte&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)

Este proyecto es un portafolio personal desarrollado con [Astro](https://astro.build/) y componentes Svelte, pensado para mostrar tus habilidades, experiencia, proyectos y enlaces a redes sociales, incluyendo la integración dinámica de vídeos recientes de YouTube.

## 🚀 Estructura del Proyecto

```
/
├── public/                  # Archivos estáticos (imágenes, iconos, etc.)
├── src/
│   ├── components/          # Componentes Astro y Svelte
│   ├── layouts/             # Layouts reutilizables
│   └── pages/               # Páginas principales del sitio
├── package.json
└── astro.config.mjs
```

## 🧑‍💻 Tecnologías

- [Astro](https://astro.build/)
- [Svelte 5](https://svelte.dev/)
- SCSS para estilos
- Integración con la API de YouTube

## ⚙️ Instalación y uso

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tu-usuario/portfolio-astro.git
   cd portfolio-astro
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```
   PUBLIC_API_KEY=tu_api_key_de_youtube
   PUBLIC_CHANNEL_ID=tu_channel_id
   ```

   > Puedes obtener la API Key desde [Google Cloud Console](https://console.cloud.google.com/).

4. **Inicia el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

   El sitio estará disponible en [http://localhost:4321](http://localhost:4321)

## 📦 Comandos útiles

| Comando            | Acción                                         |
|--------------------|-----------------------------------------------|
| `npm install`      | Instala las dependencias                      |
| `npm run dev`      | Inicia el servidor de desarrollo              |
| `npm run build`    | Genera la versión de producción en `/dist`    |
| `npm run preview`  | Previsualiza la versión de producción         |

## ✨ Características

- Diseño responsive y moderno.
- Sección de habilidades, experiencia y proyectos.
- Integración con redes sociales (YouTube, LinkedIn, Behance, GitHub).
- Últimos vídeos de tu canal de YouTube cargados dinámicamente.
- Fácilmente personalizable.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

¿Dudas o sugerencias? ¡Contribuye o abre un issue!
