import React from 'react';
import Container from '../../containers/container/container';
import Date from '../../date';
import CardItem from '../../components/card-item/card-item';

function Cards({items}) {
    return (
        <section>
            <Container>
                <div className="title__border_container">
                    <div className="title__border">
                        <h3>Veja Também</h3>
                    </div>
                </div>
                <div>
                    {items.map(({ node }, index) => {
                        const category = 'BOM DE BEER';
                        return (
                            <CardItem
                                key={index}
                                title={node.title}
                                excerpt={node.excerpt}
                                date={node.date}
                                slug={node.slug}
                                category={category}
                            />
                        )
                    })}
                </div>
            </Container>
        </section>
    );
}

export default Cards;
