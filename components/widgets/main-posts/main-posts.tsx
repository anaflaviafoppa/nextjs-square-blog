import React from 'react';
import MainPostItem from '../../components/main-post-item/main-post-item';
import {Order} from '../../utils/constants';
import Link from 'next/link';

function MainPosts({items}) {


    function checkOrder(index) {
        const isEven = (index+1)%2 === 0;
        if (isEven) {
            return Order.REVERT;
        }

        return Order.NORMAL;

    }

    return (
        <>
            {
                items?.map(({ node }, index) => {
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
        </>
    );
}

export default MainPosts;
