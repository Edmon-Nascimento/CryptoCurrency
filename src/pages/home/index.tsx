import styles from './home.module.css'
import { BsSearch } from  'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { SubmitEvent } from 'react'
import { getData } from '../../services/api/api'
import type { CoinProps } from '../../services/types/types'

export function Home() {

  const apiKey ='23d633f9b6aa4fe39d7860ef14e794243a2a3a3da015f8862052eb632ce81a1f'

  const [input, setInput] = useState("")
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [offset, setOffset] = useState(0)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const price = Intl.NumberFormat("en-US",{style:"currency", currency:"USD"})
  const priceCompact = Intl.NumberFormat("en-US",{style:"currency", currency:"USD", notation:"compact"})

  useEffect(()=>{
    async function loadCoins() {
      const result = await getData(10, offset, apiKey)

      const listCoins = [...coins, ...result]
      setCoins(listCoins)
    }

    loadCoins()
    setLoading(false)
  },[offset])

  function handleSubmit(e:SubmitEvent){
    e.preventDefault()

    if(input === "")return

    navigate(`/detail/${input}`)
  }

  function handleGetMore(){
    if(offset === 0){
      setOffset(10)
      return
    }

    setOffset(offset+10)
  }

  if(loading){
    return(
      <div className={styles.container}>
        <p className={styles.loading}>Carregando moedas...</p>
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Digite o nome da moeda... EX bitcoin"
          onChange={(e)=>setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>


      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Variação 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">

        {coins.length > 0 && coins.map((coin)=>(
          <tr className={styles.tr} key={coin.id}>

            <td className={styles.tdLabel} data-label="Moeda">
              <div className={styles.name}>
                <img src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} alt={`Logo ${coin.name}`} className={styles.logo} />
                <Link to={`/detail/${coin.id}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </div>
            </td>

            <td className={styles.tdLabel} data-label="Valor mercado">
              {priceCompact.format(Number(coin.marketCapUsd))}
            </td>

            <td className={styles.tdLabel} data-label="Preço">
              {price.format(Number(coin.priceUsd))}
            </td>

            <td className={styles.tdLabel} data-label="Volume">
              {priceCompact.format(Number(coin.volumeUsd24Hr))}
            </td>

            <td className={Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Variação 24h">
              <span>{Number(coin.changePercent24Hr).toFixed(2)}%</span>
            </td>

          </tr>
        ))}

        </tbody>
      </table>

      <button className={styles.btnMore} onClick={handleGetMore}>Carregar mais</button>

    </main>
  )
}
