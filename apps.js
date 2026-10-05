const API_KEY='7f03f40b5fb84ed7145d3d03427f6b6d';
const BASE_URL='https://api.themoviedb.org/3';
const IMAGE_URL='https://image.tmdb.org/t/p/w500';

const moviesgrid=document.getElementById('movies-grid');

const obtenerPelicual=async()=>{
    const url=`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;
    const respuesta=await fetch(url);
    const datos=await respuesta.json();
    return datos.results;
}

const crearTarjeta = (pelicula) => {
  const { title, release_date, vote_average, poster_path } = pelicula;
  const año = release_date ? release_date.split('-')[0] : 'N/A';
  const imagen = poster_path ? `${IMAGE_URL}${poster_path}` : '';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return `
    <article class="movie-card">
      <div class="movie-card__poster">
        <img class="movie-card__image" src="${imagen}" alt="${title}">
      </div>
      <div class="movie-card__content">
        <h3 class="movie-card__title">${title}</h3>
        <p class="movie-card__year">${año}</p>
        <span class="movie-card__rating">${rating}</span>
      </div>
    </article>
  `;
};

mostrarLoading();
try{
    const peliculas=await obtenerPeliculas();
    console.log(`${peliculas.length} peliculas obtenidas`);
    ocultarLoading();
    moviesgrid.innerHTML=peliculas.map(crearTarjeta).join('');
    console.log('Primera pelicula renderizada');
}catch(error){
    console.log('Error',error);
    let mensaje='No se pudo cargar peliculas';
    if(error.message.includes('401')){
        mensaje='API Key invalida, verifica tu clave';
    }else if(error.message.includes('fetch')){

    }
}

//const primera=peliculas[0];
//console.log('Primera pelicula',primera);

iniciar();

const loadingDiv=document.getElementById('loading');
const erroDiv=document.getElementById('error');
const errorMessage=document.getElementById('error-message');

const mostrarLoading=()=>{
    loadingDiv.style.display='flex';
    erroDiv.style.display='none';
    moviesgrid.innerHTML='';
}

const ocultarLoading=()=>{
    loadingDiv.style.display='none';
}

const mostrarError=(mensaje)=>{
    ocultarLoading();
    errorMessage=mensaje;
    erroDiv.style.display='flex';
    moviesgrid.innerHTML='';
}

/* const probarApi=async()=>{
    const url=`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;
    console.log('Url de la peticion',url);
    const respuesta=await fetch(url);
    const datos=await respuesta.json();
    console.log('Respuesta completa',datos);
    console.log('Peliculas',datos.results);
    console.log('Total de resultados',datos.total_results);
} */

/* probarApi(); */