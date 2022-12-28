import React from 'react';
import Image from 'next/image';

function PostBanner({banner: {edges}}) {
    const title = edges[0].node.title;
    const featuredImage = edges[0].node.featuredImage;
    const imageUrl = featuredImage.node.sourceUrl;

    return (
        <section className="section">
            <div className="title__border_container mb-16">
                <div className="title__border">
                    <h3>{title}</h3>
                </div>
            </div>
            <div>
                <Image src={imageUrl} alt={'Banner'} width={500} height={250} />
            </div>

        </section>
    );
}

export default PostBanner;
