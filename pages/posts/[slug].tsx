import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import {GetStaticPaths, GetStaticProps} from 'next'
import Container from '../../components/containers/container/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/components/post-header/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/components/post-title/post-title'
import {getAllPostsWithSlug, getBannerSelected, getPostAndMorePosts} from '../../lib/api'
import {CMS_NAME} from '../../lib/constants'
import TagContainer from '../../components/containers/tag-container/tag-container';
import {Alignment, Priority} from '../../components/utils/constants';
import Tag from '../../components/components/tag/tag';
import {contentAllPages} from '../../lib/services/allPages';
import {useEffect, useState} from "react";


export default function Post({post, posts, labels,banner,CTAHeader, footer, allCategories, preview}) {
    const router = useRouter()
    const morePosts = posts?.edges;
    const tags = post?.categories?.edges;
    const category = allCategories?.find((category) => {
        return category.parentId === null;
    })?.name || allCategories?.[0]?.name;
    const [pathName, setPathName] = useState('')


    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404}/>
    }

    useEffect(() => {
        setPathName(window.location.href);
    }, [])

    return (
        <Layout preview={preview} labels={labels} CTAHeader={CTAHeader}
                footer={footer}
                allCategories={allCategories}
        >
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
                            displayImage={true}
                            title={post.title}
                            coverImage={post.featuredImage}
                            date={post.date}
                            author={post.author}
                            categories={post.categories}
                        />

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


                            <PostBody path={pathName} banner={banner} title={post.title} category={category} date={post.date}   content={post.content}/>

                    </article>


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
    const banner = await getBannerSelected(preview);

    const globalContent = await contentAllPages();
    const {labels, CTAHeader, footer, allCategories} = globalContent;

    return {
        props: {
            preview,
            post: data.post,
            posts: data.posts,
            labels,
            banner,
            CTAHeader,
            footer, allCategories
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
