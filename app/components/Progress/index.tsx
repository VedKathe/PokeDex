import styles from "./progess.module.css"

export default function Index({ value }: { value: number }) {
    return (

        <div className={styles.container}>
            <div className={styles.progress_bar} style={{ width: `${value < 100 ? value : 100}%` }}>{value}</div>
        </div>

    )
}