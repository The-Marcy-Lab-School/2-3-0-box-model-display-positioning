/**********************************************/
/* Helpers for Adding Movie Fun Facts */
/**********************************************/

const addNumberOfMovies = (movies) => {
  // document.querySelector lets us grab any HTML element
  const numberOfMoviesSpan = document.querySelector('span#number-of-movies')

  // querySelector returns an Element Object that we can manipulate!
  numberOfMoviesSpan.textContent = movies.length;
}

const addAverageCasting = (movies) => {
  // Calculate the average cast size for all movies
  const totalCastings = movies.reduce((totalCastings, movie) => {
    return totalCastings + movie.cast.length
  }, 0);
  const averageCastSize = (totalCastings / movies.length).toFixed(2);

  // Target the spans and insert the data in one line
  document.querySelector('span#average-cast-size').textContent = averageCastSize;
}

const addMovieGenreCounts = (movies) => {
  // Create a dictionary of { genre: movieCount } for all genres
  // Example: { "Comedy": 300, "Action": 250, "Drama": 390 }
  const genreCounts = {}
  movies.forEach((movie) => {
    movie.genres.forEach(genre => {
      if (!genreCounts[genre]) {
        genreCounts[genre] = 0;
      }
      genreCounts[genre] += 1;
    });
  });

  // Get the genres by name
  const genres = Object.keys(genreCounts);

  // Sort the genre names according to their value in genreCounts
  genres.sort((genreA, genreB) => {
    return genreCounts[genreA] > genreCounts[genreB] ? -1 : 1
  })

  // Get the 5 most popular
  const top5Genres = genres.slice(0, 5);

  // Target the list which will contain the genre counts
  const genreCountList = document.querySelector("#genre-count-list");

  // For each top 5 genre, create a list item and append it to the genreCountList
  top5Genres.forEach((genre) => {
    // 1. Create the new element
    const li = document.createElement('li');

    // 2. Modify the element
    li.innerHTML = `<strong>${genre}</strong> with ${genreCounts[genre]} movies`;

    // 3. Append the element
    genreCountList.append(li);
  });
}

/**********************************************/
/* Helpers for Adding Movie Cards to the List */
/**********************************************/

const addMovies = (movies) => {
  // 1. Grab the movieslist container
  const moviesList = document.querySelector('#movies-list')

  // 2. For each movie in the movies array...
  // 3. Add a list item with the following structure to the movies list:

  /* 
  <li>
    <h3>The Grudge (2020)</h3>
    <img src="thumbnail.jpg" alt="Movie poster for The Grudge">
    <p>Horror, Supernatural</p>
  </li>
  */
  movies.forEach((movie) => {
    const li = document.createElement('li');
    const titleYearH3 = document.createElement('h3');
    const thumbnailImg = document.createElement('img');
    const genresP = document.createElement('p');

    thumbnailImg.src = movie.thumbnail;
    thumbnailImg.alt = `Movie poster for ${movie.title}`;
    titleYearH3.textContent = `${movie.title} (${movie.year})`
    genresP.textContent = movie.genres.join(', ');

    li.append(thumbnailImg, titleYearH3, genresP);
    moviesList.append(li);
  });
}



/**************************************/
/* Load the movies and invoke helpers */
/**************************************/
const main = async () => {
  addNumberOfMovies(movies);
  addAverageCasting(movies);
  addMovieGenreCounts(movies);
  addMovies(movies);
}

main();