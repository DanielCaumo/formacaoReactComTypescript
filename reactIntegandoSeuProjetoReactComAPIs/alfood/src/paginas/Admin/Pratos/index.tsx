import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";



export default function AdminPratos() {

    const [ pratos, setPratos ] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratoExcluido: IPrato) => {
        http.delete(`pratos/${pratoExcluido.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== pratoExcluido.id)
                setPratos([...listaPratos])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Restaurante
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Deletar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => 
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">Foto</a>
                            </TableCell>
                            <TableCell>
                                {prato.restaurante}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button
                                    color="error" 
                                    variant="outlined"
                                    onClick={() => excluir(prato)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}