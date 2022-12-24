import React from 'react';
import {Order, Priority} from '../../utils/constants';
import style from './main-post-item.module.scss';
import TagContainer from '../../containers/tag-container/tag-container';
import Tag from '../tag/tag';
import Container from '../../containers/container/container';
import Date from '../../date';

function MainPostItem({title, category, excerpt, slug, date, tags, order}) {
    const className = order === Order.NORMAL ? '' : `${style.item__revert}`;

    return (
        <section className={`${style.item} ${className}`}>
            <Container>
            <div className={style.item__content}>
                <div>
                    <div className="title__border_container">
                        <div className="title__border">
                            <h3>{category}</h3>
                        </div>
                        <span>
                            <Date dateString={date} />
                        </span>
                    </div>
                </div>
                <div className={style.item__description}>
                    <h2>{title}</h2>
                    <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                </div>
                <TagContainer alignment="start">
                    {tags.map((tag, index) => {
                        return (
                            <Tag key={index} clickable={false} text={tag} type={Priority.PRIMARY} isSelected={false}/>
                        )
                    })}
                </TagContainer>
            </div>
            </Container>
            <div className={style.item__image}>

            </div>
        </section>
    );
}

export default MainPostItem;
