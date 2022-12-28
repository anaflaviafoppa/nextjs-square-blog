import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getLabels} from '../../../lib/services/header';
import {useRouter} from 'next/router';
import {getPostsByCategories, getTitlesFromPage} from '../../../lib/services/category';
import LayoutCategory from '../../../components/layouts/layout-category';

function CategoryTag({labels, posts,title, preview}) {
    const router = useRouter();

    return(
        <LayoutCategory labels={labels} title={title} posts={posts} preview={preview}></LayoutCategory>
    )
;
}

export default CategoryTag;

export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {


    const posts = await getPostsByCategories(params.slug);
    const labels = await getLabels();
    const title = await getTitlesFromPage(params.slug);

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



