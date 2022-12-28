import React from 'react';
import MainPostItem from '../../components/main-post-item/main-post-item';
import {Order} from '../../utils/constants';

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
                        <MainPostItem
                            title={node.title}
                            key={index}
                            category={category}
                            date={node.date}
                            excerpt={node.excerpt}
                            tags={tags}
                            slug={node.slug}
                            order={order}
                            featuredImage={node.featuredImage}
                        />
                    )
                })
            }
        </>
    );
}

export default MainPosts;
