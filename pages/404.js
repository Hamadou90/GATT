import React from 'react';
import styles from "../styles/404.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
        <main className={styles.main}>

            <h1>Désolé,</h1> 
        <h2>Page Introuvable !!!</h2>
        </main>
    </div>
  )
}

export default NotFound;