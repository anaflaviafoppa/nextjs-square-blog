import Head from 'next/head'
import {GetStaticProps} from 'next'
import Container from '../components/containers/container/container'
import Layout from '../components/layout'
import {getAllPostsForHome, getHeaderContent} from '../lib/api'
import {CarouselUnit} from '../components/widgets/carousel/carousel-unit';
import {useState} from 'react';
import Tag from '../components/components/tag/tag';
import {Alignment, Priority} from '../components/utils/constants';
import TagContainer from '../components/containers/tag-container/tag-container';
import MainPosts from '../components/widgets/main-posts/main-posts';
import Cards from '../components/widgets/cards/cards';
import ImageSection from '../components/components/image-section/image-section';

export default function Index({allPosts: {edges},labels, preview}) {
    const heroPost = edges[0]?.node
    const carouselPost = edges.slice(0, 3);
    const mainPosts = edges.slice(3, 5)
    const morePosts = edges.slice(2);
    const tags = ['mostrar todos', 'aves', 'bom de assistir', 'BOM DE FAZER', 'BOM SABER', 'DOCES E SOBREMESAS', 'CARNES', 'CURIOSIDADES'];
    const [tagSelected, setTagSelected] = useState('mostrar todos');


    return (
        <Layout preview={preview} labels={labels}>
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
            <ImageSection />
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
    const data = await getHeaderContent();



    const node = data?.nodes[0];


    const structureNavbar = node.menuItems?.edges;
    console.log(structureNavbar);
    let labels = [];
    function addNewMainLabel({label, id}) {
        labels.push({label, id, children: []});
    }

    function addCategory({label, parentId, path}) {
        const parentIndex = labels.findIndex(item => item.id === parentId);
        const parent = labels[parentIndex];
        const children = parent.children;
        children.push({label, path});
        labels.splice(parentIndex, 1, {label: parent.label, id: parent.id, children});
    }

    structureNavbar.forEach(({node}) => {
        const label = node.label;
        const id = node.id;
        const parentId = node.parentId;
        const path = node.path;
        if(!parentId) {
            addNewMainLabel({label, id});
        } else {
            addCategory({label, path, parentId})
        }
    })



    console.log('labels',labels)

    return {
        props: {allPosts, labels, preview},
        revalidate: 10,
    }
}
