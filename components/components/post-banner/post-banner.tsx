import React, {useEffect, useState} from 'react';
import styles from './post-banner.module.scss';
import Container from '../../containers/container/container';
import {isMobileSize} from '../../utils/functions';
import {NodeModel} from '../../models/general';
import {Categories, FeatureImage} from '../../models/posts';
import UnderlinedTitle from '../underlined-title/underlined-title';

const BANNER_SELECTED_CATEGORY_MOBILE = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_MOBILE_ID;
const BANNER_SELECTED_CATEGORY_DESKTOP = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_DESKTOP_ID;

function PostBanner({banner: {edges}}) {
    const [featuredImage, setFeatureImage] = useState<NodeModel<FeatureImage>>();
    const [title, setTitle] = useState<string>('');
    const [excerpt, setExcerpt] = useState<string>('');
    const [mobileSize, setMobileSize] = useState<boolean>(false);


    useEffect(() => {
        verifyDimensions();
    }, []);

    const verifyDimensions = () => {
        setMobileSize(isMobileSize());
        const selectedPostId = mobileSize ? BANNER_SELECTED_CATEGORY_MOBILE : BANNER_SELECTED_CATEGORY_DESKTOP;

        const nodeSelected = edges.find(({node}) => {
            return findSelectedCategory(node.categories.nodes, selectedPostId)
        });
        if (!nodeSelected) {
            return;
        }
        const node = nodeSelected.node;
        setTitle(node.title);
        setFeatureImage(node.featuredImage);
        setExcerpt(node.excerpt);
    }

    const findSelectedCategory = (categories: Categories[], selectedPostId: string): boolean => {
        return categories.findIndex(category => category.id === selectedPostId) >= 0
    }


    return (
        <section className="section">
            {title && featuredImage &&
                <>
                    <Container>
                        <UnderlinedTitle title={title} date={''} />
                        {mobileSize && excerpt && <div className={styles.banner__text} dangerouslySetInnerHTML={{__html: excerpt}}/>}
                    </Container>
                    <div className={styles.banner__container}>
                        <img
                            alt={`Cover Image for ${title}`}
                            src={featuredImage?.node.sourceUrl}
                            loading="lazy"
                        />
                    </div>
                </>}
        </section>
    );
}

export default PostBanner;
