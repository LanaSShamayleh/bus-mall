'use strict';

let productsArray = [];
let leftImageElement = document.getElementById('leftImageElement');
let rightImageElement = document.getElementById('rightImageElement');
let middleImageElement = document.getElementById('middleImageElement');
let leftImageIndex;
let rightImageIndex;
let middleImageIndex;
let maxAttempts=25;
let userAttemptsCounter=0;
let button=document.createElement('button');
let resultsDiv = document.getElementsByClassName('resultsColumn')[0];
let resultsList = document.createElement('ul');

// Creating a constructor function that creates an object associated with each product.

function Products(name, source) {
  this.name = name;
  this.source = source;
  this.occurrence = 0;
  this.votes=0;
  productsArray.push(this);
}

new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('usb', 'img/usb.gif');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

// Creating an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.


function generateRandomIndex() {
  return Math.floor(Math.random() * productsArray.length);
}

function renderThreeImages() {

  leftImageIndex = generateRandomIndex();
  do {
    middleImageIndex = generateRandomIndex();
  } while (middleImageIndex === leftImageIndex);
  do {
    rightImageIndex = generateRandomIndex();
  } while (rightImageIndex === leftImageIndex || rightImageIndex === middleImageIndex);

  leftImageElement.src = productsArray[leftImageIndex].source;
  productsArray[leftImageIndex].occurrence++;

  middleImageElement.src = productsArray[middleImageIndex].source;
  productsArray[middleImageIndex].occurrence++;

  rightImageElement.src = productsArray[rightImageIndex].source;
  productsArray[rightImageIndex].occurrence++;
}

renderThreeImages();

// Attaching an event listener to the section of the HTML page where the images are going to be displayed:

leftImageElement.addEventListener('click',handleUserClick);
rightImageElement.addEventListener('click',handleUserClick);

function viewResults(event) {
  console.log(event.target.value);
  resultsDiv.appendChild(resultsList);
  let listItem;
  for (let i = 0; i < productsArray.length; i++) {
    listItem = document.createElement('li');
    listItem.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes, and was seen ${productsArray[i].occurrence} times.`;
    resultsList.appendChild(listItem);
  }
}


function handleUserClick(event){
  userAttemptsCounter++;
  if (userAttemptsCounter<=maxAttempts) {
    if (event.target.id === 'leftImageElement') {
      productsArray[leftImageIndex].votes++;
    } else if (event.target.id === 'middleImageElement') {
      productsArray[middleImageIndex].votes++;
    }
    else {
      productsArray[rightImageIndex].votes++;
    }
    renderThreeImages();
  } else {
    resultsDiv.appendChild(button);
    button.textContent = 'View Results';
    button.addEventListener('click', viewResults);
    leftImageElement.removeEventListener('click', handleUserClick);
    middleImageElement.removeEventListener('click', handleUserClick);
    rightImageElement.removeEventListener('click', handleUserClick);
  }
}
