import React from 'react';
import style from './card-item.module.scss'
import TagContainer from '../../containers/tag-container/tag-container';
import Tag from '../tag/tag';
import {Priority} from '../../utils/constants';
import Date from '../../date';
import CoverImage from '../../cover-image';


function CardItem({title, excerpt, date, slug, category, featuredImage}) {
    return (
        <div>
            <div className={style.item__image} data-background={!!featuredImage}>
                <div className={style.item__tag_container}>
                    <TagContainer alignment='start'>
                        <Tag text={category?.name} type={Priority.PRIMARY} clickable={false} isSelected={true}/>
                    </TagContainer>
                </div>
                {featuredImage && <CoverImage title={title} coverImage={featuredImage}/>}
            </div>
            <div className={style.item__description}>
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                <span>
                    <Date dateString={date}/>
                </span>
            </div>
        </div>
    );
}

export default CardItem;
