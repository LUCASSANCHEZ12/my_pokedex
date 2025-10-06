import { useEffect, useState } from "react"
import { getPokemonInfo, makeRequest } from "../../../services/PokemonService"
import { Container, Grid, Card, CardContent, CardMedia, Box, Button, CardHeader, Typography } from "@mui/material";

const API_IMAGE_URL = import.meta.env.VITE_GIT_API_URL;

export default function PokemonInfo({pokemon}){
    const [error, setError] = useState(false);
    const {id, name, height, weight, sprites, types, species, abilities, stats} = pokemon


    if (error) {
        return (
            <>
                <div>Pokemon {name} does not exist</div>
            </>
        )
    }

    return (
        <Card key={id} sx={{ width: '100%', textAlign: 'center' }}>
            <CardContent>
                
                <Grid 
                    container 
                    spacing={2}
                    sx={{textTransform: 'capitalize'}}
                >
                    <Grid size={{xs:12, sm:6}}>
                        <Typography variant="subtittle2" component="div">Height:</Typography>
                        <Typography variant="body2" component="div">{height/10}m</Typography>
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <Typography variant="subtittle2" component="div">Weight:</Typography>
                        <Typography variant="body2" component="div">{weight/10}kg</Typography>
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <Typography variant="subtittle2" component="div">Abilities:</Typography>
                        <Typography variant="body2" component="div">{abilities?.map(({ability}) => {
                            return <Typography key={ability.name} variant="body2" component="div">{ability.name} </Typography>
                        })}</Typography>
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <Typography variant="subtittle2" component="div">Types:</Typography>
                        <Typography variant="body2" component="div">{types?.map(({type}) => {
                            return <Typography key={type.name} variant="body2" component="div">{type.name} </Typography>
                        })}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}