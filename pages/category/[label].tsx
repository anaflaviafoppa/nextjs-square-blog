import React from 'react';
import LayoutCategory from '../../components/layouts/layout-category';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getPostsByCategories, getTitlesFromPage} from '../../lib/services/category';
import {getLabels} from '../../lib/services/header';

function Category({labels, posts,title, preview}) {
    return(
        <LayoutCategory labels={labels} title={title} posts={posts} preview={preview}></LayoutCategory>
    )
};

export default Category

export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {



    const posts = await getPostsByCategories(params.label);

    const labels = await getLabels();

    const title = await getTitlesFromPage(params.label);

    return {
        props: {labels, preview, posts, title},
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}
