
//getting data from data.js 

import {getData} from './data.js'
let cards = [];





//Validation de Form

//regex value

const idRegex = /^#\d{3}$/;
const nameRegex = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/ ;
const statRegex = /^\d{1,3}$/ ;
const imageRegex = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i;
const descriptionRegex = /^[\s\S]{10,200}$/ ;


// getting input field 

// const form = document.getElementById('creature-form');
// const fields = document.querySelectorAll(".field");
const idInput = document.querySelector('[name = "id"]');
const nameInput = document.querySelector('[name = "name"]');
const typeInput = document.querySelector('[name = "type"]');
const levelInput = document.querySelector('[name = "level"]');
const stat1Input = document.querySelector('[name = "stat1"]');
const stat2Input = document.querySelector('[name = "stat2"]');
const stat3Input = document.querySelector('[name = "stat3"]');
const imageInput = document.querySelector('[name = "image"]');
const descriptionInput = document.querySelector('[name = "description"]');
const createCardBtn = document.getElementById("create-card");

// createCardBtn.disabled = true;



// form.addEventListener("input" , ()=>{

const form = document.getElementById("creature-form");
const fields = form.querySelectorAll(".field");

const checkFormValid = () => {
    let valid = true;

    fields.forEach((field) => {
        const value = field.value.trim();

        if (value === "") {
            valid = false;
        }
        else if (field === idInput && !idRegex.test(value)) {
            valid = false;
        }
        else if (field === nameInput && !nameRegex.test(value)) {
            valid = false;
        }
        else if (
            [stat1Input, stat2Input, stat3Input].includes(field) &&
            !statRegex.test(value)
        ) {
            valid = false;
        }
        else if (field === imageInput && !imageRegex.test(value)) {
            valid = false;
        }
        else if (
            field === descriptionInput &&
            !descriptionRegex.test(value)
        ) {
            valid = false;
        }
    });

    return valid;
};
    
    createCardBtn.disabled = true
    fields.forEach((field) => {
        field.addEventListener("input", () => {
            
            field.nextElementSibling.textContent = "";
            field.style.border = "";

            const value = field.value.trim();

            
            if (value === "") {
    
                return;
            }


            if(field === idInput && !idRegex.test(value)){

                field.nextElementSibling.textContent = "# suivi de 3 chiffres";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
            else if(field === nameInput && !nameRegex.test(value)) {
                field.nextElementSibling.textContent = "2 à 30 caractères";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
            else if(field === typeInput && typeInput.value == "") {
                field.nextElementSibling.textContent = "chose one type";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
             else if(field === levelInput && levelInput.value == "") {
                field.nextElementSibling.textContent = "this field can't be empty";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
                    
            }
            else if(field === stat1Input && !statRegex.test(value)){

                field.nextElementSibling.textContent = "Invalid Format";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
            else if(field === stat2Input && !statRegex.test(value)){
                field.nextElementSibling.textContent = "Invalid Format";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
            else if(field === stat3Input && !statRegex.test(value)){
                field.nextElementSibling.textContent = "Invalid Format";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
            else if(field === imageInput && !imageRegex.test(value)){
                field.nextElementSibling.textContent = "Invalid Format";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
            }
            else if(field === descriptionInput && !descriptionRegex.test(value)){
                field.nextElementSibling.textContent = "Invalid Format";
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
                
                
            }
            else {
                field.style.border = "1px solid green";
                field.nextElementSibling.textContent = "";
                
            
                
            }
            createCardBtn.disabled = !checkFormValid();
            
        });
    });
    
    const updateCreateButton = () => {
    const isValid = checkFormValid();

    createCardBtn.disabled = !isValid;

    console.log("Form valid:", isValid);
    console.log("Button disabled:", createCardBtn.disabled);
};

form.addEventListener("input", updateCreateButton);
form.addEventListener("change", updateCreateButton);












form.addEventListener("reset", () => {
    form.querySelectorAll(".field").forEach((field) => {
        field.style.removeProperty("border");
    });

    form.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
    });
});

// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.

// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------
const cardContainer = document.getElementById("grid")
const showCards = (cards) =>{
    cardContainer.innerHTML = "";

    cards.forEach((card)=>{
        const article = document.createElement("article");
        article.dataset.id = card.id;
        article.className = "article flex flex-col gap-3 rounded-card bg-[#171E29] border-[#31333A] border p-3 pb-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer"

        article.innerHTML = `
        
        <div class=" relative flex h-72 items-center justify-center rounded-xl ">

            <img class="absolute h-72 " src="${card.card_images[0].image_url}" alt="">
            
            
          </div>
          <div class="flex items-center  gap-2 h-10">
            <span class="rounded-full bg-[#253348] px-3 py-1  text-sm font-bold text-white">${card.type}</span>
          </div>
          <p class="text-sm text-[#9CA9BC]">Race · ${card.race}</p>
          <button type="button" class="AddtoCollection btn-outline bg-[#232d3d] border border-[#303947] text-white text-[15px] hover:bg-brand ">Add to my Collections</button>`

          cardContainer.appendChild(article);
    })

    

}

// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------

const loadCardDetails = () =>{

    const articles = document.querySelectorAll(".article");
    
    const detailSection = document.getElementById("detail");

    
    articles.forEach((article)=>{
    article.addEventListener("click", (e)=>{
        
        if (e.target.closest(".AddtoCollection")) {
            return;
        }
        

       let id =  article.getAttribute("data-id");

       cards.forEach((card)=>{
        if(card.id == id){
            detailSection.dataset.id = card.id;
            detailSection.innerHTML = `<div class="flex items-center justify-between ">
            <span class="font-mono text-sm text-[#9CA9BC]">${card.id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="closeBtn btn-outline w-11 px-0">✕</button>
          </div>
          <div class="flex h-64 items-center justify-center rounded-2xl border border-[#303947]">
            <img class="absolute h-56 " src="${card.card_images[0].image_url}" alt="">
          </div>
          <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold max-w-[240px] text-white">${card.name}</h2>
            <span class="rounded-full bg-[#253348] border border-[#303947] shrink-0 px-3 py-1 text-sm font-bold">${card.type}</span>
          </div>
          <p class="text-[#9CA9BC]">${card.desc}</p>
          <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold text-[#9CA9BC]">Level</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" " style="width: ${Math.min(((card.level ?? 0) / 12) * 100, 100)}%"></span></span><span class="text-right text-[#9CA9BC] font-mono">${card.level ?? "-"}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold text-[#9CA9BC]">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" " style="width: ${Math.min(((card.atk ?? 0) / 5000) * 100, 100)}%"></span></span><span class="text-right font-mono text-[#9CA9BC]">${card.atk ?? "-"}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold text-[#9CA9BC]">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" " style="width: ${Math.min(((card.def ?? 0) / 5000) * 100, 100)}%"></span></span><span class="text-right font-mono text-[#9CA9BC]">${card.def ?? "-"}</span></div>
          </div>
          <button type="button" class="btn-primary AddtoCollection">Add to My Collections</button>`
          const closeBtn = document.querySelector(".closeBtn");

          closeBtn.addEventListener("click" , ()=>{
            detailSection.innerHTML = `<div class="font-display text-2xl font-extrabold text-white">No Card Selected</div>`
          })
        }
       })

       if (teamgrid.children.length >= 6) {
        document.querySelectorAll(".AddtoCollection").forEach((btn) => {
            btn.disabled = true;
            btn.classList.add("opacity-40", "cursor-not-allowed");
            btn.textContent = "Collection is Full";
        });
    }
        
    } )
})
    

}



// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------

const searchField = document.getElementById("search");

searchField.addEventListener("input", (e) =>{

    

    const searchValue = e.target.value.toLowerCase();

    console.log("Searching:", searchValue);
  console.log("Cards:", cards);
    const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchValue)
    );

    console.log("Results:", filteredCards);
    showCards(filteredCards);



   
})

// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------

const filterContainer = document.getElementById("filters")

const loadType = () =>{

    const types = new Set();

    cards.forEach((card) => {
        types.add(card.type);
    });

    types.forEach((type)=>{
        const btn = document.createElement("button")
        btn.className = "type chip shrink-0 bg-[#253348] text-white border border-[#303947]"
        
        btn.textContent = type;

        filterContainer.appendChild(btn);
    })

}




const loadCardByType = () =>{

    const typesBtn = document.querySelectorAll(".type")
    typesBtn.forEach((typebtn) =>{

        typebtn.addEventListener("click" , (e)=>{
            cardContainer.innerHTML = "";
            typesBtn.forEach((btn) => {
            
            btn.classList.remove("bg-brand");
            btn.classList.add("bg-[#253348]");
        });

            const activeTypebtn = e.currentTarget;
            
            activeTypebtn.classList.remove("bg-[#253348]");
            activeTypebtn.classList.add("bg-brand");
            
    
            cards.forEach((card)=>{
                if(card.type == typebtn.textContent){


                    
                   const article = document.createElement("article");
                   article.dataset.id = card.id;
                   article.className = "article flex flex-col gap-3 rounded-card bg-[#171E29] border-[#31333A] border p-3 pb-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer"

                   article.innerHTML = `
        
                  <div class=" relative flex h-72 items-center justify-center rounded-xl ">

                  <img class="absolute h-72 " src="${card.card_images[0].image_url}" alt="">
            
            
                    </div>
                     <div class="flex items-center  gap-2 h-10">
                      <span class="rounded-full bg-[#253348] px-3 py-1  text-sm font-bold text-white">${card.type}</span>
                     </div>
                     <p class="text-sm text-muted">Race · ${card.race}</p>
                  <button type="button" class="btn-outline bg-[#232d3d] border border-[#303947] text-white text-[15px] hover:bg-brand AddtoCollection">Add to my Collections</button>`

                  

                    cardContainer.appendChild(article);
                    loadCardDetails()

                }else if(typebtn.textContent == "All"){
                    cardContainer.innerHTML = "";
                    showCards(cards);
                    loadCardDetails()
                   

                }
            })
        })

    })



}

// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------

form.addEventListener('submit'  , (e) =>{
    e.preventDefault();

    if(checkFormValid()){
        

        const id =  document.querySelector('[name = "id"]').value.trim();
        const name = document.querySelector('[name = "name"]').value.trim();
        const type = document.querySelector('[name = "type"]').value.trim();
        const level = document.querySelector('[name = "level"]').value.trim();
        const stat1 = document.querySelector('[name = "stat1"]').value.trim();
        const stat2 = document.querySelector('[name = "stat2"]').value.trim();
        // const stat3 = document.querySelector('[name = "stat3"]').value.trim();
        const image = document.querySelector('[name = "image"]').value.trim();
        const description = document.querySelector('[name = "description"]').value.trim();

        const newCard = {
            id: id,
            name: name,
            type: type,
            level: level,
            atk: stat1,
            def: stat2,
            race: "Custom",
            desc: description,
            card_images: [
                {
                    image_url: image
                }
            ]
        };

        let customCards = JSON.parse(localStorage.getItem("customCards")) || [];

        customCards.push(newCard);

        localStorage.setItem("customCards", JSON.stringify(customCards));

        cards.push(newCard);

        showCards(cards);
        loadCardDetails();
        
    }
    

})

// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


function GlobalEventListner(type, selector, callback,  parents = [document] ){

    parents.forEach((parent) => {
    parent.addEventListener(type, (e) => {
      if (e.target.matches(selector)) {
        callback(e);
      }
    });
  });

}
const teamgrid = document.getElementById("team-grid")
const detailSection = document.getElementById("detail");

GlobalEventListner("click" , ".AddtoCollection" , e =>{
    
     const selectedCardID = e.target.parentElement.getAttribute("data-id")

    const cardCount = document.getElementById("team-count");
     const alreadyAdded = teamgrid.querySelector(`[data-id="${selectedCardID}"]`);

     if (alreadyAdded) { 
        alert("card already exist in collection")
        return;
     }
    cards.forEach((card)=>{
                if(card.id == selectedCardID && teamgrid.children.length <= 6 ){
                    
                    
                    teamgrid.innerHTML += `<div class="team-card relative" data-id="${selectedCardID}">
                      <button type="button" aria-label="Remove card"
                     class="closeBtn absolute btn-outline bg-white/60 w-9 h-9 px-0 z-50 right-4 top-2">✕</button>

                     <img class="relative h-56 w-full object-contain"
                    src="${card.card_images[0].image_url}" alt="${card.name}">
                     </div>`
                     
                     cardCount.textContent = teamgrid.children.length
                }

                if (teamgrid.children.length >= 6) {
                   document.querySelectorAll(".AddtoCollection").forEach((btn) => {
                   btn.disabled = true;
                   btn.classList.add("opacity-40", "cursor-not-allowed");
                   btn.textContent = "Collection is Full"
                 });
                }


})
},[cardContainer , detailSection ])

GlobalEventListner("click", ".closeBtn", (e) => {
  
  const CollectionCard = e.target.closest(".team-card");

  console.log("clicked")

  if (CollectionCard) {
    CollectionCard.remove();
  }

  if (teamgrid.children.length < 6) {
    document.querySelectorAll(".AddtoCollection").forEach((btn) => {
        btn.textContent = "Add to my Collections"
      btn.disabled = false;
      btn.classList.remove("opacity-40", "cursor-not-allowed");
    });
  }
},[teamgrid]);

// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------


const main = async () => {

 cards = await getData();

    let customCards = JSON.parse(localStorage.getItem("customCards")) || [];

    cards = cards.concat(customCards);

    
  showCards(cards)
  loadType()
  loadCardByType()
  loadCardDetails()


  

  
};

main();