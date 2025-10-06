import { useState } from 'react'
import PokemonList from './components/pokemon/list/PokemonList'
import Header from './components/Header'
import { Container, CssBaseline } from '@mui/material'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{backgroundColor: "#eff1f0"}}>
      <CssBaseline />
      <Header/>
      <Container sx={{marginTop: 2, backgroundColor: "#f5f5f5", minHeight: "100vh"}}>
        <PokemonList/>
      </Container>
    </div>
  )
}
