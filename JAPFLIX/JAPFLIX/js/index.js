const apiUrl = `https://japceibal.github.io/japflix_api/movies-data.json`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

