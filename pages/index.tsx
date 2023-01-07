import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../components/containers/container/container'
import Layout from '../components/layout'
import {getAllPostsForHome, getCategories} from '../lib/api'
import {CarouselUnit} from '../components/widgets/carousel/carousel-unit';
import React, {useState} from 'react';
import Tag from '../components/components/tag/tag';
import {Alignment, IdsName, Priority, TagsLabels} from '../components/utils/constants';
import TagContainer from '../components/containers/tag-container/tag-container';
import MainPosts from '../components/widgets/main-posts/main-posts';
import Cards from '../components/widgets/cards/cards';
import ImageSection from '../components/components/image-section/image-section';
import {getHeaderCTA, getLabels} from '../lib/services/header';
import {getAllCategories} from '../lib/services/category';
import Link from 'next/link';
import {contentAllPages} from '../lib/services/allPages';
import {listOfImages} from '../lib/services/gallery';

export default function Index({allPosts: {edges},labels, CTAHeader,footer,listImages,  carouselPosts, allCategories, preview}) {
    const heroPost = edges[0]?.node
    const carouselPost = carouselPosts?.edges;
    const mainPosts = edges.slice(3, 5)
    const morePosts = edges.slice(2);
    // const formNewsLetterContent = formNewsletter?.content;

    return (
        <Layout preview={preview} labels={labels} CTAHeader={CTAHeader}
                footer={footer}
                allCategories={allCategories}>
            <Head>
                <title>Bom de Beer Blog</title>
                <meta name="description" content="Bom de Beer Blog que traz receitas e dicas no mundo da cerveja" />
            </Head>

            <CarouselUnit id={IdsName.CAROUSEL} posts={carouselPost} />
            <Container>
                <div className="py-16">
                    {allCategories && <TagContainer alignment={Alignment.CENTER}>

                        <Link href={'/'}>
                            <Tag clickable={true} text={'Mostrar Todos'} type={Priority.PRIMARY}
                                 isSelected={true}
                                 slug={TagsLabels.ALL}
                            />
                        </Link>

                        {allCategories?.map((tag, index) => {
                            return (
                                <Link href={tag.path} key={index}>
                                    <Tag key={index} clickable={true} text={tag.name} type={Priority.SECONDARY}
                                         isSelected={false} />
                                </Link>
                            )
                        })}
                    </TagContainer>}
                </div>

                {/*{heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
            </Container>
            {/*{formNewsLetterContent && <div dangerouslySetInnerHTML={{__html: formNewsLetterContent}}/>}*/}
            <MainPosts items={mainPosts}/>
            <ImageSection listImages={listImages}/>
            <Cards items={morePosts}
                   title={'Veja Também'}
                   isEnabledSeeMore={true}
                   maxPosts={6}
            />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {

    const allPosts = await getAllPostsForHome(preview);
    const carouselPosts = await getCategories('carousel', preview);

    const listImages = await listOfImages();
    const globalContent = await contentAllPages();
    const {labels, CTAHeader, footer, allCategories} = globalContent;

    return {
        props: {allPosts,listImages, labels, preview, allCategories, CTAHeader,footer, carouselPosts},
        revalidate: 10,
    }
}
