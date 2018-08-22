const inner = document.getElementById('inner');
const btnSearch = document.getElementById('btnSearch');
const userSearch = document.getElementById('userSearch');
// http://www.omdbapi.com/?apikey=58ac39cb&s=flash
const mainUrl = 'http://www.omdbapi.com/?apikey=58ac39cb&s=';
let userValue = 'flash';


/*
btnSearch.addEventListener('click', el => {
    userValue = userSearch.value;
    console.log(userValue);
    inner.innerHTML = userValue;
});
*/

let url = mainUrl + userValue;
console.log(url);

fetch(url)
.then(resp => resp.json())
.then(data => {
    for(key in data){
        let search = data[key];
        if (Array.isArray(search) === true){
            gettingMovies(search);
        }
    }
})

let moviesArr = [];

const gettingMovies = (search) => {
    for(numbers in search){
        let movies = search[numbers];
        let movieArr = [movies.imdbID, movies.Title, movies.Year, movies.Type, movies.Poster]
        moviesArr.push(movieArr);
    }
    print();
}



const print = () => {
    moviesArr.forEach(element => {
        console.log(element[1])
        let movieID = element[0];
        console.log(movieID)
        let movieTitle = element[1];
        let movieYear = element[2];
        let movieType = element[3];
        let moviePoster = element[4];
        inner.innerHTML += `
        <img src="${moviePoster}">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${movieID}">
          Ver más
        </button>
        
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
              <div class="modal-body">
              <img src="${moviePoster}">
              Año : ${movieYear}
              Tipo : ${movieType}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>`
    });
};
