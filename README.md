## Cuida tu comunidad

### Tecnologias requeridas:

-   **PHP >= 8.2.0**
-   **PHP8.2-curl, PHP-curl**
-   **Composer 2.2.18**
-   **Node >= 18.8.0**
-   **Npm >= 8.18.0**

### Ejecutar los siguientes comandos despues de clonar el proyecto.

-   cp .env.example .env
-   composer update
-   php artisan key:generate
-   npm install
-   npm run dev
-   docker-compose up -d
-   php artisan migrate --database=pgsqlMigrations

### El proyecto debe de estar listo para usarse

-   Abrir en el navegador localhost:3000 si no se modificaron las variables de entorno.
