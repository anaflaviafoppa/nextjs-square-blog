import React from 'react';
import {Order, Priority} from '../../utils/constants';
import style from './main-post-item.module.scss';
import TagContainer from '../../containers/tag-container/tag-container';
import Tag from '../tag/tag';
import Container from '../../containers/container/container';
import CoverImage from '../../cover-image';
import UnderlinedTitle from '../underlined-title/underlined-title';

function MainPostItem({title, category, excerpt, date, tags, order, featuredImage}) {
    const className = order === Order.NORMAL ? '' : `${style.item__revert}`;

    return (
        <div className={`${style.item} ${className}`}>
            <div className={style.item__image} >
                {featuredImage && <CoverImage title={title} coverImage={featuredImage}/>}
            </div>

            <div className={style.item__content}>
                <Container>
                <div>
                    <UnderlinedTitle title={category?.name} date={date} />
                </div>
                <div className={style.item__description}>
                    <h2>{title}</h2>
                    <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                </div>
                <TagContainer alignment="start">
                    {tags?.map((tag, index) => {
                        return (
                            <Tag key={index} clickable={false} text={tag.name} type={Priority.PRIMARY} isSelected={false}/>
                        )
                    })}
                </TagContainer>
                </Container>
            </div>


        </div>
    );
}

export default MainPostItem;
