import {useEffect, useState} from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../lib/services/category';
import {getLabels} from '../../lib/services/header';
import styles from '../../components/layouts/layout-category.module.scss';
import Container from '../../components/containers/container/container';
import TagContainer from '../../components/containers/tag-container/tag-container';
import {Alignment, Priority, TagsLabels} from '../../components/utils/constants';
import Link from 'next/link';
import Tag from '../../components/components/tag/tag';
import MainPosts from '../../components/widgets/main-posts/main-posts';
import Layout from '../../components/layout';

interface Props {
    labels: any,
    posts: any,
    title: any,
    tags: any,
    preview: any,
    selectedLabel: string
}

function Category({labels, posts,title, tags, selectedLabel, preview}) {
    const mainTest = title?.[0].node?.title;
    const content = title?.[0].node?.content;
    const tagsList = tags?.children?.nodes;

    const [listPost, setListPosts] = useState(posts);
    const [selectedTag, setSelectedTag] = useState(selectedLabel);


    const handleFilterPerTag = async (findKey: string): Promise<void> => {
        const newPosts = await getPostsByCategories(findKey);
        setListPosts(newPosts);
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
                { tagsList.length > 1 &&
                <div className="container-y">
                    <TagContainer alignment={Alignment.CENTER}>
                        <Link href={'/'}>
                            <Tag clickable={true} text={'Mostrar Todos'} type={Priority.PRIMARY}
                                 isSelected={selectedLabel === TagsLabels.ALL}/>
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
                <MainPosts items={listPost}/>
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

export default Category

/*export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {



    const posts = await getPostsByCategories(params.label);

    const labels = await getLabels();

    const title = await getTitlesFromPage(params.label);

    const tags = await getChildrenCategories(params.label);
    console.log('TAGS----------', tags)

    return {
        props: {labels, preview, posts, title, tags},
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}*/
