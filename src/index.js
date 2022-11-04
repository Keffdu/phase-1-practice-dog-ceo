console.log('%c HI', 'color: firebrick')
let breeds = []

function loadImages() {
    const imageUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imageUrl, )
    .then(resp => resp.json())
    .then(result => {
        result.message.forEach(image => {
            //add image
            addImage(image)
        });
    })
}

function addImage(dogPicUrl) {
    const container = document.querySelector('#dog-image-container')
    const newImage = document.createElement('img')
    newImage.src = dogPicUrl
    container.appendChild(newImage)
}

function updateColor(event) {
    event.target.style.color = 'teal'
}

function addBreed(breed){
    const ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.textContent = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
    li.addEventListener("click", updateColor)
}

function removeChildren(element) {
    let child = element.lastElementChild
    while(child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}

function updateBreedList(breeds) {
    const ul = document.querySelector('#dog-breeds')
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function addBreedSelectListener() {
   const breedDropDown =  document.querySelector('#breed-dropdown')
   breedDropDown.addEventListener("change", (e) => {
    updateBreedList(breeds.filter(breed => breed.startsWith(e.target.value)))
    })
}

function loadDogBreeds(breed) {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(result => {
        breeds = Object.keys(result.message)
        //add to the element
        updateBreedList(breeds)
        addBreedSelectListener()
    })
}

document.addEventListener("DOMContentLoaded", function() {
    //load image
    loadImages()
    //loads all dog breeds
    loadDogBreeds()
})