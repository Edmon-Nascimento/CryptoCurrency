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
  const navigate = useNavigate()

  const price = Intl.NumberFormat("en-US",{style:"currency", currency:"USD"})

  useEffect(()=>{
    async function loadCoins() {
      const result = await getData(100, 0, apiKey)
      setCoins(result)
    }

    loadCoins()
  },[])

  function handleSubmit(e:SubmitEvent){
    e.preventDefault()

    if(input === "")return

    navigate(`/detail/${input}`)
  }

  function handleGetMore(){
    
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

          <tr className={styles.tr}>

            <td className={styles.tdLabel} data-label="Moeda">
              <div className={styles.name}>
                <Link to={"/detail/bitcoin"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>

            <td className={styles.tdLabel} data-label="Valor mercado">
              1T
            </td>

            <td className={styles.tdLabel} data-label="Preço">
              8.000
            </td>

            <td className={styles.tdLabel} data-label="Volume">
              2B
            </td>

            <td className={styles.tdProfit} data-label="Variação 24h">
              <span>1.20</span>
            </td>

          </tr>

        </tbody>
      </table>

      <button className={styles.btnMore} onClick={handleGetMore}>Carregar mais</button>

    </main>
  )
}
