import React from 'react';
import Link from 'next/link';
import styles from './carousel-item.module.scss';
import Container from '../../container';

function CarouselItem({
                          title,
                          coverImage,
                          slug,
                          index
                      }) {
    const styling = {
        backgroundImage: `url('https://www.grupopetropolis.com.br/grpptrpls/wp-content/uploads/NISSAN_RJ-2-767x512.jpg')`,
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
            <div className="mb-48 mt-80 pl-32 pr-48">
                <div className="pl-64">
                    <div className="pr-20">
                        <h2 className={"text-7xl mb-40 " + styles.carousel__slide_title}>{title}</h2>
                    </div>
                    <div className="pr-80">
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
