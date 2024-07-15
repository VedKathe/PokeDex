"use client"
import { useEffect, useState } from "react";
import Modal from "../Modal"
import styles from "./card.module.css"
export default function Card({ ...props }) {

  const typeColors = [
    { type: "normal", color: "#ddcbd0" },
    { type: "fighting", color: "#fcc1b0" },
    { type: "flying", color: "#b2d2e8" },
    { type: "poison", color: "#cfb7ed" },
    { type: "ground", color: "#f4d1a6" },
    { type: "rock", color: "#c5aea8" },
    { type: "bug", color: "#c1e0c8" },
    { type: "ghost", color: "#d7c2d7" },
    { type: "steel", color: "#c2d4ce" },
    { type: "fire", color: "#edc2c4" },
    { type: "water", color: "#cbd5ed" },
    { type: "grass", color: "#c0d4c8" },
    { type: "electric", color: "#e2e2a0" },
    { type: "psychic", color: "#ddc0cf" },
    { type: "ice", color: "#c7d7df" },
    { type: "dragon", color: "#cadcdf" },
    { type: "dark", color: "#c6c5e3" },
    { type: "fairy", color: "#e4c0cf" },
    { type: "unknown", color: "#c0dfdd" },
    { type: "shadow", color: "#cacaca" }
  ];

  const { pokemon, pokemonlist, statsFilter } = props;
  const [pokemonRender, setPokemonRender] = useState(false)

  const [pokemonType, setPokemonType] = useState(null)
  const [pokemonFormsData, setPokemonFormsData] = useState({})
  const [pokemonData, setPokemonData] = useState({
    // id: "",
    // name: "",
    // sprites: "",
    // audio: "",
    // abilites: [],
    // height: 0,
    // weight: 0,
    // genders: [],
    // egg_groups: [],
    // types: [],
    // weak_againest: [],
    // stats: [
    //   {
    //     name: "",
    //     base_stat: 0
    //   }
    // ],
    // evolution_chain: []
  })

  const [modal, setModel] = useState(false)




  function getTypes(pokemonfulldata) {
    const types = pokemonfulldata.types.map((element) => element.type.name)
    const color = types.reduce((acc, current) => {
      const typeColor = typeColors.find(item => item.type === current);
      acc.push(typeColor.color)
      return acc
    }, [])
    setPokemonType(color)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemondata = await fetch(pokemon.url);
        if (!pokemondata.ok) {
          throw new Error('Failed to fetch data');
        }
        const pokemonfulldata = await pokemondata.json();

        setPokemonData(pokemonfulldata)

        getTypes(pokemonfulldata)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

  }, [pokemon]);


  

  function handleModalOpen() {
    setModel(true)

  }

  function handleModalClose() {
    setModel(false)
  }

  

  return (
    
    pokemonType &&
      <div className="rounded-xl" style={{ background: `linear-gradient(${pokemonType.length > 1 ? pokemonType : [pokemonType, pokemonType]})` }}>
        <div className="relative flex flex-col  text-gray-700  shadow-md bg-clip-border rounded-xl w-48 h-64 border-[#2E3156] border-dashed border-2 max-sm:w-40" onClick={handleModalOpen}>
          <div className="relative p-3 mt-3 overflow-hidden text-gray-700 h-full rounded-xl ">

            {pokemonData.sprites &&
              <img className="w-full h-full" src={pokemonData.sprites.other["official-artwork"].front_default} alt="profile-picture" />
            }

          </div>
          <div className="p-3 text-center">
            <h4 className="block mb- font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">

              {pokemon?.name || "Pokemon"}

            </h4>
            <span className="text-xl font-sans font-normal tracking-normal text-blue-gray-500 ">

              {
                pokemonData &&
                  (pokemonData.id < 10) ? (`00${pokemonData.id}`) : ((pokemonData.id < 100) ? (`0${pokemonData.id}`) : (pokemonData.id))
              }


            </span>
          </div>
        </div>
        {
          modal &&
          <Modal pokemon={pokemonData} pokemonlist={pokemonlist} pokemonColor={pokemonType} handleModalClose={() => { handleModalClose() }}> </Modal>
        }
      </div> 
  )
}