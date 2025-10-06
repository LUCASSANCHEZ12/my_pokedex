const API_URL = import.meta.env.VITE_API_URL;

export const getPokemons = async (offset) => {
  try {
    const response = await fetch(`${API_URL}/pokemon?limit=9&offset=${offset}`);
    if (!response.ok) throw new Error("error fetching data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const searchPokemon = async (search) => {
    try {
        const response = await fetch(`${API_URL}/pokemon?name=${search}`);
        if (!response.ok) throw new Error("error fetching data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getPokemonInfo = async (name) => {
    try {
        const response = await fetch(`${API_URL}/pokemon/${name}`);
        if (!response.ok) throw new Error("error fetching data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const makeRequest = async (request)=>{
    try {
        const response = await fetch(request);
        if (!response.ok) throw new Error("error fetching data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }   
}

export const getPokemonGender= async (search) => {
    try {
        const response = await fetch(`${API_URL}/gender/${search}`);
        if (!response.ok) throw new Error("error fetching data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}