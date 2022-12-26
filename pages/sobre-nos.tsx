import React from 'react';
import Layout from '../components/layout';
import {GetStaticProps} from 'next';
import {getAboutUsContent, getAllPostsForHome} from '../lib/api';
import Container from '../components/containers/container/container';
import CoverImage from '../components/cover-image';
import styles from '../styles/pages/sobre-nos.module.scss'

export default function SobreNos({preview, content, title, image}) {
    const style = {
        backgroundImage: `url(${image.node.sourceUrl})`,
        backgroundPosition: 'bottom 100% right 100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: "inherit",
        height: "100%"
    }

    return (
        <Layout preview={preview}>
            <section className={styles.about}>
                <div className={'container-x-left padding-56-y ' + styles.about__content}>
                    <Container>
                        <h1 className="big-title">{title}</h1>
                        <div className="margin-80-bottom" dangerouslySetInnerHTML={{ __html: content }} />
                        <button className="button__primary">Confira nosso site</button>
                    </Container>
                </div>
                <div className={styles.about__circle} style={style}>
                </div>
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {
    const data = await getAboutUsContent()
    const node = data?.edges[0].node;

    return {
        props: {
            preview,
            content: node?.content || '',
            title: node?.title,
            image: node?.featuredImage
        },
        revalidate: 10,
    }
}
