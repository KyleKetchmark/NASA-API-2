let baseUrl = 'https://api.nasa.gov/planetary/apod?'
let apiKey = 'cI8Qfwuk3mwfRbgjudoTvMoC1BhlU5aQBUEUaXmq';
let url;
//variables
const searchForm = document.querySelector('search-form');
const searchBtn = document.getElementById('submit');
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const imageWrapper = document.getElementById('image');


//event listeners
searchBtn.addEventListener('click', fetchApi);


//Fetch Fx
async function fetchApi(e) {
    // e.preventDefault(e);
    // let earthDate = String(date.value);
    url = `${baseUrl}api_key=${apiKey}`
    
    let result = await fetch(url);
    let json = await result.json();
    displayContent(json);
}

fetchApi();

//Display content fx
function displayContent(json) {
    console.log("Nasa Data:", json);
    
    let titleResults = json.title;
    let sumResults = json.explanation;
    let imgResults = json.hdurl;
    
    
    let titleElement = document.createElement('h2');
    titleElement.innerHTML = titleResults;

    let paraElement = document.createElement('p');
    paraElement.innerText = sumResults;

    let newImgElement = document.createElement('img');
    newImgElement.src = imgResults;
    // newImgElem2.class = "d-block w-100"

    title.appendChild(titleElement);
    summary.appendChild(paraElement);
    imageWrapper.appendChild(newImgElement);
    

}
