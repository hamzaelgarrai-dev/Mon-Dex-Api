// =============================================================
// data.js — les créatures de VOTRE univers
// =============================================================
// TODO : remplissez ce tableau avec au moins 12 créatures
// (Pokémon, Digimon ou Yu-Gi-Oh!), en respectant ce format :
//
// {
//   id: "#001",                                   // "#" suivi de 3 chiffres
//   name: "Exemple",                              // texte
//   type: "Feu",                                  // une valeur d'une liste fixe
//   level: "Base",                                // texte
//   stats: { hp: 45, attack: 49, defence: 49 },   // 3 nombres de 0 à 999
//   image: "https://example.com/001.png",         // lien https vers une image
//   description: "Une courte description."        // 10 à 200 caractères
// }
//
// Pensez à citer la source de vos images dans le README.

export const getData = async (offset) => {

    const cacheKey = `cards_${offset}`;

    
    const cachedCards = sessionStorage.getItem(cacheKey);

    if (cachedCards) {
        console.log("Cards loaded from cache");
        return JSON.parse(cachedCards);
    }

  
    const response = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${offset}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch cards");
    }

    const data = await response.json();

    sessionStorage.setItem(cacheKey, JSON.stringify(data.data));

    return data.data;
};

// search in the api function

export const searchCards = async (value) =>{

  const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${(value)}`)

   const data = await res.json();

    if (res.status === 400 && data.error) {
        return [];
    }

    if (!res.ok) {
        throw new Error("API request failed");
    }

    return data.data;

}