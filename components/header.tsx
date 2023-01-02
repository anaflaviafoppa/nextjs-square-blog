import Image from 'next/image';
import Container from './containers/container/container';
import styles from './header.module.scss';
import {useEffect, useState} from 'react';
import {TagsModel} from './models/tags';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Pages} from './utils/constants';

interface Props {
    labels: any,
    searchKey?: string,
}

export default function Header({labels, searchKey = ''}) {
    const router = useRouter()
    const backgroundGradient = 'linear-gradient(180deg, #2A2A2A 19.79%, rgba(42, 42, 42, 0) 100%)';
    const backgroundConsistent = '#2A2A2A';

    const styleTop = {
        position: 'fixed',
    };

    const styleConsistent = {
        position: 'sticky',
        top: 0
    };

    const [styleHeader, setStyleHeader] = useState<any>(styleConsistent);
    const [backgroundColor, setBackgroundColor] = useState<string>(backgroundConsistent);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [tags, setTags] = useState<Array<TagsModel>>();
    const [selectedLabelId, setSelectedLabelId] = useState<string>();
    const [findKey, setFindKey] = useState<string>(searchKey);
    const categories = {};
    useEffect(() => {
        const isInitialPage = router.pathname === Pages.INITIAL;
        if(isInitialPage) {
            changeBackground();
            window.addEventListener("scroll", changeBackground)
        }

        verifyRouter();

    }, [labels])

    const changeBackground = () => {
        if (window.scrollY <= 600) {
            setStyleHeader(styleTop)
            setBackgroundColor(backgroundGradient);
        } else {
            setStyleHeader(styleConsistent);
            setBackgroundColor(backgroundConsistent)
        }
    }

    const getSelectedTags = (id: string) => {
        if (categories[id]) {
            setTags(categories[id]);
        }
        categories[id] = labels.find(label => label.id === id)?.children;
        setTags(categories[id]);
    }

    const handleClickCategories = (id: string): void => {
        if (id === selectedLabelId && openMenu) {
            setOpenMenu(!openMenu);
        } else if (id !== selectedLabelId && openMenu) {
            getSelectedTags(id);
        } else if (id !== selectedLabelId && !openMenu) {
            getSelectedTags(id);
            setOpenMenu(!openMenu);
        } else if (id === selectedLabelId && !openMenu) {
            setOpenMenu(!openMenu);
        }

        setSelectedLabelId(id);
    };

    const verifyRouter = () => {
        const isSearchPath = router.pathname === Pages.SEARCH;
        if(isSearchPath) {
            setOpenMenu(false);
            setOpenFilter(true);
            setFindKey(searchKey);
        }
    }

    const handleOpenFilter = (): void => {
        setOpenMenu(false);
        setOpenFilter(!openFilter)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/search/${findKey}`)
            .then(() => {})

    }

    return (
        <>
            <nav className={styles.navbar}  style={styleHeader}>
                <div className={styles.navbar__fixed} style={{background: backgroundColor}}>
                    <Container>
                        <div className={styles.navbar__container}>
                            <Link href='/'>
                            <Image
                                width={120}
                                height={52}
                                alt={`Logo Bom de Beer`}
                                src='/images/logo.png'
                            />
                            </Link>

                            <div className={styles.navbar__container_links_search}>

                            <div className={styles.navbar__links}>
                                {
                                    labels?.map((label) => {
                                        return (
                                            <div className={styles.navbar__text} key={label.id}
                                                 selected-label={(label.id === selectedLabelId && openMenu).toString()}>
                                                                            <Link href={`/categorias${label.path}`}>
                                                    <p className="header-labels"
                                                   selected-label={(label.id === selectedLabelId && openMenu).toString()}>{label.label}</p>
                                                                            </Link>
                                                {
                                                    !!label.children.length &&
                                                    <div onClick={() => handleClickCategories(label.id)}>
                                                        <Image
                                                            width={15.83}
                                                            height={9.17}
                                                            alt={`Arrow`}
                                                            src={label.id === selectedLabelId && openMenu ? '/images/arrow_yellow.png' : '/images/arrow.png'}
                                                        />
                                                    </div>
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
                                    onClick={() => handleOpenFilter()}
                                />
                            </div>
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
                <div className={styles.navbar__extra}>
                    <Container>
                        {
                            tags && <div className={!!openMenu ? 'padding-3-y ' + styles.navbar__list  : styles.navbar__list} data-active={!!openMenu}>
                                {tags.map((tag, index) => (
                                    <Link href={`/categorias${tag.path}/${tag.slug}`} key={index}>
                                            <p className="header-list "
                                               >{tag.label}</p>
                                    </Link>
                                    )
                                )}
                            </div>
                        }


                            <div className={openFilter ? 'padding-4-y padding-24-x ' + styles.navbar__container_search : styles.navbar__container_search}  data-active={openFilter ? 'true' : 'false'}>
                                <form onSubmit={handleSubmit}>
                                    <input type="search" className="text-base input__primary"
                                           required
                                           name="search"
                                           value={findKey}
                                           onChange={event => setFindKey(event.target.value)}
                                       placeholder="Encontre no blog"/>
                                </form>
                            </div>


                        { router.pathname === Pages.SEARCH &&
                            <div>
                                <h2>
                                    Resultados para: {router.query.search}
                                </h2>
                            </div>
                        }
                    </Container>
                </div>

            </nav>
        </>

    )
}


