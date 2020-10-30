let generateButton;
let imgElement;


function setElements(document) {
    generateButton = document.getElementById('generate');
    imgElement = document.getElementById('imgId');
    generateButton.addEventListener('click', cbGenerateButton);
}

function cbGenerateButton(event) {
    // setImg();
    const data = {
        "city": "Pichilemu",
        "daysAhead": 3,
        "keywords": "Corvette"
    };
    fetch('http://localhost:8080/input', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
        .catch((error) => console.log(error));
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
