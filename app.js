const base = 'https://api.lyrics.ovh/suggest';

const inputButton = document.getElementById('inputButton');

function lyricsUI(name){
    fetch ( `${base}/${name}` )
    .then ( (response) => response.json() )
    .then( (data) => {
        let dataArray = data.data;
        let lyricsOutput =document.getElementById('lyricsOutput');
        console.log(dataArray);
        lyricsOutput.innerHTML = '';
            for (let i = 0; i<5; i++) {
                let title = dataArray[i].title;
                let artist = dataArray[i].artist.name;
                let p = document.createElement('p')
                p.innerHTML = `<div class="search-result col-md-8 mx-auto py-4">
                                    <div class="single-result row align-items-center my-3 p-3">
                                        <div class="col-md-9">
                                            <h3 class="lyrics-name">${title}</h3>
                                            <p class="author lead">Album by <span>${artist}</span></p>
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <button class="btn btn-success getLyric" id="getLyric" dataArtist='${artist}' dataTitle='${title}' onclick=lyricDetail(artist, title)>Get Lyrics</button>
                                        </div>
                                    </div>
                                </div>`
                lyricsOutput.appendChild(p);
                button.onclick = lyricDetail(`${artist}`, `${title}`);
                
            }
            
    })
}

function button(id){
    console.log(id);
}

inputButton.onclick =  function(){
    let textInput = document.getElementById('textInput').value;
    lyricsUI(textInput);
    console.log(textInput);
    document.getElementById('textInput').value = '';
}

const lyricDetail = function(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        console.log('song', data);
        let outputLyrics = document.getElementById('outputLyrics');
        if(!data.lyrics){
            outputLyrics.innerText = 'No Lyrics Found';
        }
        else{
            outputLyrics.innerHTML = data.lyrics;
        }
    })
}