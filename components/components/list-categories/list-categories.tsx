import React from 'react';
import Link from 'next/link';

interface Props {
    tags: any,
    color?: string
}

function ListCategories({tags, color}: Props) {
    const className = color ? 'header-list-' + color : 'header-list';

    return (
        <>
            {tags?.map((tag, index) => (
                    <Link href={`/categorias${tag?.path}/${tag.slug}`} key={index}>
                        <p className={className}
                        >{tag.label}</p>
                    </Link>
                )
            )}
        </>
    );
}

export default ListCategories;
