# PulseAlert
### Sistema de monitoreo de campañas publicitarias y gestión de alertas de marketing

## 1. Descripción del proyecto

**PulseAlert** es una aplicación web desarrollada para facilitar la gestión y el monitoreo de campañas de marketing digital. Su objetivo es centralizar la información de las campañas publicitarias, visualizar sus principales métricas, detectar situaciones que requieren atención y generar reportes de rendimiento.

La plataforma permite administrar campañas, consultar indicadores desde un dashboard, simular eventos que generan alertas, recibir notificaciones mediante Telegram y generar informes descargables en formato PDF.

El proyecto fue desarrollado por **Malardos Coding Club**, un equipo de cuatro estudiantes que trabajó colaborativamente en el análisis, diseño, desarrollo e integración de la solución.

## 2. Equipo de desarrollo

**Malardos Coding Club** es el equipo responsable del desarrollo de PulseAlert.

### Integrantes y responsabilidades

| Integrante | Rol y responsabilidades |
|---|---|
| **Franco Esquivel** | Líder de Frontend. Coordinación del desarrollo de la interfaz de usuario y su integración con el backend. |
| **Bruno Martínez** | Desarrollador Frontend. Desarrollo de las vistas de Alertas y Reportes, sus componentes y funcionalidades, incluyendo la generación y descarga de informes PDF. |
| **Jonathan Acevedo** | Desarrollador Backend y Base de Datos. Desarrollo de funcionalidades del servidor y gestión de la base de datos. |
| **Renzo Vannucci** | Líder de Backend. Coordinación del desarrollo del backend, integración de notificaciones mediante Telegram y trabajo con Wireshark. |

El equipo trabajó conjuntamente para integrar los diferentes componentes y construir una solución funcional.

## 3. Objetivos

- Centralizar la gestión y el seguimiento de campañas publicitarias.
- Facilitar la visualización de métricas e indicadores de rendimiento.
- Detectar eventos relevantes que puedan afectar el desempeño de las campañas.
- Notificar al usuario sobre eventos importantes mediante Telegram.
- Generar reportes de rendimiento y permitir su descarga en PDF.
- Proporcionar una interfaz intuitiva para administrar la información.

## 4. Funcionalidades principales

### 4.1. Dashboard

Permite visualizar un resumen general del estado de las campañas y sus principales indicadores, facilitando el seguimiento de la actividad.

### 4.2. Gestión de campañas

Permite consultar, registrar, modificar y eliminar campañas publicitarias, además de visualizar sus métricas y estados.

### 4.3. Sistema de alertas

Permite simular diferentes eventos relacionados con las campañas:

- Presupuesto crítico.
- Presupuesto excedido.
- Campaña caída.
- Campaña pausada.
- Caída del rendimiento.

Las alertas generadas se almacenan en la base de datos y pueden consultarse desde la aplicación. Además, el sistema utiliza Telegram para enviar notificaciones al destinatario configurado.

### 4.4. Reportes

Permite generar informes de rendimiento seleccionando una campaña y un período.

Los reportes quedan registrados en la base de datos y pueden consultarse desde la aplicación y descargarse en formato PDF.

La generación de documentos PDF se realiza desde el backend utilizando ReportLab.

**Nota:** El estado de notificación asociado a los reportes permanece simulado. La generación y descarga de los documentos sí se encuentra implementada.

### 4.5. Gestión de usuarios

Permite al administrador consultar los usuarios registrados, modificar sus datos y administrar sus roles y planes.

## 5. Tecnologías utilizadas

### 5.1. Frontend

| Tecnología | Utilización |
|---|---|
| React 19 | Desarrollo de la interfaz de usuario. |
| Vite | Servidor de desarrollo y compilación. |
| Material UI (MUI) | Componentes visuales y diseño de la interfaz. |
| React Router 7 | Navegación entre páginas. |
| Emotion | Motor de estilos utilizado por Material UI. |
| JavaScript | Lenguaje de desarrollo. |

### 5.2. Backend

| Tecnología | Utilización |
|---|---|
| Python 3.12 | Lenguaje de programación del backend. |
| FastAPI | Desarrollo de la API REST. |
| Uvicorn | Servidor de aplicaciones ASGI. |
| psycopg | Conexión con PostgreSQL. |
| Alembic | Administración de migraciones de base de datos. |
| python-dotenv | Administración de variables de entorno. |
| pwdlib | Gestión de contraseñas. |
| python-jose | Funcionalidades relacionadas con tokens y autenticación. |
| ReportLab | Generación de documentos PDF. |
| HTTPX | Comunicación HTTP para las notificaciones de Telegram. |

### 5.3. Base de datos

- **PostgreSQL 15:** almacenamiento persistente de la información del sistema.

### 5.4. Infraestructura

- **Docker:** contenedorización de los servicios.
- **Docker Compose:** configuración y ejecución conjunta del frontend, backend y base de datos.

## 6. Arquitectura del sistema

PulseAlert utiliza una arquitectura cliente-servidor compuesta por tres servicios principales:

1. **Frontend:** desarrollado con React y Vite. Se encarga de presentar la interfaz y permitir la interacción de los usuarios.
2. **Backend:** desarrollado con FastAPI. Procesa las solicitudes, ejecuta la lógica de negocio y se comunica con la base de datos y los servicios externos.
3. **Base de datos:** PostgreSQL. Almacena la información de usuarios, campañas, alertas y reportes.

El frontend realiza solicitudes HTTP al backend mediante una API REST. El backend procesa dichas solicitudes y consulta o modifica la información almacenada en PostgreSQL.

Para las notificaciones de alertas, el backend se comunica con la API de Telegram.

### Esquema general

```text
                  USUARIO
                     |
                     v
             FRONTEND - REACT
              localhost:5173
                     |
                     | Solicitudes HTTP
                     v
             BACKEND - FASTAPI
              localhost:8000
                /         \
               /           \
              v             v
        POSTGRESQL        TELEGRAM
        localhost:5433    API externa
```

## 7. Estructura del proyecto

La organización general del repositorio es la siguiente:

```text
proyecto_pulse_alert/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── services/
│   │
│   ├── database/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── theme/
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── .env
├── .gitignore
├── docker-compose.yml
└── README.md
```

### Descripción de las carpetas principales

**Backend:**

- `backend/app/models/`: modelos correspondientes a las entidades del sistema.
- `backend/app/repositories/`: acceso y operaciones sobre los datos.
- `backend/app/routes/`: definición de los endpoints de la API.
- `backend/app/schemas/`: esquemas para validar y estructurar los datos.
- `backend/app/services/`: lógica de negocio.
- `backend/database/`: archivos de inicialización de la base de datos.

**Frontend:**

- `frontend/src/components/`: componentes reutilizables de la interfaz.
- `frontend/src/context/`: contextos para compartir y administrar estados.
- `frontend/src/pages/`: páginas y vistas principales.
- `frontend/src/services/`: servicios para la comunicación con el backend.
- `frontend/src/theme/`: configuración del tema y los estilos globales.

## 8. Requisitos previos

Para ejecutar el proyecto mediante Docker se necesita:

- Git.
- Docker Desktop.
- Docker Compose, incluido en las versiones actuales de Docker Desktop.

No es necesario instalar manualmente Python, Node.js ni PostgreSQL para ejecutar la aplicación mediante Docker Compose, ya que cada servicio utiliza su propia imagen.

## 9. Configuración del entorno

Antes de iniciar el sistema, es necesario configurar las variables de entorno.

En la carpeta raíz del proyecto se debe crear un archivo llamado `.env`.

Su contenido debe respetar la siguiente estructura:

```env
# Base de datos
DB_USER=pulsealert_user
DB_PASSWORD=CAMBIAR_POR_UNA_CONTRASENA_SEGURA
DB_NAME=pulsealert_db

# Seguridad
SECRET_KEY=CAMBIAR_POR_UNA_CLAVE_SECRETA

# Telegram
TELEGRAM_BOT_TOKEN=TOKEN_DEL_BOT
TELEGRAM_CHAT_ID=ID_DEL_CHAT
```

### Descripción de las variables

| Variable | Descripción |
|---|---|
| `DB_USER` | Usuario de PostgreSQL. |
| `DB_PASSWORD` | Contraseña del usuario de PostgreSQL. |
| `DB_NAME` | Nombre de la base de datos. |
| `SECRET_KEY` | Clave secreta utilizada por el backend. |
| `TELEGRAM_BOT_TOKEN` | Token del bot de Telegram. |
| `TELEGRAM_CHAT_ID` | Identificador del chat que recibirá las notificaciones. |

**Importante:**

- Reemplazar los valores de ejemplo por los correspondientes a cada entorno.
- No compartir el archivo `.env` ni subirlo al repositorio.
- Mantener las credenciales y claves secretas protegidas.
- Para recibir notificaciones, es necesario configurar correctamente el bot de Telegram y el identificador del chat.

## 10. Instalación y puesta en marcha

### 10.1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/JonyCarp14/proyecto_pulse_alert.git
```

Ingresar a la carpeta del proyecto:

```bash
cd proyecto_pulse_alert
```

### 10.2. Configurar las variables de entorno

Crear el archivo `.env` en la raíz del proyecto y completar las variables indicadas en la sección 9.

### 10.3. Construir e iniciar los servicios

Desde la carpeta raíz del repositorio, ejecutar:

```bash
docker compose up -d --build
```

Este comando construye las imágenes necesarias e inicia los tres servicios:

- Frontend.
- Backend.
- Base de datos PostgreSQL.

El parámetro `-d` permite ejecutar los contenedores en segundo plano, mientras que `--build` fuerza la construcción de las imágenes.

### 10.4. Verificar el estado de los servicios

Ejecutar:

```bash
docker compose ps
```

Este comando permite comprobar que los contenedores estén iniciados correctamente.

### 10.5. Acceder al sistema

Una vez iniciados los servicios, se puede acceder a través de las siguientes direcciones:

| Servicio | Dirección |
|---|---|
| Aplicación web | http://localhost:5173 |
| API REST | http://localhost:8000 |
| Documentación Swagger | http://localhost:8000/docs |
| Base de datos | localhost:5433 |

La documentación interactiva de Swagger permite consultar los endpoints disponibles y realizar pruebas sobre la API.

## 11. Comandos útiles de Docker

Todos los comandos deben ejecutarse desde la carpeta raíz del proyecto.

### Iniciar los servicios

```bash
docker compose up -d
```

Inicia los contenedores sin reconstruir las imágenes.

### Reconstruir e iniciar los servicios

```bash
docker compose up -d --build
```

Reconstruye las imágenes y vuelve a iniciar los servicios. Es útil cuando se modifican los Dockerfile o las dependencias.

### Consultar los contenedores

```bash
docker compose ps
```

Muestra el estado de los servicios.

### Consultar los registros

```bash
docker compose logs -f
```

Muestra los registros de todos los servicios en tiempo real.

Para consultar los registros de un servicio específico:

```bash
docker compose logs -f backend
```

```bash
docker compose logs -f frontend
```

```bash
docker compose logs -f db
```

### Reiniciar un servicio

```bash
docker compose restart backend
```

En este ejemplo se reinicia únicamente el backend. Se puede reemplazar `backend` por `frontend` o `db`.

### Detener los servicios

```bash
docker compose down
```

Detiene y elimina los contenedores y la red creada por Docker Compose. Los datos almacenados en el volumen de PostgreSQL se conservan.

### Detener los servicios y eliminar los datos de la base de datos

```bash
docker compose down -v
```

**Advertencia:** este comando elimina también los volúmenes asociados, incluyendo `postgres_data`. Esto provoca la pérdida de los datos almacenados en PostgreSQL. Utilizarlo únicamente cuando se desee reiniciar la base de datos desde cero.

## 12. Inicialización de la base de datos

El servicio PostgreSQL utiliza un volumen persistente llamado `postgres_data`.

Además, el directorio:

```text
backend/database/
```

se encuentra vinculado al directorio de inicialización de PostgreSQL:

```text
/docker-entrypoint-initdb.d/
```

Los archivos de inicialización compatibles que se encuentren allí son ejecutados automáticamente por PostgreSQL durante la creación inicial de la base de datos.

**Importante:** los scripts de inicialización no vuelven a ejecutarse cada vez que se inicia el contenedor. Si ya existe un volumen de datos inicializado, PostgreSQL conserva su información y no repite automáticamente la inicialización.

Para comenzar nuevamente con una base de datos limpia, se debe eliminar el volumen mediante el procedimiento indicado en la sección anterior.

## 13. Integración con Telegram

PulseAlert utiliza un bot de Telegram para enviar notificaciones cuando se generan alertas.

El backend realiza las solicitudes a la API de Telegram utilizando las variables de entorno:

- `TELEGRAM_BOT_TOKEN`.
- `TELEGRAM_CHAT_ID`.

Cuando se genera una alerta, el sistema la registra en PostgreSQL e intenta enviar la notificación correspondiente.

El estado del envío queda registrado para poder identificar si la notificación fue enviada o si quedó pendiente o falló.

Para utilizar esta funcionalidad es necesario contar con un bot configurado y un chat de destino válido.

## 14. Generación de reportes PDF

El sistema permite generar reportes de rendimiento de campañas.

El backend utiliza la biblioteca ReportLab para construir los documentos PDF.

El proceso contempla:

1. Seleccionar la campaña.
2. Definir el período del reporte.
3. Solicitar la generación del informe.
4. Almacenar el registro del reporte en PostgreSQL.
5. Consultar el reporte desde la aplicación.
6. Descargar el documento PDF.

La generación del archivo se realiza desde el backend y su descarga se encuentra integrada en la interfaz de Reportes.

El estado de notificación asociado a los reportes permanece simulado.

## 15. Pruebas de la API

La API REST de PulseAlert está desarrollada con FastAPI.

Para consultar los endpoints disponibles y probar las operaciones se puede acceder a Swagger:

```text
http://localhost:8000/docs
```

Desde esta interfaz es posible:

- Consultar los endpoints.
- Revisar los parámetros y esquemas de entrada.
- Ejecutar solicitudes HTTP.
- Consultar las respuestas del servidor.
- Verificar el funcionamiento de los distintos recursos.

## 16. Convenciones de trabajo y control de versiones

Para mantener una organización adecuada durante el desarrollo se establecen las siguientes convenciones:

- Trabajar en ramas propias para cada integrante.
- Evitar realizar modificaciones directamente sobre `main`.
- Integrar los cambios mediante Pull Requests.
- Utilizar nombres de commits descriptivos.
- Mantener separadas las responsabilidades de frontend y backend.
- Evitar incorporar dependencias innecesarias.
- No subir archivos `.env`, credenciales ni información sensible al repositorio.

## 17. Estado del proyecto

PulseAlert cuenta con una aplicación web integrada con un backend y una base de datos PostgreSQL.

Entre las funcionalidades implementadas se encuentran:

- Dashboard con indicadores generales.
- Gestión de campañas.
- Generación y consulta de alertas.
- Persistencia de alertas en PostgreSQL.
- Envío de notificaciones mediante Telegram.
- Generación y descarga de reportes PDF.
- Gestión administrativa de usuarios.
- Ejecución de los servicios mediante Docker Compose.

Algunas funcionalidades utilizan eventos y datos de prueba para demostrar el comportamiento del sistema. En particular, los eventos de alerta se simulan desde la interfaz, pero las alertas generadas se registran en la base de datos y sus notificaciones pueden enviarse realmente mediante Telegram.

---

**PulseAlert — Malardos Coding Club**

*Una herramienta tecnológica para facilitar la gestión y el monitoreo del marketing digital.*

