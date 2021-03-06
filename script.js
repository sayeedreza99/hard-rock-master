const userInput = document.querySelector(".form-control");
const serachButton = document.querySelector(".search-btn");
const searchResult = document.querySelector('#searchResult');
const lyricsSection = document.querySelector('.single-lyrics');

serachButton.addEventListener('click', function () {
    if (userInput.value == "") {
        searchResult.innerText = "";
        lyricsSection.innerText = "";
        alert('nothing to search')
    }
    else {
        doS(userInput);
    }
})

function doS(userInput) {
    fetch(`https://api.lyrics.ovh/suggest/ ${userInput.value}/`)
        .then(res => res.json())
        .then(data => {
            doSomething(data);
            data = data.slice(0, 10);
        }
        )
}

function doSomething(data) {
    searchResult.innerHTML = " ";
    for (let i = 0; i < 8; i++) {
        const element = data.data[i];
        const title = element.title;
        const artist = element.artist.name;
        const image = element.artist.picture_small;
        const albumTitle = element.album.title;
        const child = `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-8">
            <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">Album by <span>${artist}</span></p>
            <p class="author lead">Album Title :  <span id="artistName">${albumTitle}</span></p>
        </div>
        <div class="col-md-1">
                <img src="${image}" alt="">
            </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="lyricsSearch('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        </div>`

        searchResult.innerHTML += child;
    }
}

function lyricsSearch(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}/`)
        .then(response => response.json())
        .then(data => showLyrics(data, title))
}

function showLyrics(data, title) {
    if (data.lyrics == undefined) {
        alert('Lyrics not found');
        lyricsSection.innerText =

            ".....................NO LYRICS AVAILABLE............";
    } else {
        lyricsSection.innerHTML =
            `<h2 class="text-success mb-4">Title - ${title}</h2>
            <pre class="text-white">${data.lyrics}</pre>`;
    }
}