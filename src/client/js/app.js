const moment = require('moment');

let generateButton, imgElement, tripStart, tripEnd, tripDuration, cityName, weatherString;


function setElements(document) {
    generateButton = document.getElementById('generate');
    cityName = document.getElementById('cityName');
    tripStart = document.getElementById('tripStart');
    tripEnd = document.getElementById('tripEnd');
    tripDuration = document.getElementById('tripDuration');
    imgElement = document.getElementById('imgId');
    weatherString = document.getElementById('weatherString');

    generateButton.addEventListener('click', cbGenerateButton);
}

function cbGenerateButton(event) {
    // setImg();
    // const data = {
    //     "city": "Pichilemu",
    //     "daysAhead": 3,
    //     "keywords": "Corvette"
    // };
    const [year, month, day] = tripStart.value.split('-');
    const time = moment([year, month - 1, day]).fromNow().split(' ');
    let daysAhead = 0;
    if (['day', 'days'].includes(time[2])) daysAhead = time[1] == 'a' ? 1 : Number(time[1]);
    const duration = tripEnd.value.split('-')[2] - tripStart.value.split('-')[2];
    if (duration > 0) tripDuration.innerHTML = `Trip duration (days): ${duration}`;
    const city = cityName.value;
    if (city.length < 3) return;
    const data = {daysAhead, city}
    postRequest(data)

}

function postRequest(data) {
    fetch('http://localhost:8080/input', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(json => {
            postCb(json);
        })
        .catch((error) => console.log(error));
}

function postCb(json) {
    setImg(json.imgURL);
    weatherString.innerHTML = json.weatherString;
}

function setImg(url = 'https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_150.jpg') {
    const newImg = new Image;
    newImg.onload = function () {
        imgElement.src = this.src;
    }
    newImg.src = url;
}


export {
    setElements
}


// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
