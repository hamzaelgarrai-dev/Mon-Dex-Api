export const getFavCards = (key)=>{

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : []


}

export const saveToFav = (key, data) =>{

    localStorage.setItem(key,JSON.stringify(data))
}

export const removeFromFav = (key) =>{
    localStorage.removeItem(key)
}