import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormPrato() {

    const [ nomePrato, setNomePrato ] = useState('')
    const [ descricaoPrato, setDescricaoPrato ] = useState('')
    const [ tag, setTag ] = useState('')
    const [ tags, setTags ] = useState<ITag[]>([])
    const [ restaurante, setRestaurante ] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [ imagem, setImagem ] = useState< File | null>(null)


    useEffect(() => {
        http.get<{ tags: ITag[]}>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    },[])
    
    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricaoPrato)

        formData.append('tag', tag)

        formData.append('restaurante', restaurante)

        if(imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(resposta => {
                setNomePrato('')
                setDescricaoPrato('')
                setDescricaoPrato('')
                setDescricaoPrato('')
                alert('prato cadastrado com sucesso')
            })
            .catch(erro => console.log(erro))
    }

    return (
        <>
            <Container maxWidth='lg' sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1}}>
                    <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
                    <Box sx={{ marginTop: 1, width: '100%'}}  component="form" onSubmit={aoSubmeterForm}>
                        <TextField 
                            value={nomePrato} 
                            onChange={ evento => setNomePrato(evento.target.value) } id="standard-basic" 
                            label="Nome do prato" 
                            variant="standard" 
                            fullWidth
                            required
                            margin="dense"
                        />
                        <TextField 
                            value={descricaoPrato} 
                            onChange={ evento => setDescricaoPrato(evento.target.value) } id="standard-basic" 
                            label="Descrição" 
                            variant="standard" 
                            fullWidth
                            required
                            margin="dense"
                        />
                        <FormControl margin="dense" fullWidth >
                            <InputLabel id="select-tag">Tag</InputLabel>
                            <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                                {tags.map(tag => 
                                    <MenuItem key={tag.id} value={tag.value}>
                                        {tag.value}
                                    </MenuItem>
                                )}
                            </Select> 
                        </FormControl> 
                        <FormControl margin="dense" fullWidth >
                            <InputLabel id="select-restaurante">Restaurante</InputLabel>
                            <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                    {restaurante.nome}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <input type="file" onChange={selecionarArquivo}/> 
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