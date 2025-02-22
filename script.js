const APIURL = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_res = document.getElementById("search_res");
const total_records = document.getElementById("total_records");

const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeBtn = document.getElementById('closeBtn');
        const submitBtn = document.getElementById('submitBtn');

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    if (respData.results.length == 0) {
        search_res.innerHTML = "No Results Founds";
        total_records.innerHTML = '';
    }else{
        total_records.innerHTML = "Total Records "+respData.total_results
    }
    
    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie, index) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        if (movie.poster_path != null) {
            poster_path = IMGPATH + movie.poster_path;
        } else {
            poster_path = 'https://www.peakndt.com/wp-content/uploads/2017/02/No_picture_available.png';
        }

        movieEl.innerHTML = `
            <img
                src="${poster_path}"
                alt="${movie.title}"
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRate(
                    movie.vote_average
        )}">${movie.vote_average}</span>
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = searchTerm;
        search_res.innerHTML = "Search Result for "+searchTerm;
    } else {
        getMovies(APIURL);
    }

});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle the mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Highlight active link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navLinks.classList.remove('show'); // Close menu on selection
    });
});




// login pages

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Close modal
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Handle login (just logging the entered credentials)
submitBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Just log the username and password without any validation
    console.log(`Username: ${username}, Password: ${password}`);
    
    // Optionally, you can close the modal after submission
    loginModal.style.display = 'none';
});