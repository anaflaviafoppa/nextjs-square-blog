import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getLabels} from '../../../lib/services/header';
import Layout from '../../../components/layout';
import {getAllPostsWithSlug} from '../../../lib/api';
import {useRouter} from 'next/router';
import {getPostsByCategories} from '../../../lib/services/category';
import Container from '../../../components/containers/container/container';
import MainPosts from '../../../components/widgets/main-posts/main-posts';

function Category({labels, posts, preview}) {
    const router = useRouter();

    return(
    <Layout preview={preview} labels={labels}>
        <Container>
            <MainPosts items={posts}/>
        </Container>
    </Layout>
)
;
}

export default Category;

export const getStaticProps: GetStaticProps = async ({params,
                                                         preview = false,
                                                         previewData,}) => {


    const posts = await getPostsByCategories(params.slug);
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



