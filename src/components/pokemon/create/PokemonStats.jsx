import { useEffect, useState } from "react"
import { Grid, Card, CardContent, TableHead, Typography, Table, TableRow, TableCell, TableBody } from "@mui/material";


export default function PokemonStats({pokemon}){
    const [error, setError] = useState(false);
    const {id, name, stats} = pokemon

    return (
        <Card key={id} sx={{ width: '100%', margin: 2, padding: 2}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={12} >
                        {stats ?
                            <Table sx={{ width: "100%" }}>
                                <TableHead>
                                    <TableRow>
                                        {stats?.map(({stat}) => (
                                            <TableCell key={stat.name} align="center" sx={{textTransform: "capitalize"}}>{stat.name}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {stats?.map(({stat, base_stat}) => (
                                            <TableCell key={stat.name} align="center">{base_stat}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        :
                            <Typography variant="body2" component="div">No stats available</Typography>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}