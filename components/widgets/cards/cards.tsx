import React, {useState} from 'react';
import Container from '../../containers/container/container';
import CardItem from '../../components/card-item/card-item';
import styles from './cards.module.scss';
import UnderlinedTitle from '../../components/underlined-title/underlined-title';
import Link from 'next/link';
import { motion } from "framer-motion";

interface Props {
    items: any,
    title: string,
    maxPosts: number,
    isEnabledSeeMore: boolean,
    enabledTitle?: boolean
}

function Cards({items, title, maxPosts, isEnabledSeeMore, enabledTitle = true}: Props) {
    const [countItems, setCountItems]  = useState(maxPosts);

    const addItems = (): void => {
        setCountItems(countItems + 3);
    }

    return (
        <section className={'mt-16 mb-16 section ' + styles.cards}>

                <Container>
                    {enabledTitle && <UnderlinedTitle title={title} date={''}/>}
                </Container>
                {items && <div className={styles.cards__container}>
                    {items.map(({node}, index) => {
                        if (index + 1 > countItems) {
                            return;
                        }

                        const tags = node?.categories?.nodes || node?.categories?.edges;
                        const category = tags?.find(tag => !tag.parentId);

                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                key={index}
                            >
                                <CardItem
                                    key={index}
                                    title={node.title}
                                    excerpt={node.excerpt}
                                    date={node.date}
                                    slug={node.slug}
                                    category={category}
                                    link={`/posts/${node.slug}`}
                                    featuredImage={node.featuredImage}
                                />
                            </motion.div>
                    )})}
                </div>}

                { isEnabledSeeMore && countItems < items.length &&
                    <div className={styles.cards__button_container}>
                        <button onClick={() => addItems()} className="mt-11 button__primary-dark">Veja Mais</button>
                    </div>
                }


        </section>
    );
}

export default Cards;
