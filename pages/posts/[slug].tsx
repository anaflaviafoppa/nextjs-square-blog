import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import {GetStaticPaths, GetStaticProps} from 'next'
import Container from '../../components/containers/container/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/components/post-header/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/components/post-title/post-title'
import Tags from '../../components/tags'
import {getAllPostsWithSlug, getBannerSelected, getPostAndMorePosts} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import TagContainer from '../../components/containers/tag-container/tag-container';
import {Alignment, Priority} from '../../components/utils/constants';
import Tag from '../../components/components/tag/tag';
import {getHeaderCTA, getLabels} from '../../lib/services/header';

export default function Post({post, posts, labels,banner,CTAHeader, preview}) {
    const router = useRouter()
    const morePosts = posts?.edges;
    const tags = post?.categories?.edges;


    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404}/>
    }

    return (
        <Layout preview={preview} labels={labels} CTAHeader={CTAHeader}>
            {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
            ) : (
                <>
                    <article>
                        <Head>
                            <title>
                                {post.title} | Next.js Blog Example with {CMS_NAME}
                            </title>
                            <meta
                                property="og:image"
                                content={post.featuredImage?.node.sourceUrl}
                            />
                        </Head>
                        <PostHeader
                            title={post.title}
                            coverImage={post.featuredImage}
                            date={post.date}
                            author={post.author}
                            categories={post.categories}
                        />
                        <Container>
                            <section className="section">
                                <Container>
                                    <TagContainer alignment={Alignment.CENTER}>
                                        {tags.map(({node}, index) => {
                                            return (
                                                <Tag key={index} clickable={false} text={node.name}
                                                     type={Priority.PRIMARY}
                                                     isSelected={false}/>
                                            )
                                        })}
                                    </TagContainer>
                                </Container>
                            </section>

                            <PostBody banner={banner} category={'BOM DE BEER'} date={post.date}   content={post.content}/>


                            <footer>
                                {post.tags.edges.length > 0 && <Tags tags={post.tags}/>}
                            </footer>

                        </Container>
                    </article>

                    <SectionSeparator/>
                    {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
                </>
            )}

        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({
                                                         params,
                                                         preview = false,
                                                         previewData,
                                                     }) => {
    const data = await getPostAndMorePosts(params?.slug, preview, previewData)
    const labels = await getLabels();
    const CTAHeader = await getHeaderCTA();
    const banner = await getBannerSelected(preview);

    return {
        props: {
            preview,
            post: data.post,
            posts: data.posts,
            labels,
            banner,
            CTAHeader
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getAllPostsWithSlug();


    return {
        paths: allPosts.edges.map(({node}) => `/posts/${node.slug}`) || [],
        fallback: true,
    }
}
