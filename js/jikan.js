$(document).ready(function(){
    // console.log('teststststststst')
    alert('halo halo halo')
    showArchive()
    
    $('#list').text('testtttttttttt')
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
            $('#listAnime').append(`
            <div class="mybox" onclick="showAnime(${data.anime[i].mal_id})">
            <h5>${data.anime[i].title}</h5>
            <img src="${data.anime[i].image_url}" width="150px">
            </div>
            `)
            
        }
    })
    .fail(err=>{
        $('#listAnime').text('ERROR')
    })  
}

function showAnime(id){
    $('#showAnime').empty()

    $.ajax({
        url: `http://localhost:3000/jikan/anime/${id}`,
        method: 'GET'
    })
     .done(data=>{
        console.log(data)
        $('#showAnime').empty()
        $('#showAnime').append(`
        <h1>${data.title}<h1>
        <h2>${data.title_japanese}</h2>
        <iframe width="420" height="315"
        src="${data.trailer_url}">
        </iframe>
        <p><b>Score :</b> ${data.score}</p>
        <p><b>Rating :</b> ${data.rating}</p>
        <p>${data.synopsis}</p>
        `)
    })
    .fail(err=>{
        $('#showAnime').text('ERROR')
    })
}

/*
duration: "24 min per ep",
rating: "R - 17+ (violence & profanity)",
score: 8.81,
scored_by: 385971,
rank: 27,
popularity: 38,
members: 752025,
favorites: 41395,
synopsis:
*/


