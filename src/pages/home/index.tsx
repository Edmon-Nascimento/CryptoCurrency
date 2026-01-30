import styles from  './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export function Home(){
    return(
        <main className={styles.container}> 
            <form action="" className={styles.form}>
                <input type="text" placeholder='Digite o nome da moeda... Ex: Bitcoin' />
                <button type="submit"><BsSearch size={30} color='#FFF'/></button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Variação 24h</th>
                    </tr>

                    <tbody id='tbody'>
                        <tr className={styles.tr}>
                            <td className={styles.tdLabel} data-label="Moeda">
                                <div className={styles.nome}>
                                    <Link to={"/detail/bitcoin"}>
                                        <span>Bitcoin</span> | BTC
                                    </Link>
                                </div>
                            </td>

                            <td className={styles.tdLabel} data-label="Valor mercado">
                                1T
                            </td>

                            <td className={styles.tdLabel} data-label="Preço">
                                1T
                            </td>

                            <td className={styles.tdLabel} data-label="Volume">
                                1T
                            </td>

                            <td className={styles.tdLabel} data-label="Variação 24h">
                                1T
                            </td>
                        </tr>
                    </tbody>
                </thead>
            </table>
        </main>
    )
}
