import {GetStaticPaths, GetStaticProps} from 'next';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../lib/services/category';
import {getHeaderCTA, getLabels} from '../../lib/services/header';
import {TagsLabels} from '../../components/utils/constants';
import LayoutCategory from '../../components/layouts/layout-category';
import {contentAllPages} from '../../lib/services/allPages';


interface Props {
    labels: any,
    posts: any,
    title: any,
    tags: any,
    preview: any,
    selectedLabel: string,
    CTAHeader: any,
    footer: any,
    allCategories: any
}

function Category({labels, posts,title, tags, selectedLabel, CTAHeader, footer, allCategories, preview}: Props) {
    return(
       <LayoutCategory labels={labels}
                       posts={posts}
                       title={title}
                       tags={tags}
                       CTAHeader={CTAHeader}
                       selectedLabel={selectedLabel}
                       preview={preview}
                       footer={footer}
                       allCategories={allCategories}
       />
    )
}

export default Category;


export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {


    const findKey = params.label;
    const posts = await getPostsByCategories(findKey);
    const title = await getTitlesFromPage(params.label);
    const tags = await getChildrenCategories(params.label);
    const selectedLabel = TagsLabels.ALL;
    const globalContent = await contentAllPages();
    const {labels, CTAHeader, footer, allCategories} = globalContent;


    return {
        props: {labels, preview, posts, title, tags, selectedLabel, CTAHeader, footer, allCategories},
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}
