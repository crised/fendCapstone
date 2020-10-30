let generateButton;


function setElements(document){
  console.log('ich bin schon da');
  console.log(document);
  generateButton = document.getElementById('generate');
  generateButton.addEventListener('click', cbGenerateButton);
}

function cbGenerateButton(event){
  console.log(event);
  console.log(generateButton);

}


export{
  setElements
}



// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
