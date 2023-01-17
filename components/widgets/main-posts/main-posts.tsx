import React, {useState} from 'react';
import MainPostItem from '../../components/main-post-item/main-post-item';
import {Order} from '../../utils/constants';
import Link from 'next/link';
import styles from "./main-post.module.scss";
import { motion } from "framer-motion";


function MainPosts({items, isEnabledSeeMore = false, maxPosts = 3}) {
    const [countItems, setCountItems]  = useState(maxPosts);


    function checkOrder(index) {
        const isEven = (index+1)%2 === 0;
        if (isEven) {
            return Order.REVERT;
        }

        return Order.NORMAL;

    }

    const addItems = (): void => {
        setCountItems(countItems + 3);
    }


    return (
        <>
            {
                items?.map(({ node }, index) => {
                    if(index + 1 > countItems) {
                        return;
                    }

                    const order = checkOrder(index);
                    const tags = node?.categories?.nodes;
                    const category = tags?.find(tag => !tag.parentId);

                    return (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            key={index}
                        >
                            <MainPostItem
                                title={node.title}
                                category={category}
                                date={node.date}
                                excerpt={node.excerpt}
                                tags={tags}
                                order={order}

                                link={`/posts/${node.slug}`}
                                featuredImage={node.featuredImage}
                            />
                        </motion.div>
                    )
                })
            }

            { isEnabledSeeMore && countItems < items?.length &&
                <div className={styles.main__container}>
                    <button onClick={() => addItems()} className="mt-11 button__primary-dark">Veja Mais</button>
                </div>
            }
        </>
    );
}

export default MainPosts;
