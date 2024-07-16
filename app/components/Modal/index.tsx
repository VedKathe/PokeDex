
import { useEffect, useState } from 'react';
import styles from "./modal.module.css"
import AudioCard from "../AudioCard"
import Progress from "../Progress"
import ReadMore from "../ReadMore"
import { RxCrossCircled } from "react-icons/rx";
import { PiArrowCircleLeftLight } from "react-icons/pi";
import { PiArrowCircleRightLight } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Modal({ ...props }) {

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

    const { pokemon, handleModalClose, pokemonColor } = props;

    const [pokemonData, setPokemonData] = useState(pokemon)
    const [pokemonDiscribation, setPokemonDiscribation] = useState([])
    const [pokemonSpecie, setPokemonSpecie] = useState<any>()
    const [pokemonType, setPokemonType] = useState([])
    const [pokemonWeakness, setpokemonWeakness] = useState([])
    const [pokemonEvolution, setpokemonEvolution] = useState([])

    

    useEffect(() => {
        async function fetchData() {
            try {
    
    
                const pokemonSpecies = await fetch(pokemonData.species.url);
                if (!pokemonSpecies.ok) {
                    throw new Error('Failed to fetch data');
                }
                const pokemonJsonSpecies = await pokemonSpecies.json();
    
                setPokemonSpecie(pokemonJsonSpecies)
    
                setPokemonDiscribation(
                    pokemonJsonSpecies.flavor_text_entries.reduce(
                        (acc, current) => {
                            if (current.language.name === "en") {
                                if (!acc.includes(current.flavor_text)) {
                                    acc.push(current.flavor_text)
                                    return acc
                                }
                            }
                            return acc
                        }
                        , [])
                )
    
                getTypesColor(pokemonData)
                fetchEvolution(pokemonJsonSpecies);
    
    
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        async function fetchWeakness() {
            const typesArray = await Promise.all(pokemonData.types.map(async (element) => {
                const pokemonType = await fetch(element.type.url);
                if (!pokemonType.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const pokemonTypeJson = await pokemonType.json();
    
                const damageFrom = pokemonTypeJson.damage_relations.double_damage_from
    
                return damageFrom
            }
            ))
    
            const names = [...new Set(typesArray.flatMap(array => array.map(type => type.name)))];
            setpokemonWeakness(names);
        }

        fetchData();
        fetchWeakness();

    }, [pokemonData]);

    function getHeight(decimeter) {
        let inches:any = (decimeter * 3.93701).toFixed(0);
        var feet = Math.floor(inches / 12);

        inches %= 12;

        return (feet + "'" + inches + '"')
    }

    function getWeight(hectogram) {
        return (hectogram * 0.1).toFixed(1)
    }

    function getEggGroups() {
        let egg_groups = []

        pokemonSpecie.egg_groups.forEach((element) => {
            egg_groups.push(element.name)
        })

        return egg_groups.toString() || "none"
    }

    function getAbilities() {
        let abilities = []
        pokemonData.abilities.forEach((element) => {
            abilities.push(element.ability.name)
        })

        return abilities.toString() || "none"
    }

    function getTypes() {

        const types = pokemonData.types.map((element) =>
            <div className={`${styles[element.type.name]}  ${styles['type']}`} key={element.type.name}>{element.type.name}</div>
        )

        return types

    }

    function getStats() {
        const StatsName = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Def.", "Speed"]
        const stats = pokemonData.stats.map((element, index) =>
            <li className={styles['grid-item']} key={element.stat.name}>
                <div className={styles["item-1"]}> {StatsName[index]} </div>
                <div className={styles["item-2"]}><Progress value={element.base_stat} /></div>
            </li>
        )
        return stats
    }



    function getWeakness() {
        const weakness = pokemonWeakness.map((element) =>
            <div className={`${styles[element]}  ${styles['type']}`} key={element}>{element}</div>
        )

        return weakness
    }

    async function fetchEvolution(pokemonJsonSpecies) {

        const pokemonEvoleData = await fetch(pokemonJsonSpecies.evolution_chain.url);
        if (!pokemonEvoleData.ok) {
            throw new Error('Failed to fetch data');
        }
        const pokemonEvoleDataJson = await pokemonEvoleData.json();

        let speciesNames = []
        let currentEvolution = pokemonEvoleDataJson.chain;

        while (currentEvolution) {

            const species = await fetch(currentEvolution.species.url);
            if (!species.ok) {
                throw new Error('Failed to fetch data');
            }
            const pokemonEvoleDataJson = await species.json();

            const data = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonEvoleDataJson.name);
            if (!data.ok) {
                throw new Error('Failed to fetch data');
            }
            const DataJson = await data.json();

            const types = DataJson.types.map((element) => element.type.name)
            const color = types.reduce((acc, current) => {
                const typeColor = typeColors.find(item => item.type === current);
                acc.push(typeColor.color)
                return acc
            }, [])

            speciesNames.push({
                "name": pokemonEvoleDataJson.name, "id": pokemonEvoleDataJson.id,
                "img": DataJson.sprites.other["official-artwork"].front_default,
                "audio": DataJson.cries.latest, "color": color
            });
            currentEvolution = currentEvolution.evolves_to[0];
        }

        setpokemonEvolution(speciesNames);
        

    }

    function getTypesColor(pokemonfulldata) {
        const types = pokemonfulldata.types.map((element) => element.type.name)
        const color = types.reduce((acc, current) => {
          const typeColor = typeColors.find(item => item.type === current);
          acc.push(typeColor.color)
          return acc
        }, [])
        setPokemonType(color)
    }

    async function handleRight(id) {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/` + (id + 1));
        if (!data.ok) {
            throw new Error('Failed to fetch data');
        }
        const DataJson = await data.json();

        setPokemonData(DataJson)
    }

    async function handleLeft(id) {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/` + ((id > 0) ? id - 1 : id));
        if (!data.ok) {
            throw new Error('Failed to fetch data');
        }
        const DataJson = await data.json();

        setPokemonData(DataJson)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.model_content}>

                {/*name , img and description */}
                <div className={styles.nameimgdissection}>
                    {
                        pokemonData &&
                        pokemonData.cries &&
                        <div className={styles.imgsection}>
                            {
                                < AudioCard audioName={pokemonData.cries.latest} pokemonColor={pokemonType} pokemonImg={pokemonData.sprites.other["official-artwork"].front_default} />
                            }
                        </div>
                    }
                    {
                        pokemonData &&
                        <div className={styles.namedissection}>
                            <div className={styles.namesection}>
                                <label>{pokemonData.name.toUpperCase()}</label>
                                <div className={styles.vl}></div>
                                <label>
                                    {
                                        (pokemonData.id < 10) ? (`00${pokemonData.id}`) : ((pokemonData.id < 100) ? (`0${pokemonData.id}`) : (pokemonData.id))
                                    }
                                </label>

                                <div className={styles.vl}></div>

                                <div className={styles.btnsection}>
                                    <button type='button' title='left' onClick={() => { handleLeft(pokemonData.id) }}> <PiArrowCircleLeftLight size={20} /> </button>

                                    <button type='button' title='close' onClick={() => { handleModalClose(false) }}> <RxCrossCircled size={19} /> </button>

                                    <button type='button' title='right' onClick={() => { handleRight(pokemonData.id) }}> <PiArrowCircleRightLight size={20} /> </button>
                                </div>
                            </div>
                            <div className={styles.dissection}>
                                <label>{
                                    pokemonDiscribation &&
                                    <ReadMore text={pokemonDiscribation.join("")}></ReadMore>
                                }</label>
                            </div>

                        </div>
                    }
                </div>

                {/* Genral info */}
                <div className={styles.infocontainer}>
                    <div className={styles.inforow}>
                        <div className={styles.infocol}>
                            Height
                            <div className={styles.infovalue}>
                                {getHeight(pokemonData.height)}
                            </div>
                        </div>
                        <div className={styles.infocol}>
                            Weight
                            <div className={styles.infovalue}>
                                {getWeight(pokemonData.weight)} Kg
                            </div>
                        </div>
                        <div className={styles.infocol}>
                            Gender{(`(s)`)}
                            <div className={styles.infovalue}>
                                Male, Female
                            </div>
                        </div>
                        <div className={styles.infocol}>Egg Groups
                            <div className={styles.infovalue}>
                                {pokemonSpecie &&
                                    getEggGroups()}
                            </div>
                        </div>
                    </div>
                    <div className={styles.inforow}>
                        <div className={styles.infocol}>
                            Abilities
                            <div className={`${styles['infovalue']} ${styles['ability']}`}>
                                {getAbilities()}
                            </div>
                        </div>
                        <div className={styles.infocol}>
                            Type
                            <div className={styles.infovalue}>
                                {
                                    getTypes()
                                }
                            </div>
                        </div>
                        <div className={styles.infocol}>
                            Weak Against
                            <div className={`${styles['infovalue']} ${styles['ability']}`}>
                                {
                                    pokemonWeakness &&
                                    getWeakness()
                                }
                            </div>
                        </div>

                    </div>
                </div>

                {/* all Stats */}
                <div className={styles["stats_container"]}>
                    <label>Stats</label>
                    <ul className={styles['grid-container']}>
                        {getStats()}
                    </ul>

                </div>

                {/* Evolution Chain */}
                <div className={styles.evolutionchaincontainer}>
                    <div className='p-2'>Evolution Chain</div>
                    <div className={styles.imgcontainer}>
                        
                        {
                            pokemonEvolution &&
                            pokemonEvolution.map((poke,index) => {
                                
                                return <div key={index} className={styles.img}>
                                    < AudioCard audioName={poke.audio} pokemonColor={poke.color} pokemonImg={poke.img} pokemonName={poke.name} pokemonID ={poke.id} />
                                    {index < pokemonEvolution.length - 1 && <IoIosArrowRoundForward size={58} /> } 
                                </div>
                                

                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
