import React from 'react';
import Layout from '../components/layout';
import {GetStaticProps} from 'next';
import {getAboutUsContent} from '../lib/api';
import Container from '../components/containers/container/container';
import styles from '../styles/pages/sobre-nos.module.scss'
import {contentAllPages} from '../lib/services/allPages';
import Link from 'next/link';
import Head from "next/head";

export default function SobreNos({preview, content, title, image,footer, allCategories, labels, CTAHeader}) {
    const style = {
        backgroundImage: `url(${image.node.sourceUrl})`,
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    }

    return (
        <Layout preview={preview} labels={labels} CTAHeader={CTAHeader}
                footer={footer}
                allCategories={allCategories}
        >
            <Head>
                <title>Bom de Beer Blog - About Us</title>
                <meta name="description" content='O Bom de Beer surgiu em 2016, como um espaço para conversar sobre cerveja. Aqui, nós mostramos que malte e lúpulo são muito mais do que meros ingredientes, e como a cultura cervejeira é gigante pelo mundo todo.' />
            </Head>

            <section className={styles.about}>
                <div className={styles.about__content}>
                    <Container>
                        <h1 className="big-title">{title}</h1>
                        <div className="margin-80-bottom" dangerouslySetInnerHTML={{ __html: content }} />
                        <Link href='https://www.bomdebeer.com.br/' target="_blank">
                            <button className="button__primary">Confira nosso site</button>
                        </Link>
                    </Container>
                </div>

                <div className={styles.about__circle_container}>
                    <div className={styles.about__circle}>
                    </div>
                    <div className={styles.about__image}  style={style}>
                    </div>
                </div>

            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {

    const globalContent = await contentAllPages();
    const {labels, CTAHeader, footer, allCategories} = globalContent;
    const node = footer.aboutUsContent?.edges[0].node;



    return {
        props: {
            preview,
            content: node?.content || '',
            title: node?.title,
            image: node?.featuredImage,
            labels,
            CTAHeader,
            footer, allCategories
        },
        revalidate: 10,
    }
}
