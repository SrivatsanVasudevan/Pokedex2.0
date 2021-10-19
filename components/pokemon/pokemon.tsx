import React, { ReactElement, useState, useEffect } from 'react';
import axios, {AxiosResponse} from 'axios';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const kantoUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

interface PokeType{
    data: {
        results: {
            name: string,
            url: string
        }[]
    }   
}

interface PokeSprites{
    data: {
        sprites:{
            front_default: string;
        }
    }
}

type PokeResult = PokeType;
type Sprites = PokeSprites;
const Pokemon = ()  => {
    const [pokemonList, setPokemonList] = useState<string[]>([]);
    const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
    const [kantoImages, setKantoImages] = useState<string[]>([]);
    
    const getKantoPokemon = async () : Promise<void> => {
        try{
            const res : PokeResult  = await axios.get(kantoUrl);
            setPokemonList(res.data.results.map((pokemon)=>{
                return pokemon.name;
            }))
            setPokemonUrls(res.data.results.map((pokemon)=>{
                return `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
            }))
           
        }
        catch(err){
            console.error(err);
        }
       }

    const getImages = async() : Promise<void> => {
        try{
            const tempArray = [];
            for(let url of pokemonUrls){
                const res : Sprites = await axios.get(url);
                tempArray.push(res.data.sprites.front_default);
            }
            setKantoImages(tempArray);
        }
        catch(err){
            console.error(err);
        }
    }
    
    useEffect(() => {
       getKantoPokemon()
    },[]);

    useEffect(() => {
        getImages()
    })
    return (
        <>
        <div> 
            {pokemonList.map((pokemon,idx)=>{
               return( 
                <>
                <span>
                    <img style = {{height: 190, width: 190}}  src = {kantoImages[idx]} alt = '' />
                </span>
                
                    
                </>
                )
           })}
        </div>
           
        </>
    )
}




export default Pokemon;