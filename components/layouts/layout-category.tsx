import React from 'react';
import Layout from '../layout';
import styles from './layout-category.module.scss';
import Container from '../containers/container/container';
import TagContainer from '../containers/tag-container/tag-container';
import {Alignment, Priority, TagsLabels} from '../utils/constants';
import Link from 'next/link';
import Tag from '../components/tag/tag';
import MainPosts from '../widgets/main-posts/main-posts';
import {useRouter} from 'next/router';

function LayoutCategory({labels, posts, title, tags, selectedLabel,CTAHeader, preview}) {
    const router = useRouter();
    const mainTest = title?.[0]?.node?.title;
    const content = title?.[0]?.node?.content;
    const tagsList = tags?.children?.nodes;

    return (
        <Layout preview={preview} labels={labels} CTAHeader={CTAHeader}>
            <div className={'container-large ' + styles.layout__title}>
                <div>
                    <h1 className="big-title">{mainTest}</h1>
                    <div
                        className="big-subtitle"
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                </div>
            </div>
            <Container>
                {tagsList?.length > 1 &&
                    <div className="container-y">
                        <TagContainer alignment={Alignment.CENTER}>
                            <Link href={'/categorias/' + router.query.label}>
                                <Tag clickable={true} text={'Mostrar Todos'} type={Priority.PRIMARY}
                                     isSelected={selectedLabel === TagsLabels.ALL}
                                     slug={TagsLabels.ALL}
                                />
                            </Link>
                            {tagsList?.map((tag, index) => {
                                return (
                                    <Link href={'/categorias/' + router.query.label + '/' + tag.slug} key={index}>
                                        <Tag clickable={true}  text={tag.name} type={Priority.SECONDARY}
                                         isSelected={selectedLabel === tag.slug}
                                         slug={tag.slug}/>
                                    </Link>
                                )
                            })}
                        </TagContainer>
                    </div>
                }
                <MainPosts items={posts}/>
            </Container>
        </Layout>
    )
}


export default LayoutCategory;
