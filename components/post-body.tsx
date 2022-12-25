import styles from './post-body.module.scss'
import PostBanner from './components/post-banner/post-banner';
import UnderlinedTitle from './components/underlined-title/underlined-title';


export default function PostBody({ content,date, category }) {
  return (
    <section className={'section ' + styles.post__body}>
        <UnderlinedTitle date={date} title={category} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

        <PostBanner></PostBanner>
    </section>
  )
}
