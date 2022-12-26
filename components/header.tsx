import Image from 'next/image';
import Container from './containers/container/container';
import styles from './header.module.scss';
import {useEffect, useState} from 'react';
import {GetStaticProps} from 'next';
import {getHeaderContent} from '../lib/api';


export default function Header({labels}) {
    const backgroundGradient = 'linear-gradient(180deg, #2A2A2A 19.79%, rgba(42, 42, 42, 0) 100%)';
    const backgroundConsistent = '#2A2A2A';

    const styleTop = {
        background: backgroundGradient,
        position: 'fixed',
    };

    const styleConsistent = {
        background: backgroundConsistent,
        position: 'sticky',
        top: 0
    };

    const tags = ['Aves', 'Bebidas', 'Carnes', 'Comida de Boteco'];
    const [styleHeader, setStyleHeader] = useState<any>(styleTop);

    useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground)
    }, [])

    const changeBackground = () => {
        if (window.scrollY <= 600) {
            setStyleHeader(styleTop)
        } else {
            setStyleHeader(styleConsistent)
        }
    }

    const openCategories = (id: string) => {
      console.log(id);
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__fixed} style={styleHeader}>
                    <Container>
                        <div className={styles.navbar__container}>
                            <Image
                                width={120}
                                height={52}
                                alt={`Logo Bom de Beer`}
                                src='/images/logo.png'
                            />

                            <div className={styles.navbar__links}>
                                {
                                    labels?.map((label) => {
                                        return (
                                            <div className={styles.navbar__text} key={label.id}>
                                                <p className="header-labels">{label.label}</p>
                                                {
                                                    !!label.children.length &&
                                                    <Image
                                                        width={15.83}
                                                        height={9.17}
                                                        alt={`Arrow`}
                                                        src='/images/arrow.png'
                                                        onClick={() => openCategories(label.id)}
                                                    />
                                                }
                                            </div>
                                        )
                                    })
                                }
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
                                        <p className="header-list " key={index}>{tag}</p>
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


