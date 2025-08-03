<h1 align='center'> <img width="109" height="57" alt="download-removebg-preview (1)" src="https://github.com/user-attachments/assets/b65ec332-79a9-46b0-b577-56ca5dac604a" />
 Aplicación Web Distribuida <img width="109" height="57" alt="download-removebg-preview (1)" src="https://github.com/user-attachments/assets/275e566d-1e08-4e7d-8451-c97d55fdbd40" />
</h1>

> [!IMPORTANT]
> **Descripción del proyecto**
>
> Este proyecto consiste en la implementación de una **infraestructura distribuida** para una aplicación web de gestión de inventario, utilizando **contenedores Docker**, un **balanceador de carga con NGINX**, y un sistema de **replicación de base de datos MySQL**. El objetivo es construir un entorno escalable, confiable y de alto rendimiento que refleje una arquitectura moderna de aplicaciones distribuidas.

## 🧩 Tecnologías Utilizadas
- Docker
- Docker Compose
- NGINX (como balanceador de carga)
- MySQL (con replicación maestro-esclavo)
- Aplicación Web (Angular)

## ⚙️ Arquitectura
- 3 contenedores con la misma aplicación web
- 1 contenedor con NGINX configurado para balanceo de carga por pesos
- 1 contenedor con MySQL master
- 1 contenedor con MySQL slave
- Orquestación completa con `docker-compose.yml`

## 🖥️ Funcionalidades
- Inicio de sesión de usuarios
- Registro de productos (nombre, código, descripción, unidad, categoría)
- Validación de códigos únicos
- Consulta en tiempo real de disponibilidad de productos

## 📚 Conclusiones
- La arquitectura distribuida implementada demuestra cómo se puede lograr alta disponibilidad y escalabilidad utilizando tecnologías modernas como Docker y NGINX. Este enfoque es ideal para aplicaciones que requieren rendimiento y resiliencia en entornos reales.

## 👥 Integrantes del equipo
- John Mata
- Estefania Sánchez
- Isabel Pazto
