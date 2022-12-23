// @flow
import * as React from 'react';
import CarouselItem from '../../components/carousel-item/carousel-item';
import Carousel from 'react-bootstrap/Carousel';
import styles from './carousel.module.scss';


type Props = {};
export const CarouselUnit = ({posts}) => {
    return (
        <section className={styles.carousel}>
            <Carousel>
                {posts.map(({node}, index) => (
                    <Carousel.Item
                        interval={15000}
                    >
                        <CarouselItem
                            key={node.slug}
                            title={node.title}
                            coverImage={node.featuredImage}
                            slug={node.slug}
                            index={index}
                        />
                        {/*key={node.slug}
                        title={node.title}
                        coverImage={node.featuredImage}
                        slug={node.slug}
                        index={index}*/}

                    </Carousel.Item>
                ))}

            </Carousel>
        </section>
    );
};
