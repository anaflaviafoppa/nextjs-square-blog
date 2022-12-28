import React from 'react';
import Layout from '../layout';
import Container from '../containers/container/container';
import MainPosts from '../widgets/main-posts/main-posts';
import styles from './layout-category.module.scss'

interface Props {
    labels: any,
    posts: any,
    title: any,
    preview: any
}

function LayoutCategory({labels, posts, title, preview}: Props) {
    const mainTest = title?.[0].node?.title;
    const content = title?.[0].node?.content;
    return (
        <Layout preview={preview} labels={labels}>
            <div className={'container-large ' + styles.layout__title}>
                <div>
                    <h1 className="big-title">{mainTest}</h1>
                    <div
                        className="big-subtitle"
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                </div>
            </div>
            <Container>
                <MainPosts items={posts}/>
            </Container>
        </Layout>
    )
}

export default LayoutCategory;
