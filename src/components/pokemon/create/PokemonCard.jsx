import { useEffect, useState } from "react"
import { getPokemonInfo } from "../../../services/PokemonService"
import { Box, Card, CardContent, CardMedia } from "@mui/material";

const API_IMAGE_URL = import.meta.env.VITE_GIT_API_URL;

export default function PokemonCard({name, setIsActive, setPokemonSelected}){
    const [info, setInfo] = useState({});
    const [error, setError] = useState(false);
    const {id} = info
    const [formatedId, setFormattedId] = useState("");

    const fetchingInfo = async () => {
        try {
            const data = await getPokemonInfo(name)
            if(data === null) {
                setError(true)
            }
            setInfo(data);
            setFormattedId(data.id.toString().padStart(4, '0'));
        } catch (error) {
            setError(true)
            console.error(error);
        }
    };

    useEffect(() => {
        fetchingInfo();
    }, [])

    const handleOnClick = () => {
        setPokemonSelected(name)
        setIsActive(true)
    }

    if (error) {
        return (
            <>
                <div>Pokemon {name} does not exist</div>
            </>
        )
    }

    const card_style = {
        cursor: "pointer",
        width: 250,
        height: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: "auto",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 4,
        },
    }
    return (
        <>
            <Card onClick={handleOnClick} key={id} sx={card_style}>
                <CardMedia
                    component="img"
                    image={`${API_IMAGE_URL}/${id}.svg`}
                    title={name}
                    sx={{width: 200, height: 200, objectFit: "contain",mt: 2}}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div> N°{formatedId} {name}</div>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}