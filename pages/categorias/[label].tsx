import {GetStaticPaths, GetStaticProps} from 'next';
import {getChildrenCategories, getPostsByCategories, getTitlesFromPage} from '../../lib/services/category';
import {getLabels} from '../../lib/services/header';
import {TagsLabels} from '../../components/utils/constants';
import LayoutCategory from '../../components/layouts/layout-category';

interface Props {
    labels: any,
    posts: any,
    title: any,
    tags: any,
    preview: any,
    selectedLabel: string
}

function Category({labels, posts,title, tags, selectedLabel, preview}: Props) {
    return(
       <LayoutCategory labels={labels}
                       posts={posts}
                       title={title}
                       tags={tags}
                       selectedLabel={selectedLabel}
                       preview={preview}/>
    )
}

export default Category;


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
