# ¡Bienvenidos a la Pokédex de Kanto!

### Pasos a seguir para ejecutar el proyecto

- Una vez clonado el repositorio y estando en la carpeta raíz, ejecutar **npm i** , con el fin de poder instalar todas las librerías necesarias para el proyecto.
- Finalmente, ejecutar el siguiente comando para correr el servidor:  **npm run dev**


### Programas requeridos para ejecutar este proyecto

- **Node.js:** versión 14 como mínimo.


### Rutas disponibles para el proyecto

- http://localhost:5173 -> En esta URL se pueden detallar el nombre e imagen de los primeros 151 Pokémon. Además, se tiene la opción de seleccionar un equipo Pokémon, con mínimo 1 y máximo 6 Pokémon a elegir.
- http://localhost:5173/team/ -> En esta URL se pueden detallar los Pokémon de tu equipo, pudiendo detallar la imagen, nombre, tipos, stats, sonido, ver detalle del Pokémon y eliminar de tu equipo.
- http://localhost:5173/team/:pokemon_id -> En esta URL se puede observar el detalle de uno de los Pokémon de tu equipo, pudiendo detallar la imagen, nombre, tipos, stats, sonido, altura, peso, descripción y su cadena evolutiva.