import styles from './audiocard.module.css'

export default function Index({...props}) {
    
    const{ audioName , pokemonImg, pokemonColor} = props;
    const audio = new Audio(audioName)

    const start = () => {
        audio.play()
      }

    return(
        <div  style={{background: `linear-gradient(${pokemonColor.length>1?pokemonColor:[pokemonColor,pokemonColor]})` }} className={styles.card}  onClick={start}>
        <div className={styles["card-content"]}>
          
          
          { pokemonImg &&
            <img className={styles["card-img"]} src={pokemonImg} alt="profile-picture" />
          }
          
        </div>
        
      </div>
    )

}