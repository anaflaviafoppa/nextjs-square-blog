import React, {useEffect} from 'react';
import Layout from '../../components/layout';
import Container from '../../components/containers/container/container';
import Cards from '../../components/widgets/cards/cards';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import {getHeaderCTA, getLabels} from '../../lib/services/header';
import {getFilteredItems} from '../../lib/services/search';
import {useRouter} from 'next/router';
import {getHeaderContent} from '../../lib/controllers/header';

interface Props {
    labels: any,
    posts: any,
    searchKey: string,
    preview: any,
    CTAHeader: any
}

export default function Search ({labels, posts, searchKey, preview,CTAHeader }: Props) {
    const router = useRouter()

    useEffect(() => {
    }, [router.query.key]);

    return (
        <Layout labels={labels} searchKey={searchKey} preview={preview} CTAHeader={CTAHeader}>
            <Container>
                {
                    !!posts?.length && <Cards items={posts}
                                    title={'Veja Também'}
                                    isEnabledSeeMore={true}
                                    maxPosts={6}
                    />
                }
                {!posts?.length && <h1>No results</h1>}
            </Container>
        </Layout>
    );
}

/*
Search.getInitialProps = async ({query, pathname}) => {
    const labels = await getLabels();
    const posts = await getFilteredItems(query.key);
    return {labels, posts}
}
*/

export const getStaticProps: GetStaticProps = async ({
                                                         params,
                                                         preview = false,
                                                         previewData,
                                                     }) => {

    const labels = await getLabels();
    const CTAHeader = await getHeaderCTA();
    const posts = await getFilteredItems(params.search);
    return {
        props: {
            preview,
            labels,
            posts,
            searchKey: params.search,
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



