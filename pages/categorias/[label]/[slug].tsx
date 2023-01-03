import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getHeaderCTA, getLabels} from '../../../lib/services/header';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../../lib/services/category';
import {TagsLabels} from '../../../components/utils/constants';
import LayoutCategory from '../../../components/layouts/layout-category';

export default function SubCategory({labels, posts, title, tags, selectedLabel,CTAHeader, preview}) {
    return (
        <LayoutCategory labels={labels}
                        posts={posts}
                        title={title}
                        tags={tags}
                        selectedLabel={selectedLabel}
                        preview={preview}
                        CTAHeader={CTAHeader}

        />
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
    const CTAHeader = await getHeaderCTA();

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
            selectedLabel,
            CTAHeader
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
