import { useEffect, useState } from "react"
import { getPokemons, makeRequest, searchPokemon } from "../../../services/PokemonService"
import PokemonCard from "../create/PokemonCard"
import PokemonProfile from "../create/PokemonProfile";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";

export default function PokemonList(){
    const [pokemons, setPokemons] = useState([])
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(1);
    const [limit, setLimit] = useState(9);
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");

    const [pokemonSelected, setPokemonSelected] = useState({})
    const [isActive, setIsActive] = useState(false)


    const fetchPokemons = async (offset) => {
        try {
            const data = await getPokemons(offset)
            setPokemons(prev => [...(Array.isArray(prev) ? prev : []), ...(data?.results || [])]);
            setNext(data?.next)
            setPrev(data?.previous)
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setLimit(9)
        setOffset(0)
        setPokemons([])
        fetchPokemons(0);
    },[])

    const handleOnClick = () => {
        setOffset((prevOffset) => {
            const newOffset = prevOffset + 1;
            fetchPokemons(limit * newOffset);
            return newOffset;
        });
    };

    const handlePagination = async (pagination) => {
        if(pagination === "next" && next !== null){
            const data = await makeRequest(next);
            setPokemons(data?.results);
            setNext(data?.next)
            setPrev(data?.previous)
            setOffset(offset + 1)
        }
        if(pagination === "prev" && prev !== null){
            const data = await makeRequest(prev);
            setPokemons(data?.results);
            setNext(data?.next)
            setPrev(data?.previous)
            setOffset(offset - 1)
        }
    };

    const Fetching = async () => {
        try {
            if(search !== ""){
                const data = await searchPokemon(search)
                if(data === null) {
                    setError(true)
                }
                setPokemons(data?.results);
                setNext(data?.next)
                setPrev(data?.previous)
                setError(true)
            }
            else{
                setError(false)
                setPokemons([])
                setOffset(0)
                fetchPokemons(0);
            }
        } catch (error) {
            setError(true)
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("Searching for:", search);
        const timer = setTimeout(() => {
            Fetching();
        }, 500); // Debounce time of 500ms

        return () => clearTimeout(timer); // Cleanup the timer on component unmount or before next effect
        
    }, [search]);

    return (
        <>
            {error ? 
            <>
                <TextField id="search" sx={{width: "30%", margin:"20px"}} variant="outlined" label="Search Pokemon" type="search" onChange={(event)=> setSearch(event.target.value)}/>
                <Box sx={{ width: '100%', maxWidth: 500, justifyContent: 'center', margin: 'auto' }}>
                    <Typography variant="h2" sx={{ textAlign: 'center', marginTop: 2 }}>404 Pokémon not found</Typography>
                </Box> 
            </>
            : 
            <>
                {isActive ? 
                    <>
                        <PokemonProfile setIsActive={setIsActive} name={pokemonSelected} />
                    </>
                    :
                    <>
                        <TextField id="search" sx={{width: "30%", margin:"20px"}} variant="outlined" label="Search Pokemon" type="search" onChange={(event)=> setSearch(event.target.value)}/>
                        <Grid container spacing={2}  size={{xs:12, sm:6, md:4, lg:3}} sx={{ justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                            <Button variant="contained" sx={{background: "#ef5350"}} onClick={() => handlePagination("prev")} disabled={prev === null} >Prev</Button>
                            <Button variant="contained" sx={{background: "#ef5350"}} onClick={() => handlePagination("next")}>Next</Button>
                        </Grid>
                        <Grid container spacing={2} sx={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            {pokemons?.map( (pokemon, index)=> ( 
                                <Grid size={{xs:12, sm:6, md:4, lg:3}} key={`${pokemon.name} - ${index}`}>
                                    <PokemonCard setIsActive={setIsActive} name={pokemon.name} setPokemonSelected={setPokemonSelected}/>
                                </Grid>
                            ))
                            }
                        </Grid>
                        {
                        next &&
                            <Grid container size={{xs:12, sm:6, md:4, lg:3}} sx={{ justifyContent: 'center', marginTop: 2, marginBottom: 2 }}>
                                <Button variant="contained" sx={{background: "#ef5350"}} onClick={handleOnClick}>Load More</Button>
                            </Grid>
                        }
                    </>
                }
            </>
            }
        </>
    )
}