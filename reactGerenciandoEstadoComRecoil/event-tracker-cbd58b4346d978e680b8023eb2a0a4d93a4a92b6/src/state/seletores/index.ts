import { selector } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { filtroDeEventosState, listaDeEventosState } from "../atom";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState ',
    get: ({ get }) => {
        const filtro = get(filtroDeEventosState)
        const todosOsEventos = get(listaDeEventosState)
        const eventos = todosOsEventos.filter(evento => {
            if(!filtro.data){
              return true
            }
            const eMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10)
            return eMesmoDia
        })
        return eventos
    }
})

export const eventosAsync = selector({
    key: "eventosAsync",
    get: async () => {
        const respostaHttp = await fetch('http://localhost:8080/eventos')
        const eventosJson: IEvento[] = await respostaHttp.json()
        return eventosJson.map(evento => ({
            ...evento,
            inicio: new Date(evento.inicio),
            fim: new Date(evento.fim)
        }))
    }
})