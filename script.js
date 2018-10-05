  function loadDataMusic(){
    $.ajax({
      url: `http://localhost:3000/deezer/top`,
      method: `get`
    })
    .done((response) => {

      let music = response
      let topArtist = music.artists.artist
      // console.log(topArtist)
      $('#musicCollection').text('')
      for(let i = 0; i < topArtist.length; i++){
        $('#musicCollection').append(`
        <div class="col-sm" id="boxMusic">
        <div class="card" style="width: 14rem;">
          <img class="card-img-top" src="${topArtist[i].image[2]['#text']}" alt="Card image cap">
          
          <div class="card-body">
            <h5 class="card-title">${topArtist[i].name}</h5>
            <p>Playcount : ${topArtist[i].playcount}</p>
            <button onclick="getArtistInfo('${topArtist[i].name}')" type="button" class="btn btn-primary" data-toggle="modal" data-target=".readMoreModal">View All Songs</button>
          </div>
        </div>
      </div>
        `)
      }
     
    })
    .fail((err) => {

    })

  }

  loadDataMusic()

  function getArtistInfo(artistName) {

    $.ajax({
      url: `http://localhost:3000/deezer/get-song/${artistName}`,
      method: `get`
    })
      .done((response) => {
        if(!response.error){
            console.log(response)
            let music = response
            let topArtist = music.artist
            // console.log(topArtist, 'ini getArtistInfo' + artistName)
    
            let tag = []
            topArtist.tags.tag.forEach(list => {
                tag.push(list.name)
            })
            console.log(tag)
            $('#detailMovie').text('')
    
            $('#detailMovie').append(`
            <div>
              <h1>${topArtist.name}</h1>
              <p style="text-align:justify;"> ${topArtist.bio.content} </p>
              <div>
              <span> Published : ${topArtist.bio.published} </span> 
              <span> Listerners :  ${topArtist.stats.listeners} </span><br />
              <span> Tags :  ${tag} </span><br />
              <button onclick="getsimilar('${topArtist.name}')" type="button" class="btn btn-secondary">Similar Enter-10</button>
              </div>
            </div>
            `)
        }
        else{
            $('#detailMovie').text('')
    
            $('#detailMovie').append(`
            <div>
              <h1>Sry, No Information for this Artist for now</h1>
            </div>
            `)
        }
      })
    .fail((err) => {

    })
  }

  function getsimilar(name){

    $.ajax({
    url: `http://localhost:3000/movies/similar`,
    method: `post`,
    data:{
        name:name
    }
      })
      .done((response) => {
        $('modal').modal('hide')
        let data=response.data.Similar.Results

            $('#musicCollection').text('')
            $('#musicCollection').html(`<br><h1>ENTER-10 LIKE ${name} : </h1><br><br>`).css("padding",50)
            for(let i = 0; i < data.length; i++){
              $('#musicCollection').append(`
              <br><br>
              <div class="col-sm" id="boxMovie">
              <div class="card" style="width: 30rem;">
                <iframe src=${data[i].yUrl}></iframe>
                <div class="card-body">
                  <h5 class="card-title">${data[i].Name}</h5>
                  <p>Entertainment Type : ${data[i].Type}</p>
                  <p align=justify>Description : ${data[i].wTeaser.slice(1,50)}</p>
                  <br>
                  <a href=${data[i].wUrl}>Link to Wikipedia</a>
                </div>
              </div>
            </div>
              `)
            }
  })
  .fail((err) => {})

}

//   $( "#myInput" ).keyup(function() {
//       alert( "Handler for .keyup() called." );
//     });
  function searchRepo(){
    $("#myInput").on("keyup", function() {
      var value = $("#myInput").val();
        if(value){
            $.ajax({
              url: `http://localhost:3000/deezer/search/${value}`,
              method: `get`
            })
            .done((response) => {
        
              let music = response
              let topArtist = music.data.results.artistmatches.artist
            //   console.log(topArtist)
              $('#musicCollection').text('')
              for(let i = 0; i < topArtist.length; i++){
                let img = './img/empty.jpeg'
                if(topArtist[i].image[2]['#text']){
                  img = topArtist[i].image[2]['#text']
                }
                else{
                  img = './img/empty.jpeg'
                }
                $('#musicCollection').append(`
                <div class="col-sm" id="boxMusic">
                <div class="card" style="width: 14rem;">
                  <img class="card-img-top" src="${img}" alt="Card image cap">
                  
                  <div class="card-body">
                    <h5 class="card-title">${topArtist[i].name}</h5>
                    <p>Listeners : ${topArtist[i].listeners}</p>
                    <button onclick="getArtistInfo('${topArtist[i].name}')" type="button" class="btn btn-primary" data-toggle="modal" data-target=".readMoreModal">View All Songs</button>
                  </div>
                </div>
              </div>
                `)
              }
             
            })
            .fail((err) => {
        
            })
        }
        else{
            loadDataMusic()
        }
    });
}

searchRepo()

  
