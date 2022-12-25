import React from 'react';
import TemporaryBanner from '../../../public/images/temporary_banner.png'
import Image from 'next/image';

function PostBanner(props) {
    return (
        <section className="section">
            <div className="title__border_container mb-16">
                <div className="title__border">
                    <h3>Ofertas Exclusivas em nosso site</h3>
                </div>
            </div>
            <Image src={TemporaryBanner} alt={'Banner'} />
        </section>
    );
}

export default PostBanner;
