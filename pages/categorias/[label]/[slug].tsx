import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getLabels} from '../../../lib/services/header';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../../lib/services/category';
import {TagsLabels} from '../../../components/utils/constants';
import LayoutCategory from '../../../components/layouts/layout-category';

export default function SubCategory({labels, posts, title, tags, selectedLabel, preview}) {
    return (
        <LayoutCategory labels={labels}
                        posts={posts}
                        title={title}
                        tags={tags}
                        selectedLabel={selectedLabel}
                        preview={preview}/>
    )
        ;
}


export const getStaticProps: GetStaticProps = async ({
                                                         params,
                                                         preview = false,
                                                         previewData,
                                                     }) => {

    const findKey = params.slug || params.label;

    const posts = await getPostsByCategories(findKey);
    const labels = await getLabels();

    const title = await getTitlesFromPage(params.label);

    const tags = await getChildrenCategories(params.label);

    const selectedLabel = findKey || TagsLabels.ALL;

    return {
        props: {
            preview,
            posts,
            labels,
            title,
            tags,
            selectedLabel
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}