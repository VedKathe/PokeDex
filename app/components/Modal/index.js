import { useEffect, useState } from 'react';
import styles from "./modal.module.css"
import AudioCard from "../AudioCard"
import Progress from "../Progress"
import ReadMore from "../ReadMore"

export default function Modal({ ...props }) {

    const { pokemon, handleModalClose, pokemonColor } = props;

    const [pokemonData, setPokemonData] = useState(pokemon)
    const [pokemonDiscribation, setPokemonDiscribation] = useState([])
    const [pokemonSpecie, setPokemonSpecie] = useState()
    const [pokemonType, setPokemonType] = useState([])

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

    }, []);

    function getHeight(decimeter) {
        var inches = (decimeter * 3.93701).toFixed(0);
        var feet = Math.floor(inches / 12);

        inches %= 12;

        return (feet + "'" + inches + '"')
    }

    function getWeight(hectogram) {
        return hectogram * 0.1
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
            <div className={styles[element.type.name]} key={element.type.name}>{element.type.name}</div>
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
                                <label>{pokemonData.name}|</label>
                                <label>{pokemonData.id}|</label>
                                <div>
                                    <button onClick={() => { handleModalClose(false) }}> close </button>

                                    <button onClick={() => { handleModalClose(false) }}> close </button>

                                    <button onClick={() => { handleModalClose(false) }}> close </button>
                                </div>
                            </div>
                            <div className={styles.dissection}>
                                <label>{
                                    pokemonDiscribation &&  
                                    <ReadMore text={pokemonDiscribation.toString()}></ReadMore>
                                }</label>
                            </div>

                        </div>
                    }
                </div>

                {/* Genral info */}
                <div>
                    <div>
                        <label>height:{getHeight(pokemon.height)}</label>
                        <label>weight:{getWeight(pokemon.weight)} Kg</label>
                        <label>Gender:{"?"}</label>
                        <label>Egg Groups:{
                            pokemonSpecie &&
                            getEggGroups()}</label>
                    </div>
                    <div>
                        <label>Abilities:{getAbilities()}</label>
                        <div>Type:{
                            getTypes()
                        }
                        </div>
                        <label>Weak Against:{"?"}</label>

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

                </div>
            </div>
        </div>
    )
}
