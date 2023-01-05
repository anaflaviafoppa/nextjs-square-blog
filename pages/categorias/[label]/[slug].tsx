import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getHeaderCTA, getLabels} from '../../../lib/services/header';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../../lib/services/category';
import {TagsLabels} from '../../../components/utils/constants';
import LayoutCategory from '../../../components/layouts/layout-category';
import {contentAllPages} from '../../../lib/services/allPages';

export default function SubCategory({labels, posts, title, tags, selectedLabel,CTAHeader,footer, allCategories, preview}) {
    return (
        <LayoutCategory labels={labels}
                        posts={posts}
                        title={title}
                        tags={tags}
                        selectedLabel={selectedLabel}
                        preview={preview}
                        CTAHeader={CTAHeader}
                        footer={footer}
                        allCategories={allCategories}

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
    const globalContent = await contentAllPages();
    const {labels, CTAHeader, footer, allCategories} = globalContent;

    const title = await getTitlesFromPage(params.label);

    const tags = await getChildrenCategories(params.label);

    const selectedLabel = findKey || TagsLabels.ALL;
    console.log(footer)

    return {
        props: {
            preview,
            posts,
            labels,
            title,
            tags,
            selectedLabel,
            CTAHeader,
            footer, allCategories
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
