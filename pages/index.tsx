import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Pokemon from '../components/pokemon/pokemon';

const Home: NextPage = () => {
  return (
    <div className = {styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Learn more about your favorite Pokemon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 style = {{textAlign: 'center'}}> Pokedex: Gotta catch-em all! </h2>
      <div>  <Pokemon /> </div>
    </div>
  )
}

export default Home
