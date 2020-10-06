const base = 'https://api.lyrics.ovh/suggest';

const inputButton = document.getElementById('inputButton');

function lyricsUI(name){
    fetch ( `${base}/${name}` )
    .then ( (response) => response.json() )
    .then( (data) => {
        let dataArray = data.data;
        let lyricsOutput =document.getElementById('lyricsOutputButton');
        console.log(dataArray);
        lyricsOutput.innerHTML = '';
            for (let i = 0; i<10; i++) {
                let title = dataArray[i].title;
                let albumName = dataArray[i].album.title
                let artist = dataArray[i].artist.name;
                let id = dataArray[i].id;
                let artistPhoto = dataArray[i].artist.picture_small;
                let preview = dataArray[i].preview;
                let p = document.createElement('p')
                p.innerHTML = `<div class="search-result col-md-8 mx-auto py-4">
                                    <div class="single-result row align-items-center my-3 p-3">
                                        <div class="col-md-9">
                                            <div class="row">
                                                <div class="col-md-9">
                                                    <h5 class="title-name">Song: ${title}</h5>
                                                    <h5 class="album-name">Album Name: ${albumName}</h5>
                                                    <p class="author lead">Artist: <span>${artist}</span></p>
                                                </div>
                                                <div class="col-md-2 p-2">
                                                    <img src="${artistPhoto}" alt="" id="artist-image"/>
                                                </div>
                                            </div>
                                        <audio id="myAudio" src="${preview}" controls></audio>
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <button class="btn btn-success lyricButton" id='${id}' onclick="lyricDetail('${artist}', '${title}')">Get Lyrics</button>
                                        </div>
                                    </div>
                                </div>`
                lyricsOutput.appendChild(p);
                
            }
            
    })
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
        console.log('lyrics', data.lyrics);
        console.log('loverGuru', `${artist}`,`${title}`);
        let outputLyrics = document.getElementById('outputLyrics');
        outputLyrics.innerText = '';

        let p = document.createElement("p");
        if(`${data.lyrics}` == ''){
            p.innerHTML= `<div class="single-lyrics text-center">
                            <h2 class="text-success mb-4">No Lyrics Found</h2>
                        </div>`
            outputLyrics.appendChild(p);
        }
        else{
            p.innerHTML = `<div class="single-lyrics text-center">
                            <h2 class="text-success mb-4">${title}</h2>
                            <h5 class="text-success mb-4">${artist}</h5>
                            <pre class="lyric text-white">${data.lyrics}</pre>
                        </div>`
            outputLyrics.appendChild(p);
        }            
        
    })
}
