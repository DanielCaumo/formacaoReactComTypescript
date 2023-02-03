import { atom } from "recoil";
import { IFiltroDeEventos } from "../interfaces/FiltroDeEventos";
import { IEvento } from "../interfaces/IEvento";
import { eventosAsync } from "./seletores";


export const listaDeEventosState = atom<IEvento[]>({
    key: 'listaDeEventosState',
    default: eventosAsync
})

export const filtroDeEventosState = atom<IFiltroDeEventos>({
    key: 'filtroDeEventos',
    default: {}
})