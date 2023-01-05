import styles from './post-body.module.scss'
import PostBanner from './components/post-banner/post-banner';
import UnderlinedTitle from './components/underlined-title/underlined-title';
import Container from './containers/container/container';


export default function PostBody({content, date, category, banner}) {
    return (
        <section className={'section ' + styles.post__body}>
            <Container>
                <UnderlinedTitle date={date} title={category}/>
            </Container>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{__html: content}}
                />


            <PostBanner banner={banner}></PostBanner>
        </section>
    )
}
