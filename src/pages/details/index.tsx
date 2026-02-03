import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCoinById } from "../../services/api/api"
import type { CoinProps } from "../../services/types/types"

export function Detail(){

    const apiKey='23d633f9b6aa4fe39d7860ef14e794243a2a3a3da015f8862052eb632ce81a1f'

    const {cripto} = useParams()
    const [coin, setCoin] = useState<CoinProps>()

    const price = Intl.NumberFormat("en-US",{style:"currency", currency:"USD"})
    const priceCompact = Intl.NumberFormat("en-US",{style:"currency", currency:"USD", notation:"compact"})

    useEffect(()=>{
        async function loadCoin(){
            const result = await getCoinById(cripto, apiKey)

            setCoin(result)
        }
        loadCoin()
    },[])

    return(
        <div>
            <h1>Detalhes {cripto}</h1>

        </div>
    )
}
