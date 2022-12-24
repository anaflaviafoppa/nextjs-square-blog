import Image from 'next/image';
import Container from './container';
import styles from './header.module.scss';
import {useEffect, useState} from 'react';

export default function Header() {
    const backgroundGradient = 'linear-gradient(180deg, #2A2A2A 19.79%, rgba(42, 42, 42, 0) 100%)';
    const backgroundConsistent = '#2A2A2A';
    const tags = ['Aves', 'Bebidas', 'Carnes', 'Comida de Boteco'];
    const [background, setBackground] = useState(backgroundGradient);

    useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground)
    })

    const changeBackground = () => {
        if (window.scrollY <= 600) {
            setBackground(backgroundGradient)
        } else {
            setBackground(backgroundConsistent)
        }
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__fixed} style={{background: background}}>
                    <Container>
                        <div className={styles.navbar__container}>
                            <Image
                                width={120}
                                height={52}
                                alt={`Logo Bom de Beer`}
                                src='/images/logo.png'
                            />

                            <div className={styles.navbar__links}>
                                <div className={styles.navbar__text}>
                                    <p className="text-base mr-7">bom de fazer</p>
                                    <Image
                                        width={15.83}
                                        height={9.17}
                                        alt={`Arrow`}
                                        src='/images/arrow.png'
                                    />
                                </div>
                                <div className={styles.navbar__text}>
                                    <p className="text-base">bom saber</p>
                                </div>
                                <div className={styles.navbar__text}>
                                    <p className="text-base  mr-7">bom de copo</p>
                                    <Image
                                        width={15.83}
                                        height={9.17}
                                        alt={`Arrow`}
                                        src='/images/arrow.png'
                                    />
                                </div>
                                <div className={styles.navbar__text}>
                                    <p className="text-base">bom de assistir</p>
                                </div>

                            </div>

                            <div className={styles.navbar__search}>
                                <Image
                                    width={20.28}
                                    height={20.28}
                                    alt={`Search Icon`}
                                    src='/images/search-icon.png'
                                />
                            </div>
                            <div className={styles.navbar__button}>
                                <button className='text-base button__primary button__primary-rounded'>
                                    <div className="button__icon">
                                        <Image
                                            width={21.65}
                                            height={18.81}
                                            alt={`House icon`}
                                            src='/images/house.png'
                                        />
                                    </div>
                                    Loja Virtual
                                </button>
                            </div>
                        </div>
                    </Container>
                    </div>
                    {/*<div className={styles.navbar__extra}>
                        <Container>
                            <div className={'py-5 ' + styles.navbar__list}>
                                {tags.map((tag, index) => (
                                        <p className="text-base mr-52" key={index}>{tag}</p>
                                    )
                                )}
                            </div>
                            <div className="py-16 px-96">
                                <input type="search" className="text-base input__primary" required name="search" placeholder="Encontre no blog"/>
                            </div>
                        </Container>
                    </div>*/}

            </nav>
        </>

    )
}
