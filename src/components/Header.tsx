import styles from './Header.module.css'

import appLogo from '../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={appLogo} alt="To.do app logo" />
    </header>
  )
}