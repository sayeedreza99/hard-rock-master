const userInput = document.querySelector(".form-control");
const serachButton = document.querySelector(".search-btn");
const searchResult = document.getElementById('searchResult');

serachButton.addEventListener('click', function () {
    if (userInput.value == "") {
        searchResult.innerText = "";
    }
    else if (userInput.value != "") {
        doS(userInput);
    }
    else {
        searchResult.innerText = "";
    }
})

function doS(userInput) {
    fetch(`https://api.lyrics.ovh/suggest/ ${userInput.value}/`)
        .then(res => res.json())
        .then(data =>
            doSomething(data)
        )
}

function doSomething(data) {

    searchResult.innerHTML = " ";
    for (let i = 0; i < 8; i++) {
        const element = data.data[i];
        const title = element.album.title;
        const artist = element.artist.name;
        // console.log(artist);
        const child = `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">Album by <span>${artist}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success">Get Lyrics</button>
        </div>
        </div>`

        searchResult.innerHTML += child;

    }

}