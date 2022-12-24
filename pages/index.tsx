import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../components/containers/container/container'
import Layout from '../components/layout'
import {getAllPostsForHome} from '../lib/api'
import {CarouselUnit} from '../components/widgets/carousel/carousel-unit';
import {useState} from 'react';
import Tag from '../components/components/tag/tag';
import {Alignment, Priority} from '../components/utils/constants';
import TagContainer from '../components/containers/tag-container/tag-container';
import MainPosts from '../components/widgets/main-posts/main-posts';

export default function Index({allPosts: {edges}, preview}) {
    const heroPost = edges[0]?.node
    const carouselPost = edges.slice(0, 3);
    const mainPosts = edges.slice(3, 5)
    const morePosts = edges.slice(5);
    const tags = ['mostrar todos', 'aves', 'bom de assistir', 'BOM DE FAZER', 'BOM SABER', 'DOCES E SOBREMESAS', 'CARNES', 'CURIOSIDADES'];
    const [tagSelected, setTagSelected] = useState('mostrar todos');


    return (
        <Layout preview={preview}>
            <Head>
                <title>Bom de Beer Blog</title>
            </Head>

            <CarouselUnit posts={carouselPost}></CarouselUnit>
            <Container>
                <div className="py-16">
                    <TagContainer alignment={Alignment.CENTER}>
                        {tags.map((tag, index) => {
                            const isSelected = tag === tagSelected;
                            return (
                                <Tag key={index} clickable={true} text={tag} type={Priority.SECONDARY}
                                     isSelected={isSelected}/>
                            )
                        })}
                    </TagContainer>
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
            <MainPosts items={mainPosts}/>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({preview = false}) => {
    const allPosts = await getAllPostsForHome(preview)

    return {
        props: {allPosts, preview},
        revalidate: 10,
    }
}
