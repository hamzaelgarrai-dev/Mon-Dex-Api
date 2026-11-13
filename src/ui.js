// ui.js

import { getData } from "./services/api.js";
import { getFavCards } from "./storage.js";
export let cards = [];
export let allCards = [];


//form validation
const idRegex = /^#\d{3}$/;
const nameRegex = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/;
const statRegex = /^\d{1,3}$/;
const imageRegex = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i;
const descriptionRegex = /^[\s\S]{10,200}$/;


const form = document.getElementById("creature-form");
const fields = form.querySelectorAll(".field");

const idInput = form.querySelector('[name="id"]');
const nameInput = form.querySelector('[name="name"]');
const typeInput = form.querySelector('[name="type"]');
const levelInput = form.querySelector('[name="level"]');
const stat1Input = form.querySelector('[name="stat1"]');
const stat2Input = form.querySelector('[name="stat2"]');
const stat3Input = form.querySelector('[name="stat3"]');
const imageInput = form.querySelector('[name="image"]');
const descriptionInput = form.querySelector('[name="description"]');

const createCardBtn = document.getElementById("create-card");

// 3. Check if the form is valid
export const checkFormValid = () => {
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

// 4. Initialize form validation
export const initFormValidation = () => {

    createCardBtn.disabled = true;

    fields.forEach((field) => {
        field.addEventListener("input", () => {

            field.nextElementSibling.textContent = "";
            field.style.border = "";

            const value = field.value.trim();

            if (value === "") {
                return;
            }

            if (field === idInput && !idRegex.test(value)) {
                field.nextElementSibling.textContent = "# suivi de 3 chiffres";
            }
            else if (field === nameInput && !nameRegex.test(value)) {
                field.nextElementSibling.textContent = "2 à 30 caractères";
            }
            else if (field === typeInput && typeInput.value === "") {
                field.nextElementSibling.textContent = "chose one type";
            }
            else if (field === levelInput && levelInput.value === "") {
                field.nextElementSibling.textContent = "this field can't be empty";
            }
            else if (
                [stat1Input, stat2Input, stat3Input].includes(field) &&
                !statRegex.test(value)
            ) {
                field.nextElementSibling.textContent = "Invalid Format";
            }
            else if (field === imageInput && !imageRegex.test(value)) {
                field.nextElementSibling.textContent = "Invalid Format";
            }
            else if (field === descriptionInput && !descriptionRegex.test(value)) {
                field.nextElementSibling.textContent = "Invalid Format";
            }
            else {
                field.style.border = "1px solid green";
                field.nextElementSibling.textContent = "";
            }

            // Show error styling
            if (field.nextElementSibling.textContent !== "") {
                field.nextElementSibling.style.color = "red";
                field.style.border = "1px solid red";
            }

            createCardBtn.disabled = !checkFormValid();
        });
    });

    // Update create button
    const updateCreateButton = () => {
        createCardBtn.disabled = !checkFormValid();
    };

    // Form events
    form.addEventListener("input", updateCreateButton);
    form.addEventListener("change", updateCreateButton);

    form.addEventListener("reset", () => {
        fields.forEach((field) => {
            field.style.removeProperty("border");
            field.nextElementSibling.textContent = "";
        });

        createCardBtn.disabled = true;
    });
};





// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------
const cardContainer = document.getElementById("grid")

export const showCards = (cards) =>{
    cardContainer.innerHTML = "";

    const favorites = getFavCards("favorites") || [];
    cards.forEach((card)=>{
        
        
        const isFavorite = favorites.includes(String(card.id));

        const article = document.createElement("article");
        article.dataset.id = card.id;
        article.className = "article flex flex-col gap-3 rounded-card bg-[#171E29] border-[#31333A] border p-3 pb-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer"

        article.innerHTML = `
        
        <div class=" relative flex h-72 items-center justify-center rounded-xl ">

            <img class="absolute h-72 " src="${card.card_images?.[0]?.image_url || ''}" alt="">
            
            
          </div>
          <div class="flex items-center justify-between  w-full gap-2 h-10">
            <span class="rounded-full bg-[#253348] px-3 py-1  text-sm font-bold text-white">${card.type}</span>
            
            <svg class="favorite-btn pr-2" data-id="${card.id}" fill="${isFavorite ?  '#FF5E00' : '#545B68'}" height="35px" width="35px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 455 455" xml:space="preserve" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92 C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769 l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714 C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029 c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368 c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771 c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"></path> </g></svg>
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


export const loadCardDetails = () => {

    const cardContainer = document.querySelector("#grid");
    const detailSection = document.getElementById("detail");
    const teamgrid = document.getElementById("team");

    cardContainer.addEventListener("click", (e) => {

        const article = e.target.closest(".article");

        if (!article) return;

        if (e.target.closest(".AddtoCollection")) {
            return;
        }
        if (e.target.closest(".favorite-btn")){
            return;
        } 

        const id = article.getAttribute("data-id");

        const card = cards.find(card => card.id == id);

        if (!card) return;

        detailSection.dataset.id = card.id;

        detailSection.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-mono text-sm text-[#9CA9BC]">
                    ${card.id} · Détail
                </span>
                <button type="button" aria-label="Fermer le détail"
                    class="closeBtn btn-outline w-11 px-0">✕</button>
            </div>

            <div class="flex h-64 items-center justify-center rounded-2xl border border-[#303947]">
                <img class="absolute h-56"
                    src="${card.card_images[0].image_url}" alt="">
            </div>

            <div class="flex items-center justify-between">
                <h2 class="font-display text-3xl font-extrabold max-w-[240px] text-white">
                    ${card.name}
                </h2>
                <span class="rounded-full bg-[#253348] border border-[#303947] shrink-0 px-3 py-1 text-sm font-bold">
                    ${card.type}
                </span>
            </div>

            <p class="text-[#9CA9BC]">${card.desc}</p>

            <div class="flex flex-col gap-2 text-sm">

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold text-[#9CA9BC]">Level</span>
                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full bg-brand"
                            style="width: ${Math.min(((card.level ?? 0) / 12) * 100, 100)}%">
                        </span>
                    </span>
                    <span class="text-right text-[#9CA9BC] font-mono">
                        ${card.level ?? "-"}
                    </span>
                </div>

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold text-[#9CA9BC]">Attaque</span>
                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full bg-brand"
                            style="width: ${Math.min(((card.atk ?? 0) / 5000) * 100, 100)}%">
                        </span>
                    </span>
                    <span class="text-right font-mono text-[#9CA9BC]">
                        ${card.atk ?? "-"}
                    </span>
                </div>

                <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2">
                    <span class="font-bold text-[#9CA9BC]">Défense</span>
                    <span class="h-3 rounded-full bg-ground">
                        <span class="block h-3 rounded-full bg-brand"
                            style="width: ${Math.min(((card.def ?? 0) / 5000) * 100, 100)}%">
                        </span>
                    </span>
                    <span class="text-right font-mono text-[#9CA9BC]">
                        ${card.def ?? "-"}
                    </span>
                </div>

            </div>

            <button type="button" class="btn-primary AddtoCollection">
                Add to My Collections
            </button>
        `;

        const closeBtn = detailSection.querySelector(".closeBtn");

        closeBtn.addEventListener("click", () => {
            detailSection.innerHTML = `
                <div class="font-display text-2xl font-extrabold text-white">
                    No Card Selected
                </div>
            `;
        });

        if (teamgrid.children.length >= 6) {
            document.querySelectorAll(".AddtoCollection").forEach((btn) => {
                btn.disabled = true;
                btn.classList.add("opacity-40", "cursor-not-allowed");
                btn.textContent = "Collection is Full";
            });
        }

    });
};



// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------

const filterContainer = document.getElementById("filters")

export const loadType = () =>{

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

     const favBtn = document.createElement("button");
    favBtn.className = "type chip bg-[#253348] text-white";
    favBtn.textContent = "Favorites";
    filterContainer.appendChild(favBtn);

}




export const loadCardByType = () => {
    const typesBtn = document.querySelectorAll(".type");

    typesBtn.forEach(typebtn => {
        typebtn.addEventListener("click", e => {

            typesBtn.forEach(btn => {
                btn.classList.remove("bg-brand");
                btn.classList.add("bg-[#253348]");
            });

            const activeTypebtn = e.currentTarget;

            activeTypebtn.classList.remove("bg-[#253348]");
            activeTypebtn.classList.add("bg-brand");

            let filteredCards = [];

            if (typebtn.textContent === "All") {
                filteredCards = cards;

            } else if (typebtn.textContent === "Favorites") {
                const favorites = getFavCards("favorites") || [];

                filteredCards = cards.filter(card =>
                    favorites.includes(String(card.id))
                );

            } else {
                filteredCards = cards.filter(card =>
                    card.type === typebtn.textContent
                );
            }

            showCards(filteredCards);
        });
    });
};


// Global event listner helper

export function GlobalEventListner(type, selector, callback,  parents = [document] ){

    parents.forEach((parent) => {
    parent.addEventListener(type, (e) => {
      if (e.target.matches(selector)) {
        callback(e);
      }
    });
  });

}



// --------------------------------------------------------------
// Brief 1 sprint 3
// --------------------------------------------------------------


// loading indicator
const loader = document.querySelector("#loader");


export const showLoading = () => {
    loader.classList.remove("hidden");
    loader.classList.add("flex");
    cardContainer.classList.remove("grid");
    cardContainer.classList.add("hidden");
    
};

export const hideLoading = () => {
    loader.classList.remove("flex");
    loader.classList.add("hidden");
    cardContainer.classList.remove("hidden");
    cardContainer.classList.add("grid");
};


// load function 

let offset = 20;
const limit = 20;

export const loadCards = async () => {
    loadMoreBtn.disabled = true;

    try {
        const newCards = await getData(offset);

        allCards.push(...newCards);
        cards.push(...newCards);

        offset += limit;

    } catch (error) {
        console.log(error);
    } finally {
        loadMoreBtn.disabled = false;
    }
};


// error message

const message = document.getElementById("message");

export const showMessage = (text) =>{

    message.textContent = text;
    message.classList.remove("hidden")

}

export const hideMessage = () =>{

    message.textContent = "";
    message.classList.add("hidden")

}





// // debouncing

export const debounce = (callback, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};