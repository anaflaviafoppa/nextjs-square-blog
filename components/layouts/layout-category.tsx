import React from 'react';
import {useRouter} from 'next/router';
import Layout from '../layout';
import Container from '../containers/container/container';
import MainPosts from '../widgets/main-posts/main-posts';

function LayoutCategory({labels, posts, preview}) {

    return(
        <Layout preview={preview} labels={labels}>
            <Container>
                <MainPosts items={posts}/>
            </Container>
        </Layout>
    )
}

export default LayoutCategory;
