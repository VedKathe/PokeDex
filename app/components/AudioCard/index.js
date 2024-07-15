import styles from './audiocard.module.css'

export default function Index({ ...props }) {

  const { audioName, pokemonImg, pokemonColor, pokemonName, pokemonID } = props;
  const audio = new Audio(audioName)

  const start = () => {
    audio.play()
  }



  return (
    <div style={{ background: `linear-gradient(${pokemonColor.length > 1 ? pokemonColor : [pokemonColor, pokemonColor]})` }} className={styles.card} onClick={start}>
      <div className={styles["card-content"]}>

        <div className=''>
          {pokemonImg &&
            <img className={styles["card-img"]} src={pokemonImg} alt="profile-picture" />
          }
        </div>
        <div>
          {pokemonName &&
          <div className="p-2 text-center">
            <h4 className="block mb- font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">

              {pokemonName || "Pokemon"}

            </h4>
            <span className="text-xl font-sans font-normal tracking-normal text-blue-gray-500 ">

              {
                (pokemonID < 10) ? (`00${pokemonID}`) : ((pokemonID < 100) ? (`0${pokemonID}`) : (pokemonID))
              }


            </span>
          </div>
        }
        </div>

      </div>

    </div>
  )

}