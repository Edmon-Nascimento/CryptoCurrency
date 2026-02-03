import axios from "axios";
import type { DataProps, CoinResponse } from "../types/types";

const api = axios.create({
    baseURL:"https://rest.coincap.io/v3"
})

export async function getData(limit:number, offset:number, apiKey: string){
    const {data} = await api.get<DataProps>("/assets",{
        params: {limit, offset, apiKey}
    })

    const coinsData = data.data

    return coinsData

}

export async function getCoinById(id:string|undefined, apiKey:string){
    const {data} = await api.get<CoinResponse>(`/assets/${id}`,{
        params:{apiKey}
    })

    const coinsData = data.data

    return coinsData
}

