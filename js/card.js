const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json")
const pets = await petPromise.json();

const template = document.querySelector("#animal-card");
const wrapper = document.createElement("div");

function decideAgeText(age){
    if(!age){
        return "Less than a year old"
    }
    return age > 1 ? `${age} years old`: "1 year old"
}

pets.forEach(pet => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name

    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name}`

    const age = new Date().getFullYear() - pet.birthYear
    const ageText = decideAgeText(age)
    clone.querySelector(".age").textContent = ageText

    clone.querySelector(".species").textContent = pet.species
    clone.querySelector(".name").textContent = pet.name
    clone.querySelector(".description").textContent = pet.description
    clone.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`

    wrapper.appendChild(clone);
});

document.querySelector(".animals").appendChild(wrapper)

// Fliter
const fliterButton = document.querySelectorAll(".fliter-nav a")
fliterButton.forEach(el => {
    el.addEventListener("click", e => handleFliterClick(e))
} )

function handleFliterClick(e){
    let target = e.target

    if(e.target.classList.contains("only-large-screen")){
        target = e.target.closest("a")
    }

    e.preventDefault()

    fliterButton.forEach(el => {
        el.classList.remove("active")
    })
    target.classList.add("active")

    fliterPets(target.dataset.fliter)
}

function fliterPets(species){
const allPets = document.querySelectorAll(".animal-card")
    if(species == "all"){
        allPets.forEach(el => {
            el.style.display = ""
        })
    }else{
        allPets.forEach(el => {
            if(el.querySelector(".species").textContent == species){
                el.style.display = ""
            }else{
                el.style.display = "none"
            }
        })
        
    }
}