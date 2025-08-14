const pets = {
    Dog: [
        { name: "Charlie - Golden Retriever", type: "Dog", age: 3, img: "Assets/Img/dogs/dog01.jpg" },
        { name: "Max - Labrador", type: "Dog", age: 2, img: "Assets/Img/dogs/dog02.jpg" },
        { name: "Rocky - Beagle", type: "Dog", age: 4, img: "Assets/Img/dogs/dog03.jpg" }
    ],
    Cat: [
        { name: "Milo - British Shorthair", type: "Cat", age: 2, img: "Assets/Img/cats/cat01.jpg" },
        { name: "Luna - Persian", type: "Cat", age: 3, img: "Assets/Img/cats/cat02.jpg" },
        { name: "Oliver - Siamese", type: "Cat", age: 1, img: "Assets/Img/cats/cat03.jpg" }
    ],
    Capybara: [
        { name: "Capo - Chill Capybara", type: "Capybara", age: 5, img: "Assets/Img/capybaras/capybara01.jpg" },
        { name: "Cappy - Lazy Capybara", type: "Capybara", age: 4, img: "Assets/Img/capybaras/capybara02.jpg" }
    ],
    Bird: [
        { name: "Sky - Parrot", type: "Bird", age: 1, img: "Assets/Img/birds/bird01.jpg" },
        { name: "Kiwi - Cockatiel", type: "Bird", age: 2, img: "Assets/Img/birds/bird02.jpg" }
    ]
};


function filterPets() {
    const checkboxes = document.querySelectorAll('input[name="pet-type"]:checked');
    const selectedTypes = Array.from(checkboxes).map(cb => cb.value);

    const petListDiv = document.querySelector(".pet-list");
    petListDiv.innerHTML = ""; // Clear current list

    selectedTypes.forEach(type => {
        if (pets[type]) {
            pets[type].forEach(pet => {
                const petDiv = document.createElement("div");
                petDiv.className = "pet";

                petDiv.innerHTML = `
                    <img src="${pet.img}" alt="${pet.name}">
                    <p><strong>${pet.name}</strong></p>
                    <p>Type: ${pet.type}</p>
                    <p>Age: ${pet.age} year(s) old</p>
                    <button onclick="adoptPet()">Adopt Now</button>
                `;


                petListDiv.appendChild(petDiv);
            });
        }
    });
}

function adoptPet() {
    alert("Thanks for adopting!");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('input[name="pet-type"]').forEach(cb => {
        cb.addEventListener("change", filterPets);
    });

    filterPets(); // Initial load
});
