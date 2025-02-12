# 📌 WorkHive - Gestión de Tareas Colaborativas

## 📌 Objetivo General y Descripción
### **Objetivo:**
Facilitar la gestión de tareas colaborativas en equipos, permitiendo organizar, asignar y dar seguimiento a tareas en tiempo real.

### **Descripción:**
Esta aplicación permite a los usuarios registrar tareas dentro de proyectos, asignarlas a miembros del equipo y organizarlas en un tablero Kanban. Los usuarios pueden actualizar el estado de las tareas, editarlas o eliminarlas. Además, cuenta con autenticación, personalización de cuenta y un sistema de roles.

---

## 📌 Tipo de Arquitectura y Justificación
**Usaremos la arquitectura Cliente-Servidor con API REST**:

- **Frontend:** React Native con Expo (Manejo de la UI e interacciones del usuario).
- **Backend:** Node.js con Express (Gestión de autenticación, lógica de negocio y conexión con MongoDB).
- **Base de datos:** MongoDB con Mongoose (Almacenamiento de usuarios, tareas y proyectos).

**Justificación:**
✅ Permite escalabilidad y modularidad.  
✅ Separa responsabilidades entre frontend y backend.  
✅ MongoDB facilita la gestión de tareas y relaciones entre proyectos/usuarios.  

---

## 📌 Framework Seleccionado
✅ **React Native (con Expo):** Desarrollo multiplataforma (Android/iOS).  
✅ **Express.js (Node.js):** API REST rápida y flexible.  
✅ **MongoDB + Mongoose:** Base de datos NoSQL optimizada para tareas y usuarios.  

---

## 📌 Estrategia de Versionamiento
Usaremos **Git Flow** para organizar el desarrollo:

- **`main`**: Código estable e integrado.  
- **`desarrollo`**: Integración de cambios antes de pasar a `main`.  
- **`Carmen`**: Rama de trabajo del integrante 1.  
- **`Emmanuel`**: Rama de trabajo del integrante 2.  

Para nuevas funciones o correcciones:  

- `feature/nombre-feature`: Para cada nueva funcionalidad.  
- `hotfix/nombre-hotfix`: Para corregir errores críticos.  

---

## 📌 Wireframes y Diagrama de Flujo
Puedes descargar el archivo con los wireframes y el diagrama de flujo aquí:  
[📂 Wireframe y diagrama de flujo.docx](./Wireframe%20y%20diagrama%20de%20flujo.docx)

---

## 🚀 Cómo Clonar y Configurar el Proyecto
```bash
git clone https://github.com/TU_USUARIO/WorkHive.git
cd WorkHive
npm install  # Instalar dependencias
