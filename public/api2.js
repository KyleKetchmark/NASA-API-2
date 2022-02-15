let baseUrl = 'https://api.nasa.gov/planetary/apod?'
let apiKey = 'cI8Qfwuk3mwfRbgjudoTvMoC1BhlU5aQBUEUaXmq';
let url;
//variables
const cardWrap = document.getElementById('card-wrapper');
const searchForm = document.querySelector('form');
const searchBtn = document.getElementById('submit');
const title = document.getElementById('title');
const summary = document.getElementById('summary');
const imageWrapper = document.getElementById('image');
const getDate = document.getElementById('get-date');
let switcher = false;
//event listeners
searchForm.addEventListener('submit', fetchApi);
searchBtn.addEventListener('click', viewer)

//Fetch Fx
async function fetchApi(e) {
    e.preventDefault();
    
    let date = getDate.value;
    console.log(date);
    url = `${baseUrl}api_key=${apiKey}&date=${date}`
    
    let result = await fetch(url);
    let json = await result.json();
    if(viewer) {
        displayContent(json);
    } else {
        null
    }
}


function viewer() {
    cardWrap.style.display = 'flex';
    cardWrap.style.flexDirection = 'column';
    cardWrap.style.alignItems = 'center';
    cardWrap.style.paddingTop = '10vh';
    cardWrap.style.height = '100%';
    cardWrap.style.width = '100%';
}

//Display content fx
function displayContent(json) {
    console.log("Nasa Data:", json);
    let newImgElement = document.createElement('img');
    let newVidElem = document.createElement('iframe');
    let newT = document.createElement('h5');
    let newAuth = document.createElement('p');
    let newP = document.createElement('p')

    while (imageWrapper.firstChild) {
        imageWrapper.removeChild(imageWrapper.firstChild);
    }
    while (title.firstChild) {
        title.removeChild(title.firstChild);
        // title.removeChild(newAuth.firstChild);
    }
    while (summary.firstChild) {        
        summary.removeChild(summary.firstChild);
    }
    // let card = document.createElement('div')
    //returned object API vars
    let titleResults = json.title;
    let sumResults = json.explanation;
    let imgResults = json.hdurl;
    let vidResults = json.url;
    let author = json.copyright;
    //img
    if(imgResults === undefined) {
        newVidElem.src = vidResults;
        newVidElem.type = 'video';
        imageWrapper.appendChild(newVidElem);
    } else {
        newImgElement.src = imgResults;
        imageWrapper.appendChild(newImgElement);
    }
    //title
    newT.innerText = titleResults;
    title.appendChild(newT);

    // author
    newAuth.id = 'author';
    //if no author display unknown
    if(author === undefined) {
        newAuth.innerText = `Created By Unknown`;    
    } else {
        newAuth.innerText = `Created By ${author}`;
    }
    title.appendChild(newAuth);

    //summary
    newP.innerText = sumResults;
    summary.appendChild(newP);    
}
