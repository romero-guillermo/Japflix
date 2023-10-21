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
    let peliculas = data;

    const mostrarPeliculaEnLista = (pelicula) => {
      const elemento = document.createElement("li");
      elemento.classList.add("list-group-item");

      const titulo = document.createElement("h5");
      titulo.textContent = pelicula.title;
      elemento.appendChild(titulo);

      const tagline = document.createElement("p");
      tagline.textContent = pelicula.tagline;
      elemento.appendChild(tagline);

      const votacion = document.createElement("span");
      const estrellas = '\u2605'.repeat(Math.round(pelicula.vote_average / 2));
      votacion.textContent = estrellas;
      elemento.appendChild(votacion);

      elemento.addEventListener("click", () => {
        mostrarDetalle(pelicula);
      });

      lista.appendChild(elemento);
    };

    const mostrarDetalle = (pelicula) => {
      const detalleTitulo = document.getElementById("detalleTitulo");
      const detalleSinopsis = document.getElementById("detalleSinopsis");
      const detalleGeneros = document.getElementById("detalleGeneros");
      const detalleBoton = document.getElementById("detalleBoton");
      const detalleDesplegable = document.getElementById("detalleDesplegable");

      detalleTitulo.textContent = pelicula.title;
      detalleSinopsis.textContent = pelicula.overview;

      const generos = pelicula.genres.map((genero) => genero.name).join(", ");
      detalleGeneros.textContent = "Géneros: " + generos;

      // Limpia el contenido actual del desplegable
      detalleDesplegable.innerHTML = '';

      // Agrega nuevos elementos al desplegable
      const detalles = [
        `Año de lanzamiento: ${pelicula.release_date.split("-")[0]}`,
        `Duración: ${pelicula.runtime} minutos`,
        `Presupuesto: $${pelicula.budget}`,
        `Ganancias: $${pelicula.revenue}`
      ];

      detalles.forEach(detalle => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a class="dropdown-item" href="#">${detalle}</a>`;
        detalleDesplegable.appendChild(listItem);
      });

      // Muestra el offcanvas
      const offcanvasDetalle = new bootstrap.Offcanvas(document.getElementById('offcanvasDetalle'));
      offcanvasDetalle.show();
    };

    peliculas.forEach((pelicula) => {
      const elemento = document.createElement("li");
      elemento.classList.add("list-group-item");

      const titulo = document.createElement("h5");
      titulo.textContent = pelicula.title;
      elemento.appendChild(titulo);

      const tagline = document.createElement("p");
      tagline.textContent = pelicula.tagline;
      elemento.appendChild(tagline);

      const votacion = document.createElement("span");
      const estrellas = '\u2605'.repeat(Math.round(pelicula.vote_average / 2));
      votacion.textContent = estrellas;
      elemento.appendChild(votacion);

      elemento.addEventListener("click", () => {
        mostrarDetalle(pelicula);
      });

      lista.appendChild(elemento);
    });

    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");

    btnBuscar.addEventListener("click", () => {
      const valor = inputBuscar.value.toLowerCase();
      lista.innerHTML = "";

      if (valor) {
        const peliculasFiltradas = peliculas.filter(pelicula =>
          pelicula.title.toLowerCase().includes(valor) ||
          pelicula.genres.join(", ").toLowerCase().includes(valor) ||
          pelicula.tagline.toLowerCase().includes(valor) ||
          pelicula.overview.toLowerCase().includes(valor)
        );

        peliculasFiltradas.forEach(mostrarPeliculaEnLista);
      } else {
        peliculas.forEach(mostrarPeliculaEnLista);
      }

      lista.style.display = "block";
    });

    lista.style.display = "none";
  })
  .catch(error => {
    console.error(error);
  });
