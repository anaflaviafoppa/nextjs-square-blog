import React from 'react';
import Date from '../../date';
import styles from './underlined-title.module.scss';

function UnderlinedTitle({title, date}) {
    return (
        <div className={styles.title__container}>
            <div className={styles.title__border}>
                <h3>{title}</h3>
            </div>
            <span>
                            <Date dateString={date}/>
                        </span>
        </div>
    );
}

export default UnderlinedTitle;
