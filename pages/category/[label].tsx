import React from 'react';
import LayoutCategory from '../../components/layouts/layout-category';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getPostsByCategories} from '../../lib/services/category';
import {getLabels} from '../../lib/services/header';

function Category({labels, posts, preview}) {
    return(
        <LayoutCategory labels={labels} posts={posts} preview={preview}></LayoutCategory>
    )
};

export default Category

export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {


    const posts = await getPostsByCategories(params.label);
    const labels = await getLabels();

    return {
        props: {labels, preview, posts},
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}
