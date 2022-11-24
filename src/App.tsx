import { Header } from './components/Header'
import { NewTask } from './components/NewTask'

import './styles/global.css'

import styles from './App.module.css'

function App() {
  return (
    <div>
      <Header />

      <main className={styles.mainContainer}>
        <NewTask />
      </main>
    </div>
  )
}

export default App
