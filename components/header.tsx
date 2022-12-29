import Image from 'next/image';
import Container from './containers/container/container';
import styles from './header.module.scss';
import {useEffect, useState} from 'react';
import {TagsModel} from './models/tags';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Pages} from './utils/constants';


export default function Header({labels}) {
    const router = useRouter()
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

    const [styleHeader, setStyleHeader] = useState<any>(styleConsistent);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [tags, setTags] = useState<Array<TagsModel>>();
    const [selectedLabelId, setSelectedLabelId] = useState<string>();
    const [findKey, setFindKey] = useState<string>();
    const categories = {};
    useEffect(() => {
        const isInitialPage = router.pathname === Pages.INITIAL;
        if(isInitialPage) {
            changeBackground();
            window.addEventListener("scroll", changeBackground)
        };

    }, [findKey,selectedLabelId,openMenu, tags, openFilter ])

    const changeBackground = () => {
        if (window.scrollY <= 600) {
            setStyleHeader(styleTop)
        } else {
            setStyleHeader(styleConsistent)
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

    const handleOpenFilter = (): void => {
        setOpenMenu(false);
        setOpenFilter(!openFilter)
    }

    const handleSubmit = (event) => {
        router.push(`/search?key=${findKey}`,
            undefined,
            {shallow: true})
            .then(() => {
                router.reload();
        })
        event.preventDefault();
    }

    const verifyCategory = (path:string): string => {
        return '/categorias' + path;
    }

    const handleRedirectLink = (path:string) => {
        const pathname = verifyCategory(path);
       router.push({
           pathname
       })
    }

    const handleRedirectSubCategory = (path: string, findKey: string) => {
        const pathname = verifyCategory(path);

        router.push({
            pathname,
            query: { key: findKey },
        })
    }


    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__fixed} style={styleHeader}>
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
                            !!openMenu && tags && <div className={'py-5 ' + styles.navbar__list}>
                                {tags.map((tag, index) => (
                                    <Link href={`/categorias${tag.path}?key=${tag.slug}`}>
                                            <p className="header-list " key={index}
                                               >{tag.label}</p>
                                    </Link>
                                    )
                                )}
                            </div>
                        }

                        {
                            !!openFilter &&
                            <div className="py-16 px-96">
                                <form onSubmit={handleSubmit}>
                                    <input type="search" className="text-base input__primary"
                                           required
                                           name="search"
                                           onChange={event => setFindKey(event.target.value)}
                                       placeholder="Encontre no blog"/>
                                </form>
                            </div>
                        }
                    </Container>
                </div>

            </nav>
        </>

    )
}


