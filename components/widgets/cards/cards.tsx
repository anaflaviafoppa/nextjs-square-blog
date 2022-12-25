import React, {useState} from 'react';
import Container from '../../containers/container/container';
import CardItem from '../../components/card-item/card-item';
import styles from './cards.module.scss';
import UnderlinedTitle from '../../components/underlined-title/underlined-title';

function Cards({items, title, maxPosts, isEnabledSeeMore}) {
    const [countItems, setCountItems]  = useState(maxPosts);

    const addItems = (): void => {
        setCountItems(countItems + 3);
    }

    return (
        <section className={'mt-16 mb-16 section ' + styles.cards}>

            <Container>

                <UnderlinedTitle title={title}  date={''}/>
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

                { isEnabledSeeMore && countItems < items.length &&
                    (<button onClick={() => addItems()} className="mt-11 button__primary-dark">Veja Mais</button>)
                }
            </Container>


        </section>
    );
}

export default Cards;
