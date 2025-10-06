import "./styles/Header.css"
import pokemon_logo from "../assets/Pokémon_logo.svg.png"

export default function Header(){
    return(
        <>
            <div className="header">
                <img src={pokemon_logo} alt="Logo" className="pokeapi_logo" />
            </div>
        </>
    )
}