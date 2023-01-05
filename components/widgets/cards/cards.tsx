import React, {useState} from 'react';
import Container from '../../containers/container/container';
import CardItem from '../../components/card-item/card-item';
import styles from './cards.module.scss';
import UnderlinedTitle from '../../components/underlined-title/underlined-title';
import Link from 'next/link';

function Cards({items, title, maxPosts, isEnabledSeeMore}) {
    const [countItems, setCountItems]  = useState(maxPosts);

    const addItems = (): void => {
        setCountItems(countItems + 3);
    }

    return (
        <section className={'mt-16 mb-16 section ' + styles.cards}>

            <Container>

                <UnderlinedTitle title={title}  date={''}/>
                {items && <div className={styles.cards__container}>
                    {items.map(({node}, index) => {
                        if (index + 1 > countItems) {
                            return;
                        }

                        const tags = node?.categories?.nodes || node?.categories?.edges;
                        const category = tags?.find(tag => !tag.parentId);

                        return (
                            <Link key={index} href={`/posts/${node.slug}`}>
                                <CardItem
                                    key={index}
                                    title={node.title}
                                    excerpt={node.excerpt}
                                    date={node.date}
                                    slug={node.slug}
                                    category={category}
                                    featuredImage={node.featuredImage}
                                />
                            </Link>
                        )
                    })}
                </div>}

                { isEnabledSeeMore && countItems < items.length &&
                    (<button onClick={() => addItems()} className="mt-11 button__primary-dark">Veja Mais</button>)
                }
            </Container>


        </section>
    );
}

export default Cards;
