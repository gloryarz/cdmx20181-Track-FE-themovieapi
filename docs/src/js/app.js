const inner = document.getElementById('inner');
const btnSearch = document.getElementById('btnSearch');
const userSearch = document.getElementById('userSearch');
// http://www.omdbapi.com/?apikey=58ac39cb&s=flash
const mainUrl = 'https://www.omdbapi.com/?';
const api = 'apikey=58ac39cb';
let search = 'sherlock';
let url = '';

btnSearch.addEventListener('click', el => {
    el.preventDefault();
    search = userSearch.value.toLowerCase().replace(/\s/g, '+');
    console.log(search)
    url = mainUrl + api + '&s=' + search;
    getMovies(api, search);
});

const getMovies = (api, search) => {
    url = mainUrl + api + '&s=' + search;
    console.log(url);
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            for (key in data) {
                let searching = data[key];
                if (Array.isArray(searching) === true) {
                    gettingMovies(searching);
                }
            }
        })
}
getMovies(api, search);
let moviesArr;

const gettingMovies = (searching) => {
    moviesArr = []
    for (numbers in searching) {
        let movies = searching[numbers];
        let moviesID = movies.imdbID;
        let movieArr = [movies.imdbID, movies.Title, movies.Year, movies.Type, movies.Poster]
        moviesArr.push(movieArr);
    }
    print();

}
const secondFetch = (movieID) => {
    let selectedMovieId = movieID.id;
    let secondUrl = mainUrl + api + '&i=' + selectedMovieId;
    console.log(secondUrl);
    fetch(secondUrl)
        .then(resp => resp.json())
        .then(data => {
            moreData(data);
        })
}



const print = () => {
    inner.innerHTML = '';
    moviesArr.forEach(element => {
        let movieID = element[0];
        let movieTitle = element[1];
        let movieYear = element[2];
        let movieType = element[3];
        let moviePoster = element[4];
        inner.innerHTML += `
        <div class="backDiv">
            <section class="leftS">
                <img src="${moviePoster}" class="size">
                <button type="button" class="btnAdd btn btn-primary btnSecondFetch" data-toggle="modal" data-target="#${movieID}" onclick="secondFetch(${movieID})">+</button>
            </section>
            <section class="rigthS">
                <h5>${movieTitle}</h5>
                <hr>
                <h6>Year: </h6> ${movieYear}
                <h6>Type: </h6> ${movieType}  
            </section>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="${movieID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">${movieTitle}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body innerModal">
              </div>
            </div>
          </div>
        </div>`
    });
};



const moreData = (data) => {
    let innerModal = document.getElementsByClassName('innerModal');
    innerModal.innerHTML = '';
    console.log(data);
    let modalActors = data.Actors;
    let modalYear = data.Year;
    let modalRated = data.Rated;
    let modalCountry = data.Country;
    let modalGenre = data.Genre;
    let modalPlot = data.Plot;
    let modalPoster = data.Poster;
    let modalRating = data.imdbRating;
    for (i = 0; i < innerModal.length; i++){
        console.log(innerModal[i])
        innerModal[i].innerHTML = `<img src="${modalPoster}">
        <p><span>Actors: </span>${modalActors}</p>
        `;
    }
}


