import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

export default function FormRestaurante() {

    const parametros = useParams()

    useEffect(() => {
        if(parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [ nomeRestaurante, setNomeRestaurante ] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso")
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso")
                })
        }
    }

    return (
        <>
            <Container maxWidth='lg' sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1}}>
                    <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                    <Box sx={{ marginTop: 1, width: '100%'}}  component="form" onSubmit={aoSubmeterForm}>
                        <TextField 
                            value={nomeRestaurante} 
                            onChange={ evento => setNomeRestaurante(evento.target.value) } id="standard-basic" 
                            label="Nome do restaurante" 
                            variant="standard" 
                            fullWidth
                            required
                        />
                        <Button
                            sx={{ marginTop: 1}} 
                            type="submit" 
                            variant="outlined"
                            fullWidth
                        >
                            Enviar
                        </Button>
                    </Box>
                </Box>    
            </Container>
        </>
    )
}