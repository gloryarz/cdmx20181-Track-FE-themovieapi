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

const gettingMovies = (search) => {
    for(numbers in search){
        let movies = search[numbers];
        let movieTitle = movies.Title;
        console.log(movies);
    }
}