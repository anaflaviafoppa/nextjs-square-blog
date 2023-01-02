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

    const handleFilterPerTag = (findKey: string) => {
        let pathname = '/categorias/' + router.query.label


        const isSubCategory = findKey !== TagsLabels.ALL;
        if (isSubCategory) {
            pathname = pathname + '/' + findKey;
        }

        router.replace({pathname}, undefined, {shallow: true}).then(() => {
            router.reload();
        })
    }

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
                            <Link href={'/'}>
                                <Tag clickable={true} text={'Mostrar Todos'} type={Priority.PRIMARY}
                                     isSelected={selectedLabel === TagsLabels.ALL}
                                     slug={TagsLabels.ALL}
                                     onClickFunction={handleFilterPerTag}
                                />
                            </Link>
                            {tagsList?.map((tag, index) => {
                                return (
                                    <Tag clickable={true} key={index} text={tag.name} type={Priority.SECONDARY}
                                         isSelected={selectedLabel === tag.slug} onClickFunction={handleFilterPerTag}
                                         slug={tag.slug}/>
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
