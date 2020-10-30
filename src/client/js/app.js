let generateButton;
let imgElement;


function setElements(document) {
    generateButton = document.getElementById('generate');
    imgElement = document.getElementById('imgId');
    generateButton.addEventListener('click', cbGenerateButton);
}

function cbGenerateButton(event) {
    console.log(event);
    console.log(generateButton);
    setImg();
}

function setImg(url='https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_150.jpg') {
    const newImg = new Image;
    newImg.onload = function() {
        imgElement.src = this.src;
    }
    newImg.src = url;
}


export {
    setElements
}


// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
