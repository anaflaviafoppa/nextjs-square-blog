import React, {useState} from 'react';
import MainPostItem from '../../components/main-post-item/main-post-item';
import {Order} from '../../utils/constants';
import Link from 'next/link';
import styles from "../cards/cards.module.scss";

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
                        <Link key={index} href={`/posts/${node.slug}`}>
                            <MainPostItem
                                title={node.title}
                                category={category}
                                date={node.date}
                                excerpt={node.excerpt}
                                tags={tags}
                                order={order}
                                featuredImage={node.featuredImage}
                            />
                        </Link>
                    )
                })
            }

            { isEnabledSeeMore && countItems < items.length &&
                <div className='container-y container-x'>
                    <button onClick={() => addItems()} className="mt-11 button__primary-dark">Veja Mais</button>
                </div>
            }
        </>
    );
}

export default MainPosts;
