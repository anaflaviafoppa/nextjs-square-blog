import React, {useEffect} from 'react';
import Layout from '../../components/layout';
import Cards from '../../components/widgets/cards/cards';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getFilteredItems} from '../../lib/services/search';
import {useRouter} from 'next/router';
import {contentAllPages} from '../../lib/services/allPages';
import Head from "next/head";
import Container from "../../components/containers/container/container";
import Image from "next/image";
import Link from "next/link";

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
            {!posts?.length &&
                <div className="py-24">
                    <Container>
                        <h2>Nenhum resultado:</h2>
                        <p className='mb-16'>Desculpe, mas nada corresponde aos seus termos de pesquisa de {searchKey}.
                            Por favor, tente novamente com algumas palavras-chave diferentes.</p>
                        <Link href='/' className='mb-10'>
                            <button className='text-base button__primary button__primary-rounded'>
                                Voltar para Home
                            </button>
                        </Link>
                    </Container>
                </div>}

        </Layout>
    );
}

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



