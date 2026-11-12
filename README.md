# PulseAlert — Frontend

## 1. Tecnologías establecidas

- **React 19:** desarrollo de la interfaz.
- **Vite 7:** servidor de desarrollo y compilación.
- **Material UI (MUI 7):** componentes visuales.
- **React Router 7:** navegación entre páginas.
- **Emotion:** motor de estilos utilizado por MUI.
- **JavaScript:** lenguaje de desarrollo.

No incorporar Tailwind CSS ni otras librerías de estilos sin acordarlo previamente con el responsable del frontend y el equipo.

## 2. Identidad visual

Se establece como base la paleta original de PulseAlert:

| Uso | Color |
|---|---|
| Fondo principal | `#0B1220` |
| Superficies y tarjetas | `#111827` |
| Color primario | `#2563EB` |
| Color secundario | `#22D3EE` |
| Advertencias | `#F59E0B` |
| Errores y alertas críticas | `#EF4444` |
| Estados positivos | `#10B981` |
| Texto principal | `#F8FAFC` |
| Texto secundario | `#94A3B8` |

La configuración se centraliza en `src/theme/theme.js`, mediante el tema de Material UI.

Los componentes deben reutilizar esta configuración para mantener la coherencia visual.

## 3. Estructura inicial

- `src/main.jsx`: punto de entrada de React y configuración global.
- `src/App.jsx`: componente principal de la aplicación.
- `src/theme/theme.js`: tema y paleta de colores.
- `index.html`: documento HTML principal.
- `vite.config.js`: configuración de Vite y su complemento de React.

Las páginas, componentes y servicios se incorporarán progresivamente según las necesidades del desarrollo.

## 4. Comandos de desarrollo

Ejecutar desde la carpeta `frontend`:

- `npm install`: instalar las dependencias.
- `npm run dev`: iniciar el servidor de desarrollo.
- `npm run build`: comprobar y compilar la aplicación.
- `npm run preview`: previsualizar la compilación de producción.

## 5. Convenciones de trabajo

- Trabajar en ramas propias; no modificar directamente `main`.
- Integrar cambios mediante Pull Requests.
- No reemplazar la configuración global, la paleta ni las tecnologías acordadas sin discutirlo previamente con el responsable del frontend.
- Antes de agregar dependencias, verificar si las herramientas existentes resuelven la necesidad.
- Mantener los componentes reutilizables y evitar duplicar lógica o estilos.

## 6. Estado actual

La configuración inicial está preparada y la compilación de producción fue comprobada mediante `npm run build`.

El desarrollo funcional de las páginas y componentes continúa pendiente.

