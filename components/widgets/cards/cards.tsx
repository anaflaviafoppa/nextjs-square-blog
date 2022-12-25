import React, {useState} from 'react';
import Container from '../../containers/container/container';
import CardItem from '../../components/card-item/card-item';
import styles from './cards.module.scss';

function Cards({items}) {
    const [countItems, setCountItems]  = useState(6);

    const addItems = (): void => {
        setCountItems(countItems + 3);
    }

    return (
        <section className={'mt-16 mb-16 ' + styles.cards}>

            <Container>

                <div className="title__border_container mb-16">
                    <div className="title__border">
                        <h3>Veja Também</h3>
                    </div>
                </div>
                <div className={styles.cards__container}>
                    {items.map(({node}, index) => {
                        if (index + 1 > countItems) {
                            return;
                        }

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

                { countItems < items.length &&
                    (<button onClick={() => addItems()} className="mt-11 button__primary-dark">Veja Mais</button>)
                }
            </Container>


        </section>
    );
}

export default Cards;
