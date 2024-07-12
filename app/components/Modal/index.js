
import { useEffect, useState } from 'react';
import styles from "./modal.module.css"
import AudioCard from "../AudioCard"
import Progress from "../Progress"
import ReadMore from "../ReadMore"
import { RxCrossCircled } from "react-icons/rx";
import { PiArrowCircleLeftLight } from "react-icons/pi";
import { PiArrowCircleRightLight } from "react-icons/pi";


export default function Modal({ ...props }) {

    const { pokemon, handleModalClose, pokemonColor } = props;

    const [pokemonData, setPokemonData] = useState(pokemon)
    const [pokemonDiscribation, setPokemonDiscribation] = useState([])
    const [pokemonSpecie, setPokemonSpecie] = useState()
    const [pokemonType, setPokemonType] = useState([])
    const [pokemonWeakness, setpokemonWeakness] = useState([])


    async function fetchData() {
        try {


            const pokemonSpecies = await fetch(pokemon.species.url);
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
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchWeakness()
    }, []);

    function getHeight(decimeter) {
        var inches = (decimeter * 3.93701).toFixed(0);
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

    function getGender() {

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

    async function fetchWeakness()
    {
        const typesArray = await Promise.all( pokemonData.types.map(async (element) =>
           {
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

    function getWeakness()
    {
        const weakness = pokemonWeakness.map((element) =>
            <div className={`${styles[element]}  ${styles['type']}`} key={element}>{element}</div>
        )

        return weakness
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
                                < AudioCard audioName={pokemonData.cries.latest} pokemonColor={pokemonColor} pokemonImg={pokemonData.sprites.other.dream_world.front_default} />
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
                                    <button onClick={() => { handleModalClose(false) }}> <PiArrowCircleLeftLight size={20} /> </button>

                                    <button onClick={() => { handleModalClose(false) }}> <RxCrossCircled size={19} /> </button>

                                    <button onClick={() => { handleModalClose(false) }}> <PiArrowCircleRightLight size={20} /> </button>
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
                                {getHeight(pokemon.height)}
                            </div>
                        </div>
                        <div className={styles.infocol}>
                            Weight
                            <div className={styles.infovalue}>
                                {getWeight(pokemon.weight)} Kg
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
                <div>
                        {
                           
                        }       
                </div>
            </div>
        </div>
    )
}
