let data; // Declara la variable data fuera de las funciones

const apiUrl = `https://japceibal.github.io/japflix_api/movies-data.json`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }
    return response.json();
  })
  .then(dataResponse => {
    data = dataResponse; // Asigna los datos a la variable data
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

  document.getElementById('btnBuscar').addEventListener('click', function () {
    // Obtener el valor del campo de búsqueda
    const searchTerm = document.getElementById('inputBuscar').value.trim().toLowerCase();
  
    // Verificar si se ingresó algún valor en el campo de búsqueda
    if (searchTerm !== '') {
      // Filtrar las películas que coincidan con la búsqueda en title, genres, tagline u overview
      const filteredMovies = data.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        (movie.genres && movie.genres.some(genre => typeof genre === 'string' && genre.toLowerCase().includes(searchTerm))) ||
        movie.tagline.toLowerCase().includes(searchTerm) ||
        movie.overview.toLowerCase().includes(searchTerm)
      );
  
      // Mostrar las películas filtradas en el HTML
      displayMovies(filteredMovies);
    } else {
      // Si no se ingresó nada en el campo de búsqueda, mostrar todas las películas
      displayMovies(data);
    }
  });
  
function displayMovies(movies) {
  // Obtener el elemento de la lista
  const lista = document.getElementById('lista');

  // Limpiar la lista actual
  lista.innerHTML = '';

  // Iterar sobre las películas y agregarlas a la lista
  movies.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `<h3>${movie.title}</h3>
                         <p>${movie.tagline}</p>
                         <p>Vote Average: ${getStars(movie.vote_average)}</p>`;
    lista.appendChild(listItem);
  });
}

// Función para convertir la puntuación en formato de "estrellas"
function getStars(voteAverage) {
  const roundedAverage = Math.round(voteAverage / 2);
  return '★'.repeat(roundedAverage) + '☆'.repeat(5 - roundedAverage);
}