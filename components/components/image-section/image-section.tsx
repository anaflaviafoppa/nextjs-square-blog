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


function ImageSection() {
    return (
        <section className={'section ' + styles.images}>
            <Container>
                <UnderlinedTitle title={'Conheça as nossas marcas'} date={''} />
                <div className={styles.images__container}>
                    <Image
                        alt={`Ampolis Logo`}
                        src={Ampolis}
                    />
                    <Image
                        alt={`Black Princess Logo`}
                        src={BlackPrincess}
                    />
                    <Image
                        alt={`Petra Logo`}
                        src={Petra}
                    />
                    <Image
                        alt={`Weltenburger Kloster Logo`}
                        src={Weltenburger}
                    />
                    <Image
                        alt={`Itaipava Logo`}
                        src={Itaipava}
                    />
                    <Image
                        alt={`Itaipava Zero Logo`}
                        src={ItaipavaZero}
                    />
                    <Image
                        alt={`Itaipava Malte Logo`}
                        src={ItaipavaMalte}
                    />
                    <Image
                        alt={`BlueSpirit Logo`}
                        src={BlueSpirit}
                    />
                    <Image
                        alt={`Nordka Logo`}
                        src={Nordka}
                    />
                    <Image
                        alt={`Tnt Logo`}
                        src={Tnt}
                    />
                    <Image
                        alt={`Cabare Ice Logo`}
                        src={CabareIce}
                    />
                    <Image
                        alt={`Cachaca Cabare Logo`}
                        src={CachacaCabare}
                    />
                    <Image
                        alt={`Cabare Logo`}
                        src={Cabare}
                    />
                    <Image
                        alt={`Crystal Logo`}
                        src={Crystal}
                    />
                    <Image
                        alt={`Lokal Logo`}
                        src={Lokal}
                    />
                    <Image
                        alt={`It Logo`}
                        src={It}
                    />
                    <Image
                        alt={`Cacildis Logo`}
                        src={Cacildis}
                    />


                </div>

            </Container>
        </section>
    );
}

export default ImageSection;
