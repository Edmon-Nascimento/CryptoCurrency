import styles from "./notfound.module.css"
import { Link } from "react-router-dom"
import { FiHome } from "react-icons/fi"

export function NotFound() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <span className={styles.badge}>Erro 404</span>

        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.subtitle}>
          O endereço que você tentou acessar não existe ou foi movido.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.btn}>
            <FiHome size={18} />
            Voltar para Home
          </Link>
        </div>
      </section>
    </main>
  )
}
