import React from 'react';
import Container from '../../containers/container/container';
import styles from './image-section.module.scss';
import Image from 'next/image';
import Ampolis from '../../../public/images/brands/ampolis.png';
import BlackPrincess from '../../../public/images/brands/black-princess.png';
import BlueSpirit from  '../../../public/images/brands/blue-spirit.png';
import Cabare from  '../../../public/images/brands/cabare.png';
import CabareIce from  '../../../public/images/brands/cabare-ice.png';
import CachacaCabare  from '../../../public/images/brands/cachaca-cabare.png';
import Cacildis from  '../../../public/images/brands/cacildis.png';
import Crystal from '../../../public/images/brands/crystal.png';
import It from '../../../public/images/brands/it.png';
import Itaipava from '../../../public/images/brands/itaipava.png';
import ItaipavaZero from '../../../public/images/brands/itaipava0.png';
import ItaipavaMalte from '../../../public/images/brands/itaipavamalte.png';
import Lokal from '../../../public/images/brands/lokal.png';
import Nordka from '../../../public/images/brands/nordka.png';
import Petra from '../../../public/images/brands/petra.png';
import Tnt from '../../../public/images/brands/tnt.png';
import Weltenburger from '../../../public/images/brands/weltenburger.png';
import UnderlinedTitle from '../underlined-title/underlined-title';


function ImageSection({listImages}) {
    return (
        <section className={'section ' + styles.images}>
            <Container>
                <UnderlinedTitle title={'Conheça as nossas marcas'} date={''} />
                <div className={styles.images__container}>
                    {
                        listImages?.map((image, index) => {
                            return (
                                    <img
                                        key={index}
                                        alt={image.slug}
                                        src={image.sourceUrl}
                                    />
                            )
                        })
                    }

                </div>

            </Container>
        </section>
    );
}

export default ImageSection;
