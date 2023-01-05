import React from 'react';
import CoverImage from '../../cover-image';
import styles from './post-banner.module.scss';
import Container from '../../containers/container/container';

function PostBanner({banner: {edges}}) {
    const title = edges[0].node.title;
    const featuredImage = edges[0].node.featuredImage;

    return (
        <section className="section">
            <Container>
                <div className="title__border_container mb-16">
                    <div className="title__border">
                        <h3>{title}</h3>
                    </div>
                </div>
            </Container>
            <div className={styles.banner__container}>
                <CoverImage coverImage={featuredImage} title={'Banner'} />
            </div>
        </section>
    );
}

export default PostBanner;
