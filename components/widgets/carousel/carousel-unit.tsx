// @flow
import * as React from 'react';
import CarouselItem from '../../components/carousel-item/carousel-item';
import Carousel from 'react-bootstrap/Carousel';
import styles from './carousel.module.scss';


interface Props {
    posts: any,
    id: string
}
export const CarouselUnit = ({posts, id}: Props) => {
    return (
        <div className={styles.carousel} id={id}>
            { posts &&
            <Carousel>
                {posts.map(({node}, index) => (
                    <Carousel.Item
                        interval={30000}
                        key={node.slug}
                    >
                        <CarouselItem
                            key={node.slug}
                            title={node.title}
                            coverImage={node.featuredImage}
                            slug={node.slug}
                            index={index}
                        />
                    </Carousel.Item>
                ))}

            </Carousel>
            }
        </div>
    );
};
