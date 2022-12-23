import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import {CarouselUnit} from '../components/widgets/carousel/carouselUnit';

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node
    const carouselPost = edges.slice(0,3);
  const morePosts = edges.slice(3);


  return (
    <Layout preview={preview}>
      <Head>
        <title>Bom de Beer Blog</title>
      </Head>
        <CarouselUnit posts={carouselPost}></CarouselUnit>
      <Container>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}
