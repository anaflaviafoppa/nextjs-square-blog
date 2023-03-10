import React from 'react';
import {TagsNameEnum} from '../../utils/tags-name.enum';
import {Priority} from '../../utils/constants';
import styles from './tag.module.scss';

interface Props {
    text: string,
    type: string,
    clickable: boolean,
    isSelected: boolean,
    slug?: string,
}

function Tag({text, type, clickable, isSelected, slug}: Props) {
    const clickableClass = clickable ? `${styles.tag__clickable} ` : '';
    const priorityClass = type ===  Priority.PRIMARY ? `${styles.tag__primary} ` : `${styles.tag__secondary} `;
    const selectedClass = isSelected ? `${styles.tag__selected} ` : '';


    return (

            <div className={`${styles.tag} ${clickableClass} ${priorityClass} ${selectedClass}`}>
                <span>{text}</span>
            </div>

    );
}

export default Tag;
