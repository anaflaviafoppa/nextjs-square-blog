import React from 'react';
import Link from 'next/link';
import styles from './carousel-item.module.scss';

function CarouselItem({
                          title,
                          coverImage,
                          slug,
                          index
                      }) {
    const backgroundImage = coverImage?.node?.sourceUrl || '';

    const styling = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(42, 42, 42, 0.5)',
        backgroundBlendMode: 'multiply',
        width: "100%",
        height: "100%"
    }

    return (

        <div style={styling} className={styles.carousel__slide}>
            <div className="mb-48 mt-80">
                <div className={styles.carousel__slide__container}>
                    <Link href={`/posts/${slug}`}>
                        <h2 className={"mb-40 " + styles.carousel__slide_title}>{title}</h2>
                    </Link>
                    <div className={styles.carousel__slide__container_button}>
                        <Link href={`/posts/${slug}`}>
                            <button className="button__secondary">
                                Veja matéria completa
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CarouselItem;
