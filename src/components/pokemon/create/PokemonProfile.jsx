import { useEffect, useState } from "react"
import { getPokemonInfo, makeRequest } from "../../../services/PokemonService"
import { Container, Grid, Card, CardContent, CardMedia, Box, Button, CardHeader, Typography } from "@mui/material";
import PokemonInfo from "./PokemonInfo";
import PokemonStats from "./PokemonStats";

const API_IMAGE_URL = import.meta.env.VITE_GIT_API_URL;

export default function PokemonProfile({name, setIsActive}){
    const [info, setInfo] = useState({});
    const [error, setError] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [formatedId, setFormattedId] = useState("");

    const [gender, setGender] = useState({})
    const {id, height, weight, sprites, types, species, abilities, stats} = info

    const fetchingInfo = async () => {
        try {
            setIsLoading(true)
            const data = await getPokemonInfo(name)
            if(data === null) {
                setError(true)
            }
            setInfo(data);
            setFormattedId(data.id.toString().padStart(4, '0'));
            setIsLoading(false);
        } catch (error) {
            setError(true)
            console.error(error)
        }
    };

    useEffect(() => {
        fetchingInfo();        
    }, [])

    const card_style = {
        width: 500,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: "auto",
    }

    return (
        <Container>
            <Grid container spacing={2} sx={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <Grid container alignItems={'center'} justifyContent='center' sx={{ width: '100%', padding:"20px" }} spacing={2}>
                    {loading ? <Box>Loading...</Box> :
                     ! info || error ? <Box>Pokemon not found</Box> 
                    :
                    <>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card key={id} sx={card_style}>
                                <CardMedia
                                    component="img"
                                    image={`${API_IMAGE_URL}/${id}.svg`}
                                    title={name}
                                    sx={{width: 400, height: 400, objectFit: "contain",mt: 2}}
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                        <Typography variant="title1">{`${name.toUpperCase()}  N.°${formatedId}`}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <PokemonInfo pokemon={info}/>
                        </Grid>
                        <Grid size={{xs:12, sm:6}}>
                            <PokemonStats pokemon={info}/>
                        </Grid>
                    </>
                    }
                </Grid>    
                <Button variant="contained" sx={{background: "#ef5350"}} onClick={() => setIsActive(false)}>Go Back To Pokedex</Button> 
            </Grid>
            
        </Container>
    )
}