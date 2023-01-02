import React from 'react';
import styles from '../../header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

function ListLabels({labels, selectedLabelId, isOpenedMenu, handleClickCategories}) {
    return (
        <>
            {
                labels?.map((label) => {
                    return (
                        <div className={styles.navbar__text} key={label.id}
                             selected-label={(label.id === selectedLabelId && isOpenedMenu).toString()}>
                            <Link href={`/categorias${label.path}`}>
                                <p className="header-labels"
                                   selected-label={(label.id === selectedLabelId && isOpenedMenu).toString()}>{label.label}</p>
                            </Link>
                            {
                                !!label.children.length &&
                                <div onClick={() => handleClickCategories(label.id)}>
                                    <Image
                                        width={15.83}
                                        height={9.17}
                                        alt={`Arrow`}
                                        src={label.id === selectedLabelId && isOpenedMenu ? '/images/arrow_yellow.png' : '/images/arrow.png'}
                                    />
                                </div>
                            }
                        </div>
                    )
                })
            }
        </>
    );
}

export default ListLabels;
