import React from 'react';
import style from './card-item.module.scss'
import TagContainer from '../../containers/tag-container/tag-container';
import Tag from '../tag/tag';
import {Priority} from '../../utils/constants';
import Date from '../../date';

function CardItem({title, excerpt, date, slug, category}) {
    return (
        <div>
            <div className={style.item__image}>
                <TagContainer alignment='start'>
                    <Tag text={category} type={Priority.PRIMARY} clickable={false} isSelected={true}/>
                </TagContainer>
            </div>
            <div className={style.item__description}>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{__html: excerpt}}/>
                <span>
                            <Date dateString={date}/>
                        </span>

            </div>
        </div>
    );
}

export default CardItem;
