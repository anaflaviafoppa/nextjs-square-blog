import Image from 'next/image';
import Container from './containers/container/container';
import styles from './header.module.scss';
import React, {useEffect, useState} from 'react';
import {TagsModel} from './models/tags';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {IdsName, MenuName, Pages} from './utils/constants';
import ListCategories from './components/list-categories/list-categories';
import ListLabels from './components/list-labels/list-labels';


interface Props {
    labels: any,
    searchKey?: string,
}

export default function Header({labels, searchKey = ''}: Props) {
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
    const [openMenu, setOpenMenu] = useState<string>('');
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [tags, setTags] = useState<Array<TagsModel>>();
    const [selectedLabelId, setSelectedLabelId] = useState<string>();
    const [findKey, setFindKey] = useState<string>(searchKey);
    const categories = {};
    useEffect(() => {
        verifyIsInitialPage();
        verifyRouter();

    }, [labels])

    const verifyIsInitialPage = () => {
        const isInitialPage = router.pathname === Pages.INITIAL;
        if(isInitialPage) {
            changeBackground();
            window.addEventListener("scroll", changeBackground)
        }
    }

    const changeBackground = () => {
        const element = document.getElementById(IdsName.CAROUSEL);
        const positions = element?.getBoundingClientRect();

        if (window.scrollY <= positions?.bottom) {
            setStyleHeader(styleTop)
            setBackgroundColor(backgroundGradient);
        } else {
            setStyleHeader(styleConsistent);
            setBackgroundColor(backgroundConsistent)
        }
    }

    const getSelectedTags = (id: string) => {
        if(!id) {
            return;
        }

        if (categories[id]) {
            setTags(categories[id]);
        }
        categories[id] = labels.find(label => label.id === id)?.children;
        setTags(categories[id]);
    }

    const handleClickCategories = (id: string): void => {
        const isOpenedMenu = openMenu === MenuName.CATEGORIES;
        if (id === selectedLabelId && isOpenedMenu) {
            setOpenMenu('');
        } else if (id !== selectedLabelId && isOpenedMenu) {
            getSelectedTags(id);
        } else if (id !== selectedLabelId && !isOpenedMenu) {
            getSelectedTags(id);
            setOpenMenu(MenuName.CATEGORIES);
        } else if (id === selectedLabelId && !isOpenedMenu) {
            setOpenMenu(MenuName.CATEGORIES);
        }

        setSelectedLabelId(id);
    };

    const verifyRouter = () => {
        const isSearchPath = router.pathname === Pages.SEARCH;
        if(isSearchPath) {
            setOpenMenu(MenuName.SEARCH_FILTER);
            setFindKey(searchKey);
        }
    }

    const handleOpenFilter = (): void => {
        const isOpenedFilterMenu = openMenu === MenuName.SEARCH_FILTER;
        setOpenMenu(isOpenedFilterMenu ? '' : MenuName.SEARCH_FILTER);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/search/${findKey}`)
            .then(() => {})

    }

    const handleOpenMobileMenu = () => {
        const isMobileMenuOpen = openMenu === MenuName.LABELS_MOBILE;
        if(isMobileMenuOpen) {
            setOpenMenu('');
            verifyIsInitialPage();
        } else {
            setOpenMenu(MenuName.LABELS_MOBILE);
            setBackgroundColor(backgroundConsistent);
            setStyleHeader(styleConsistent);
        }
    }

    const handleClickCategoriesMobile = (id: string): void => {
        const isMobileCategoriesMenuOpen = openMenu === MenuName.CATEGORIES_MOBILE;
        if(isMobileCategoriesMenuOpen) {
            setOpenMenu(MenuName.LABELS_MOBILE)
        } else {
            getSelectedTags(id);
            setOpenMenu(MenuName.CATEGORIES_MOBILE);
        }
    }

    return (
        <>
            <nav className={styles.navbar}  style={styleHeader}>
                <div className={styles.navbar__fixed} style={{background: backgroundColor}}>
                    <Container>
                        <div className={styles.navbar__container}>
                            <div className={styles.navbar__icon}>
                                <Image src={'/images/three-lines.png'}
                                       alt={'Click to Open the menu'}
                                       width={32}
                                       height={32}
                                       onClick={() => handleOpenMobileMenu()}
                                />
                            </div>
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
                                <ListLabels labels={labels}
                                            selectedLabelId={selectedLabelId}
                                            isOpenedMenu={openMenu === MenuName.CATEGORIES}
                                            handleClickCategories={handleClickCategories} />
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
                            tags && <div className={openMenu === MenuName.CATEGORIES ?
                                'padding-3-y ' + styles.navbar__list  : styles.navbar__list}
                                         data-active={openMenu === MenuName.CATEGORIES}>
                                <ListCategories tags={tags} />
                            </div>
                        }


                            <div className={openMenu === MenuName.SEARCH_FILTER ? 'padding-4-y padding-24-x ' + styles.navbar__container_search : styles.navbar__container_search}  data-active={openMenu === MenuName.SEARCH_FILTER ? 'true' : 'false'}>
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

                <div className={styles.navbar__extra_mobile} data-active={openMenu === MenuName.LABELS_MOBILE || openMenu === MenuName.CATEGORIES_MOBILE}>
                        <div className={'container-x ' + styles.navbar__extra_first_menu}
                             data-active={openMenu === MenuName.LABELS_MOBILE}>
                            <div className={styles.navbar__extra_labels}>
                                <ListLabels labels={labels}
                                            selectedLabelId={selectedLabelId}
                                            isOpenedMenu={false}
                                            handleClickCategories={handleClickCategoriesMobile} />
                            </div>

                            <div className={styles.navbar__extra_button}>
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

                        <div className={'container-x ' + styles.navbar__extra_second_menu}
                             data-active={openMenu === MenuName.CATEGORIES_MOBILE}>
                            <div className={styles.navbar__back} onClick={() => handleClickCategoriesMobile('')}>
                                <div>
                                    <Image
                                        width={15.83}
                                        height={9.17}
                                        alt={`Arrow`}
                                        src={'/images/arrow.png'}
                                    />
                                </div>

                                <span>Voltar</span>
                            </div>
                            <div className={styles.navbar__extra_categories}>
                                <ListCategories color={'lighter'} tags={tags} />
                            </div>

                        </div>

                </div>

            </nav>
        </>

    )
}


