import Container from '../../containers/container/container';
import styles from './footer.module.scss'
import {Alignment, Priority} from '../../utils/constants';
import HibridoLogo from '../../../public/images/hibrido.png';
import Instagram from '../../../public/images/instagram.png';
import Facebook from '../../../public/images/facebook.png';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {isMobileSize} from '../../utils/functions';
import TagsLists from '../../widgets/tags-list/tags-lists';
import Link from 'next/link';

const NEWSLETTER_MENU = process.env.NEXT_PUBLIC_NEWSLETTER_MENU;
const ABOUT_US_MENU = process.env.NEXT_PUBLIC_ABOUT_US_MENU;
const LOJA_VIRTUAL_MENU = process.env.NEXT_PUBLIC_LOJA_VIRTUAL_MENU;
const REDES_SOCIAIS_MENU = process.env.NEXT_PUBLIC_REDES_SOCIAIS;
const TAGS_MENU = process.env.NEXT_PUBLIC_TAGS;
const INSTAGRAM_MENU =  process.env.NEXT_PUBLIC_INSTAGRAM_MENU;
const FACEBOOK_MENU = process.env.NEXT_PUBLIC_FACEBOOK_MENU;


export default function Footer({content, categories}) {
    const structureFooter = content?.structureFooter;
    const aboutUsContent = content?.aboutUsContent;



    const [alignment, setAlignment] = useState<string>(Alignment.START);


    useEffect(() => {
        verifyDimensions();
    }, []);

    const verifyDimensions = () => {
        if(isMobileSize()) {
            setAlignment(Alignment.CENTER);
        } else {
            setAlignment(Alignment.START);
        }
    }

    const verifyImage = (id:string) => {
       switch (id) {
           case INSTAGRAM_MENU:
               return Instagram;
           case FACEBOOK_MENU:
               return Facebook
           default:
               return ''
       }
    }

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer__division}>
                    <div className={styles.footer__columns}>
                        {
                            structureFooter?.map(({node}, index) => {
                                return (
                                    <div className={styles.footer__column} key={index + node.label}>
                                        <h4>{node.label}</h4>
                                        {(() => {
                                            switch (node.id) {
                                                case NEWSLETTER_MENU:
                                                    return (
                                                        <>
                                                            <input  className="input__secondary"   type="email" placeholder="Seu E-mail" />
                                                            <button className="button__primary">Assinar</button>
                                                        </>
                                                    )
                                                case ABOUT_US_MENU:
                                                    return (
                                                        <>
                                                        <div className={styles.footer__about_us} dangerouslySetInnerHTML={{__html: aboutUsContent}} />
                                                            <Link href='/sobre-nos' className={styles.footer__link}>
                                                                <span>Ler Mais</span>
                                                            </Link>
                                                        </>
                                                    )
                                                case LOJA_VIRTUAL_MENU:
                                                    return (
                                                        <ul>
                                                            {
                                                                 node?.childItems?.nodes.map((link, index) => {
                                                                   return( <li key={index}>
                                                                        <Link href={link.path} target='_blank'>{link.label}</Link>
                                                                    </li>)
                                                                })
                                                            }
                                                        </ul>
                                                    )
                                                case REDES_SOCIAIS_MENU:
                                                    return  <div className={styles.footer__social}>
                                                        {
                                                            node.childItems?.nodes.map((socialMedia, index) => {
                                                                return (
                                                                    <Link href={socialMedia.path} target='_blank' key={index}>
                                                                        <Image
                                                                            alt={`${socialMedia.label} Logo`}
                                                                            src={verifyImage(socialMedia.id)}
                                                                        />
                                                                    </Link>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                default:
                                                    return null
                                            }
                                        })()}
                                    </div>
                                )
                        })
                        }
                    </div>
                </div>

                <div className={styles.footer__division}>
                    <h4>Tags</h4>
                    <TagsLists
                        tagsList={categories}
                        selectedLabel={''}
                        alignment={alignment}
                        allowShowAll={false}
                        type={Priority.SECONDARY}
                        allowRouter={false}
                    />
                </div>
                <div className={styles.footer__division}>
                    <Image
                        alt={`Hibrido Logo`}
                        src={HibridoLogo}
                    />
                    <span>Bom de Beer - Todos os direitos reservados - loja online Bom de Beer é operada pela Synapcom CNPJ: 27.932.734/0001-65 / Endereço: Av. Portugal, 46 - Itapevi - SP - CEP: 06696-060</span>
                </div>
            </Container>
        </footer>
    )
}
