function loadDataMovie(){
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=967c05f63e07b1f325db0d1d608827dd&language=en-US&page=1`,
    method: `get`
  })
  .done((response) => {

    let movie = response.results
   
    $('#movieCollection').text('')
    for(let i = 0; i < movie.length; i++){
      $('#movieCollection').append(`
      <div class="col-sm" id="boxMovie">
      <div class="card" style="width: 14rem;">
        <img class="card-img-top" src="http://image.tmdb.org/t/p/w300${movie[i].poster_path}" alt="Card image cap">
        
        <div class="card-body">
          <h5 class="card-title">${movie[i].title}</h5>
          <p>Release date : </p>
          <p>${movie[i].release_date}</p>
          <button id="btnDetailMovie" onclick="getIdMovie('${movie[i].id}')" type="button" class="btn btn-primary" data-toggle="modal" data-target=".readMoreModal">Detail Movie</button>
        </div>
      </div>
    </div>
      `)
      activePage()
    }
  })
  .fail((err) => {})
}
loadDataMovie()

function getIdMovie(movieId) {

  $.ajax({
    url: `http://api.themoviedb.org/3/movie/${movieId}?api_key=967c05f63e07b1f325db0d1d608827dd&&language=en-US`,
    method: `get`
  })
  .done((movie) => {

    $.ajax({
    url: `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=967c05f63e07b1f325db0d1d608827dd&language=en-US`,
    method: `get`
    })
    .done((response) => {
      let video = response.results[0].key

      $('#detailMovie').text('')

      $('#detailMovie').append(`
      <div>
        <h1>${movie.title}</h1>
        <div>
            <iframe style="width:100% ;height: 500px;" src="https://www.youtube.com/embed/${video}"></iframe>
        </div>
        <p style="text-align:justify;" id="descMovie"> ${movie.overview} </p>
        <div>
        <p> Release date : ${movie.release_date} </p> 
        <p> Rating :  ${movie.vote_average} </p>
        <p> Durasi :  ${movie.runtime } Minutes</p>
        <div>
          Translate : 
          <button onclick="tranlateIndonesia('${movie.overview}')" type="button" class="btn btn-secondary">Indonesia</button>
          <button onclick="tranlateEnglish('${movie.overview}')" type="button" class="btn btn-secondary">English</button>
        <div>
        <button style="margin-top:20px;" type="button" class="btn btn-secondary">Similar Enter-10</button>
        </div>
      </div>
      `)
    })
    
  })
  .fail((err) => {

  })
}

function tranlateIndonesia (text) {
    $.ajax({
      url: `http://localhost:3000/movies/translate/in`,
      method: `post`,
      data : {
        text
      }
    })
    .done((response) => {
      $("#descMovie").text('')
      $("#descMovie").text(response.message.translatedText)
    })
    .fail((err) => {
      console.log(err)
    })  
  }

function tranlateEnglish (text) {
    $.ajax({
      url: `http://localhost:3000/movies/translate/en`,
      method: `post`,
      data : {
        text
      }
    })
    .done((response) => {
      $("#descMovie").text('')
      $("#descMovie").text(response.message.translatedText)
    })
    .fail((err) => {
      console.log(err)
    })  
  }

function searchByTitle () {
  let title = $("#inputTitle").val()
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=967c05f63e07b1f325db0d1d608827dd&query=${title}`,
    method: `get`
  })
  .done((response) => {
    let movie = response.results
   
    $('#movieCollection').text('')
    for(let i = 0; i < movie.length; i++){
      $('#movieCollection').append(`
      <div class="col-sm" id="boxMovie">
      <div class="card" style="width: 14rem;">
        <img class="card-img-top" src="http://image.tmdb.org/t/p/w300${movie[i].poster_path}" alt="Card image cap">
        
        <div class="card-body">
          <h5 class="card-title">${movie[i].title}</h5>
          <p>Release date : </p>
          <p>${movie[i].release_date}</p>
          <button onclick="getIdMovie('${movie[i].id}')" type="button" class="btn btn-primary" data-toggle="modal" data-target=".readMoreModal">Large modal</button>
        </div>
      </div>
    </div>
      `)
    }
  })
  .fail((err) => {})
}

$("#partMovie").click(function () {
  loadDataMovie()
})

var checkPoint = 0
$(".btnNext").click(function() {
  checkPoint += 1
  
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=967c05f63e07b1f325db0d1d608827dd&language=en-US&page=${checkPoint}`,
    method: `get`
  })
  .done((response) => {

    let movie = response.results
   
    $('#movieCollection').text('')
    for(let i = 0; i < movie.length; i++){
      $('#movieCollection').append(`
      <div class="col-sm" id="boxMovie">
      <div class="card" style="width: 14rem;">
        <img class="card-img-top" src="http://image.tmdb.org/t/p/w300${movie[i].poster_path}" alt="Card image cap">
        
        <div class="card-body">
          <h5 class="card-title">${movie[i].title}</h5>
          <p>Release date : </p>
          <p>${movie[i].release_date}</p>
          <button onclick="getIdMovie('${movie[i].id}')" type="button" class="btn btn-primary" data-toggle="modal" data-target=".readMoreModal">Large modal</button>
        </div>
      </div>
    </div>
      `)
    }
  })

})

$(".btnPrev").click(function() {
 
  if(checkPoint > 1){
    checkPoint -= 1
  } else if (checkPoint == 0) {
    checkPoint = 1
  }

  $.ajax({
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=967c05f63e07b1f325db0d1d608827dd&language=en-US&page=${checkPoint}`,
    method: `get`
  })
  .done((response) => {

    let movie = response.results
   
    $('#movieCollection').text('')
    for(let i = 0; i < movie.length; i++){
      $('#movieCollection').append(`
      <div class="col-sm" id="boxMovie">
      <div class="card" style="width: 14rem;">
        <img class="card-img-top" src="http://image.tmdb.org/t/p/w300${movie[i].poster_path}" alt="Card image cap">
        
        <div class="card-body">
          <h5 class="card-title">${movie[i].title}</h5>
          <p>Release date : </p>
          <p>${movie[i].release_date}</p>
          <button onclick="getIdMovie('${movie[i].id}')" type="button" class="btn btn-primary" data-toggle="modal" data-target=".readMoreModal">Large modal</button>
        </div>
      </div>
    </div>
      `)
    }
  })
  
})

function onSignIn(googleUser) {
  var profile = googleUser.Zi.id_token
  $.ajax({
    url: `http://localhost:3000/users/signinGoolge`,
    method: 'post',
    data: {
      token : profile
    }
  })
  .done((response) => {
    localStorage.setItem('name', response.name)
    localStorage.setItem('email', response.email)
    localStorage.setItem('token', response.token)
    activePage()
  })
  .fail((errors) => {
    console.log(errors.responseJSON.message)
  })

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    activePage()
  });
}

function activePage() {
  let token = localStorage.getItem('token')
    if(token) {
    $("#btnLogin").hide()
    $("#btnLogout").show()
    $("button#btnDetailMovie").show()
  } else {
    $("#btnLogin").show()
    $("#btnLogout").hide()
    $("button#btnDetailMovie").hide()
  }
}

activePage()

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

      $('#movieCollection').text('')
      $('#movieCollection').html(`<br><h1>ENTER-10 LIKE ${name} : </h1><br>`).css("padding",50)
      for(let i = 0; i < data.length; i++){
        $('#movieCollection').append(`
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