$(document).ready(function(){
    // console.log('teststststststst')
    showArchive()

    $("#searchanime").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".polaroid").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        console.log(value)
    });
})


function showArchive() {
    $.ajax({
        url: `http://localhost:3000/jikan`,
        method: 'GET'
    })
     .done(data=>{
        $('#list').empty()

        
        // console.log(data.archive[0].year)
        // $('#list').text(data.archive[0].year)

        let yearD = data.archive
        
        for(let i = 1 ; i < yearD.length ; i ++){
            // console.log(yearD[i].seasons)
            let current = yearD[i].seasons
            $(`#list`).append(`
            <option value='${yearD[i].year}'>${yearD[i].year}</option>
            `)
            if(yearD[i].year === 1990){
                break;
            }
        }
        
        $('#listSeason').append(`
        <option value="spring">Spring</option>
        <option value="summer">Summer</option>
        <option value="winter">Winter</option>
        <option value="fall">Fall</option>
        `)
        // <ul><div class="mybox" onclick="showSeason(${yearD[i].year})"><center>${yearD[i].year}</center></div></ul>
            // repos.forEach(list => {
            //     $(`#list`).append(`
            //         <h3><div class="mybox" onclick="showDesc('${list.name}','${list.owner.avatar_url}','${list.owner.login}','${list.description}','${list.stargazers_count}')">${list.name}</div></h3>
            //     `)
            // })   
    })
    .fail(err=>{
        $('#list').text('ERROR')
    })  
}

function search(){
    let year = $('#list').val()
    let season = $('#listSeason').val()
    // console.log('ini tahun nya',a)
    // console.log('ini season nya',b)

    $.ajax({
        url: `http://localhost:3000/jikan/${year}/${season}`,
        method: 'GET'
    })
     .done(data=>{
        // console.log(data.anime[0])
        // $('#listAnime').text(data.anime[0])
        $('#listAnime').empty()

        for(let i = 0 ; i < data.anime.length ; i ++){
            // console.log(data.anime[i])
            // console.log(data.anime[i])
            if(data.anime[i].score > 7){

                $('#listAnime').append(`
                <div class="polaroid" onclick="showAnime(${data.anime[i].mal_id})">
                  <img src="${data.anime[i].image_url}" alt="5 Terre" style="width:100%">
                  <div class="container">
                    <p>${data.anime[i].title}</p>
                  </div>
                </div>
                
                `)
            }
    
        }
    })
    .fail(err=>{
        $('#listAnime').text('ERROR')
    })  
}



// $('#listAnime').append(`
//                 <div class="mybox" onclick="showAnime(${data.anime[i].mal_id})">
//                 <h5>${data.anime[i].title}</h5>
//                 <img src="${data.anime[i].image_url}" width="150px">
//                 </div>
//                 `)


// $('#listAnime').append(`
//                 <div class="gallery" onclick="showAnime(${data.anime[i].mal_id})">
//                 <a>
//                 <img src="${data.anime[i].image_url}" width="300" height="200">
//                 </a>
//                 <div class="desc">${data.anime[i].title}</div>
//                 </div>
//                 `)


function showAnime(id){
    console.log('masuk ke show anime')
    $('#showAnime').empty()

    $.ajax({
        url: `http://localhost:3000/jikan/anime/${id}`,
        method: 'GET'
    })
     .done(data=>{
        console.log(data)
        $('#showAnime').empty()
        $('#showAnime').append(`
        <center>
        <h1>${data.title}<h1>
        <h2>${data.title_japanese}</h2>
        <iframe width="420" height="315"
        src="${data.trailer_url}">
        </iframe>
        <p><b>Score :</b> ${data.score}</p>
        <p><b>Rating :</b> ${data.rating}</p>
        <p>${data.synopsis}</p>
        </center>
        `)
    })
    .fail(err=>{
        $('#showAnime').text('ERROR')
    })
}

/*
<div class="gallery">
  <a target="_blank" href="forest.jpg">
    <img src="forest.jpg" alt="Forest" width="300" height="200">
  </a>
  <div class="desc">Add a description of the image here</div>
</div>
*/


