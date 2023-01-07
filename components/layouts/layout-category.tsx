import React, {useEffect, useState} from 'react';
import Layout from '../layout';
import styles from './layout-category.module.scss';
import {Alignment, Priority} from '../utils/constants';
import Filter from '../../public/images/filter.png';
import MainPosts from '../widgets/main-posts/main-posts';
import Image from 'next/image';
import {isMobileSize} from '../utils/functions';
import TagsLists from '../widgets/tags-list/tags-lists';
import Head from "next/head";

function LayoutCategory({labels, posts, title, tags, selectedLabel, CTAHeader,footer, allCategories, preview}) {
    const mainTest = title?.[0]?.node?.title;
    const content = title?.[0]?.node?.content;
    const tagsList = tags?.children?.nodes;

    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [activeList, setActiveList] = useState<boolean>(true);

    useEffect(() => {
        verifyWidthMobile();
    }, []);

    const verifyWidthMobile = () => {
        setFilterVisible(isMobileSize());
        setActiveList(!isMobileSize());
    }

    const handleOnClickFilter = () => {
        setActiveList(!activeList);
    }


    return (
        <Layout preview={preview} labels={labels} CTAHeader={CTAHeader}
                footer={footer}
                allCategories={allCategories}
        >
            <Head>
                <title>Bom de Beer Blog - Categories Page</title>
                <meta name="description" content={mainTest} />
            </Head>
            <div className={styles.layout__title}>
                <div>
                    <h1 className="big-title">{mainTest}</h1>
                    <div
                        className="big-subtitle"
                        dangerouslySetInnerHTML={{__html: content}}
                    />

                </div>
            </div>
            {filterVisible && <div className={styles.layout__filter} onClick={() => handleOnClickFilter()}>
                <Image
                    src={Filter}
                    height={18}
                    width={19}
                    alt='Filter Image'
                />
                <p>Filtrar</p>
            </div>}
            <div className={styles.layout__list_tags} data-active={activeList}>
                <TagsLists
                    tagsList={tagsList}
                    selectedLabel={selectedLabel}
                    alignment={Alignment.CENTER}
                    allowShowAll={true}
                    type={Priority.SECONDARY}
                />
            </div>
            <MainPosts items={posts}/>

        </Layout>
    )
}


export default LayoutCategory;
