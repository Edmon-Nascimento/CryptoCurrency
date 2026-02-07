import styles from './details.module.css'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCoinById } from "../../services/api/api"
import type { CoinProps } from "../../services/types/types"

export function Detail(){

    const apiKey='23d633f9b6aa4fe39d7860ef14e794243a2a3a3da015f8862052eb632ce81a1f'

    const {cripto} = useParams()
    const navigate = useNavigate()
    const[loading, setLoading] = useState(true)
    const [coin, setCoin] = useState<CoinProps | null>(null)

    const price = Intl.NumberFormat("en-US",{style:"currency", currency:"USD"})
    const priceCompact = Intl.NumberFormat("en-US",{style:"currency", currency:"USD", notation:"compact"})

    useEffect(()=>{
        async function loadCoin(){

            if(!cripto){
              navigate("/")
              return
            }

            try{
              setLoading(true)
              const result = await getCoinById(cripto, apiKey)
              setCoin(result)
            } catch(err){
              navigate("/")
            }finally{
              setLoading(false)
            }
        }
        loadCoin()
    },[cripto, navigate])

    if(loading){
        return(
        <div className={styles.container}>
            <p className={styles.loading}>Carregando detalhes da moeda...</p>
        </div>
        )
    }

    if (!coin){
      navigate("*")
      return
    };

return (
  <div className={styles.container}>
    <h1>{coin.name}</h1>
    <h1>{coin.symbol}</h1>

    <section className={styles.content}>
      <img
        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
        alt={`Logo ${coin.name}`}
      />

      <p data-label="Moeda:">
        <strong>
          {coin.name} | {coin.symbol}
        </strong>
      </p>

      <p data-label="Preço:">
        <strong>{price.format(Number(coin.priceUsd))}</strong>
      </p>

      <p data-label="Valor de mercado:">
        <strong>{priceCompact.format(Number(coin.marketCapUsd))}</strong>
      </p>

      <p data-label="Volume:">
        <strong>{priceCompact.format(Number(coin.volumeUsd24Hr))}</strong>
      </p>

      <p data-label="Variação 24h:" className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss}>
        {Number(coin.changePercent24Hr).toFixed(2)}%
      </p>
    </section>
  </div>
)

}
