import {useEffect, useState} from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../lib/services/category';
import {getLabels} from '../../lib/services/header';
import styles from '../../components/layouts/layout-category.module.scss';
import Container from '../../components/containers/container/container';
import TagContainer from '../../components/containers/tag-container/tag-container';
import {Alignment, Pages, Priority, TagsLabels} from '../../components/utils/constants';
import Link from 'next/link';
import Tag from '../../components/components/tag/tag';
import MainPosts from '../../components/widgets/main-posts/main-posts';
import Layout from '../../components/layout';
import {useRouter} from 'next/router';
import {update} from 'immutable';

interface Props {
    labels: any,
    posts: any,
    title: any,
    tags: any,
    preview: any,
    selectedLabel: string
}

function Category({labels, posts,title, tags, selectedLabel, preview}) {
    const router = useRouter();
    const mainTest = title?.[0]?.node?.title;
    const content = title?.[0]?.node?.content;
    const tagsList = tags?.children?.nodes;


    const handleFilterPerTag = (findKey: string) => {
        const path = {
            pathname: '/categorias/' + router.query.label
        }

        const isSubCategory = findKey !== TagsLabels.ALL;
        if(isSubCategory) {
            path['query'] = {key: findKey}
        };

        router.replace(path, undefined, {shallow: true}).then(() => {
            router.reload();
        })
    }

    return(
        <Layout preview={preview} labels={labels}>
            <div className={'container-large ' + styles.layout__title}>
                <div>
                    <h1 className="big-title">{mainTest}</h1>
                    <div
                        className="big-subtitle"
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                </div>
            </div>
            <Container>
                { tagsList?.length > 1 &&
                <div className="container-y">
                    <TagContainer alignment={Alignment.CENTER}>
                        <Link href={'/'}>
                            <Tag clickable={true} text={'Mostrar Todos'} type={Priority.PRIMARY}
                                 isSelected={selectedLabel === TagsLabels.ALL}
                                 slug={TagsLabels.ALL}
                                 onClickFunction={handleFilterPerTag}
                            />
                        </Link>
                        {tagsList?.map((tag, index) => {
                            return (
                                    <Tag clickable={true} key={index} text={tag.name} type={Priority.SECONDARY}
                                         isSelected={selectedLabel === tag.slug} onClickFunction={handleFilterPerTag} slug={tag.slug}/>
                            )
                        })}
                    </TagContainer>
                </div>
                }
                <MainPosts items={posts}/>
            </Container>
        </Layout>
    )
};

Category.getInitialProps = async ({query}) => {
    const findKey = query.key || query.label;

    const posts = await getPostsByCategories(findKey);
    const labels = await getLabels();

    const title = await getTitlesFromPage(query.label);

    const tags = await getChildrenCategories(query.label);

    const selectedLabel = query.key || TagsLabels.ALL;

    return {posts, labels, title, tags, selectedLabel}
}

export default Category;


/*
export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {


    const findKey = params.label;
    const posts = await getPostsByCategories(findKey);
    const labels = await getLabels();
    const title = await getTitlesFromPage(params.label);
    const tags = await getChildrenCategories(params.label);
   const selectedLabel = findKey || TagsLabels.ALL;



    return {
        props: {labels, preview, posts, title, tags, selectedLabel},
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}
*/
