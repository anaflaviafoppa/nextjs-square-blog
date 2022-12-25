
import styles from './post-title.module.scss'

export default function PostTitle({ children }) {
  return (
    <h1
      className={styles.post__title}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
