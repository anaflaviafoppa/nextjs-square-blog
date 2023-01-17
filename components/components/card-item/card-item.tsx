import React from 'react';
import style from './card-item.module.scss'
import TagContainer from '../../containers/tag-container/tag-container';
import Tag from '../tag/tag';
import {Priority} from '../../utils/constants';
import Date from '../../date';
import CoverImage from '../../cover-image';
import Link from 'next/link';


function CardItem({title, excerpt, date,link, slug, category, featuredImage}) {
    return (
        <div>
            <div className={style.item__image} data-background={!!featuredImage}>
                <div className={style.item__tag_container}>
                    <TagContainer alignment='start'>
                        <Tag text={category?.name} type={Priority.PRIMARY} clickable={false} isSelected={true}/>
                    </TagContainer>
                </div>

                {featuredImage &&
                    <Link  href={link}>
                        <CoverImage title={title} coverImage={featuredImage}/>
                    </Link>}

            </div>
            <div className={style.item__description}>
                <Link href={link}>
                    <h3>{title}</h3>
                    <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                </Link>
                <span>
                    <Date dateString={date}/>
                </span>
            </div>
        </div>
    );
}

export default CardItem;
