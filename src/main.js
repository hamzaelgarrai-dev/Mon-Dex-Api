
//getting data from data.js 

import { searchCards} from './services/api.js'

import { cards, allCards, hideLoading, initFormValidation, loadCardByType, loadCardDetails, loadCards, loadType, showCards, showLoading, showMessage, hideMessage , checkFormValid, GlobalEventListner , debounce} from './ui.js';

import { getFavCards , saveToFav } from './storage.js';

// create new card

const form = document.getElementById("creature-form");

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
       
        form.reset();
        
    }
    

})





// Search in api 
const searchField = document.getElementById("search");

searchField.addEventListener("input", debounce(async () => {
    const searchValue = searchField.value.trim();

    if (searchValue === "") {
      hideMessage();
      cards.length = 0;
      cards.push(...allCards);
      showCards(cards);
      return;
    }
    hideMessage();
    showLoading();
    try {
      const results = await searchCards(searchValue);

      if (results.length === 0) {
        cards = [];
        showCards(cards);
        showMessage("No cards found. Try another name.");
        return;
      }

      cards.length = 0;
      cards.push(...results);
      showCards(cards);
    } catch (error) {
      console.log(error);

      if (error instanceof TypeError) {
        showMessage("Network error! Please check your internet connection.");
      } else {
        showMessage("Something went wrong. Please try again.");
      }
    } finally {
      hideLoading();
    }
  }),
  400,);






const teamgrid = document.getElementById("team-grid")
const detailSection = document.getElementById("detail");
const cardContainer = document.getElementById("grid")

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


const loadMoreBtn = document.getElementById("loadMoreBtn")
loadMoreBtn.addEventListener("click", async () => {
    await loadCards();
    showCards(cards);
});


// handle favorites

const toggleFavorite = (id) => {
    let favorites = getFavCards("favorites");

    if (favorites.includes(String(id))) {
        favorites = favorites.filter(favId => favId !== String(id));
    } else {
        favorites.push(String(id));
    }

    saveToFav("favorites", favorites);

    showCards(cards);
};




GlobalEventListner("click", ".favorite-btn", (e) => {

    const id = e.target.dataset.id;

    console.log("Card ID:", id);

    toggleFavorite(id);
});

const main = async () => {

 showLoading();

    try {

        await loadCards();
        let customCards = JSON.parse(localStorage.getItem("customCards")) || [];

       if (customCards) {
         cards.push(...customCards);
         allCards.push(...customCards);
       }

        initFormValidation()
        allCards.push(cards)
        showCards(cards);
        loadType();
        loadCardByType();
        loadCardDetails();

    } catch (error) {
        console.log(error);

        if (error instanceof TypeError) {
            showMessage("Network error! Please check your internet connection.");
        } else {
            showMessage("Something went wrong. Please try again.");
        }

    } finally {
        hideLoading();
    }


  

  
};

main();