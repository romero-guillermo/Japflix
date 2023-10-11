const apiUrl = `https://japceibal.github.io/japflix_api/movies-data.json`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }
    return response.json();
  })
  .then(data => {
    const lista = document.getElementById("lista");

    // Almacenar los datos en una variable global para su uso posterior
    let peliculas = data;

    // Función para mostrar una película en la lista
    const mostrarPeliculaEnLista = (pelicula) => {
      const elemento = document.createElement("li");
      elemento.classList.add("list-group-item");

      // Título
      const titulo = document.createElement("h5");
      titulo.textContent = pelicula.title;
      elemento.appendChild(titulo);

      // Tagline
      const tagline = document.createElement("p");
      tagline.textContent = pelicula.tagline;
      elemento.appendChild(tagline);

      // Votación (estrellas)
      const votacion = document.createElement("span");
      const estrellas = '\u2605'.repeat(Math.round(pelicula.vote_average / 2)); // Convierte el voto en estrellas
      votacion.textContent = estrellas;
      elemento.appendChild(votacion);

      // Evento de clic
      elemento.addEventListener("click", () => {
        mostrarDetalle(pelicula);
      });

      lista.appendChild(elemento);
    };

    // Función para mostrar el detalle de una película
    const mostrarDetalle = (pelicula) => {
      // Llenar el modal con los detalles de la película
      const modalTitulo = document.getElementById("modalTitulo");
      const modalGeneros = document.getElementById("modalGeneros");
      const modalSinopsis = document.getElementById("modalSinopsis");
      const modalAnio = document.getElementById("modalAnio");
      const modalDuracion = document.getElementById("modalDuracion");
      const modalPresupuesto = document.getElementById("modalPresupuesto");
      const modalGanancias = document.getElementById("modalGanancias");
      {
        const detalleTitulo = document.getElementById("detalleTitulo");
  const detalleSinopsis = document.getElementById("detalleSinopsis");
  const detalleGeneros = document.getElementById("detalleGeneros");
  const detalleBoton = document.getElementById("detalleBoton");
  const detalleDesplegable = document.getElementById("detalleDesplegable");

  detalleTitulo.textContent = pelicula.title;
  detalleSinopsis.textContent = pelicula.overview;

  // Convertir el objeto de géneros a una cadena de texto
  const generos = pelicula.genres.map((genero) => genero.name).join(", ");
  detalleGeneros.textContent = "Géneros: " + generos;

  // Crear el botón con el desplegable
  detalleBoton.innerHTML = `
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#detalleDesplegable" aria-expanded="false">
      Detalles adicionales
    </button>
  `;

  // Llenar el desplegable con información adicional
  detalleDesplegable.innerHTML = `
    <div class="collapse" id="detalleDesplegable">
      <p>Año de lanzamiento: ${pelicula.release_date.split("-")[0]}</p>
      <p>Duración: ${pelicula.runtime} minutos</p>
      <p>Presupuesto: $${pelicula.budget}</p>
      <p>Ganancias: $${pelicula.revenue}</p>
    </div>
  `;

  // Mostrar el contenedor de detalle
  const peliculaDetalle = document.getElementById("peliculaDetalle");
  peliculaDetalle.style.display = "block";
};


      // Mostrar el contenedor de detalle
      const peliculaDetalle = document.getElementById("peliculaDetalle");
      peliculaDetalle.style.display = "block";

      modalTitulo.textContent = pelicula.title;
      modalGeneros.textContent = pelicula.genres.join(", ");
      modalSinopsis.textContent = pelicula.overview;
      modalAnio.textContent = pelicula.release_date.split("-")[0];
      modalDuracion.textContent = pelicula.runtime + " minutos";
      modalPresupuesto.textContent = `$${pelicula.budget}`;
      modalGanancias.textContent = `$${pelicula.revenue}`;

      // Mostrar el modal
      $("#modalDetalle").modal("show");
    };

    peliculas.forEach((pelicula) => {
        const elemento = document.createElement("li");
        elemento.classList.add("list-group-item");

        // Título
        const titulo = document.createElement("h5");
        titulo.textContent = pelicula.title;
        elemento.appendChild(titulo);

        // Tagline
        const tagline = document.createElement("p");
        tagline.textContent = pelicula.tagline;
        elemento.appendChild(tagline);

        // Votación (estrellas)
        const votacion = document.createElement("span");
        const estrellas = '\u2605'.repeat(Math.round(pelicula.vote_average / 2)); // Convierte el voto en estrellas
        votacion.textContent = estrellas;
        elemento.appendChild(votacion);

        // Evento de clic para mostrar detalle
        elemento.addEventListener("click", () => {
          mostrarDetalle(pelicula);
        });

        lista.appendChild(elemento);
      });


    // Evento de búsqueda
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");

    btnBuscar.addEventListener("click", () => {
      const valor = inputBuscar.value.toLowerCase();
      lista.innerHTML = "";

      if (valor) {
        // Filtrar películas que coincidan con la búsqueda
        const peliculasFiltradas = peliculas.filter(pelicula =>
          pelicula.title.toLowerCase().includes(valor) ||
          pelicula.genres.join(", ").toLowerCase().includes(valor) ||
          pelicula.tagline.toLowerCase().includes(valor) ||
          pelicula.overview.toLowerCase().includes(valor)
        );

        peliculasFiltradas.forEach(mostrarPeliculaEnLista);
      } else {
        // Mostrar todas las películas si no hay búsqueda
        peliculas.forEach(mostrarPeliculaEnLista);
      }
      // Mostrar la lista de películas después de una búsqueda
      lista.style.display = "block";
    });

    // Ocultar la lista de películas en la carga inicial
    lista.style.display = "none";
  })
  .catch(error => {
    console.error(error);
  });
