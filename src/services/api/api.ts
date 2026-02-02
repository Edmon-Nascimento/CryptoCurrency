import axios from "axios";
import type { DataProp } from "../types/types";

const api = axios.create({
    baseURL:"https://rest.coincap.io/v3"
})

export async function getData(limit:number, offset:number, apiKey: string){
    const {data} = await api.get<DataProp>("/assets",{
        params: {limit, offset, apiKey}
    })

    const coinsData = data.data

    return coinsData

}