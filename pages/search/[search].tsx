import React, {useEffect} from 'react';
import Layout from '../../components/layout';
import Cards from '../../components/widgets/cards/cards';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getFilteredItems} from '../../lib/services/search';
import {useRouter} from 'next/router';
import {contentAllPages} from '../../lib/services/allPages';
import Head from "next/head";

interface Props {
    labels: any,
    posts: any,
    searchKey: string,
    preview: any,
    CTAHeader: any,
    footer: any,
    allCategories: any
}

export default function Search({labels, posts, searchKey, footer, allCategories, preview, CTAHeader}: Props) {
    const router = useRouter()

    useEffect(() => {
    }, [router.query.key]);

    return (
        <Layout labels={labels} searchKey={searchKey}
                preview={preview} CTAHeader={CTAHeader}
                footer={footer}
                allCategories={allCategories}
        >
            <Head>
                <title>Bom de Beer Blog - Search Page</title>
                <meta name="description" content={'Filtro de para todos os resultados de ' + searchKey} />
            </Head>

            {
                !!posts?.length && <Cards items={posts}
                                          title={''}
                                          enabledTitle={false}
                                          isEnabledSeeMore={true}
                                          maxPosts={6}
                />
            }
            {!posts?.length && <h1>No results</h1>}

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

    const posts = await getFilteredItems(params.search);
    const globalContent = await contentAllPages();
    const {labels, CTAHeader, footer, allCategories} = globalContent;

    return {
        props: {
            preview,
            labels,
            posts,
            searchKey: params.search,
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



