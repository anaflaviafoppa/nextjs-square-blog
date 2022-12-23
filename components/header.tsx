import Image from 'next/image';
import Container from './container';
import styles from './header.module.scss';

export default function Header() {
    return (
        <nav className={styles.navbar}>
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
        </nav>
    )
}
