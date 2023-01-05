import Container from '../../containers/container/container';
import styles from './footer.module.scss'
import TagContainer from '../../containers/tag-container/tag-container';
import {Alignment, Priority} from '../../utils/constants';
import Tag from '../tag/tag';
import HibridoLogo from '../../../public/images/hibrido.png';
import Instagram from '../../../public/images/instagram.png';
import Facebook from '../../../public/images/facebook.png';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {isMobileSize} from '../../utils/functions';


export default function Footer({content, categories}) {
    const tags = ['mostrar todos', 'aves', 'bom de assistir', 'BOM DE FAZER', 'BOM SABER', 'DOCES E SOBREMESAS', 'CARNES', 'CURIOSIDADES'];
    const [alignment, setAlignment] = useState<string>(Alignment.START);

    useEffect(() => {
        verifyDimensions();
    }, []);

    const verifyDimensions = () => {
        if(isMobileSize()) {
            setAlignment(Alignment.CENTER);
        } else {
            setAlignment(Alignment.END);
        }
    }

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer__division}>
                    <div className={styles.footer__columns}>
                        <div className={styles.footer__column}>
                            <h4>Assine Nossa Newsletter</h4>
                            <input  className="input__secondary"   type="email" placeholder="Seu E-mail" />
                            <button className="button__primary">Assinar</button>
                        </div>
                        <div className={styles.footer__column}>
                            <h4>Sobre o bom de beer</h4>
                            <p>O Bom de Beer surgiu em 2016,
                                como um espaço para conversar sobre cerveja.
                                Aqui, nós mostramos que malte e lúpulo são muito mais do
                                que meros ingredientes, e como a cultura cervejeira
                                é gigante pelo mundo todo.

                                Ler mais.
                            </p>
                        </div>
                        <div className={styles.footer__column}>
                            <h4>Nossa Loja Virtual</h4>
                            <ul>
                                <li>Cervejas Especiais</li>
                                <li>Copos</li>
                                <li>Presentes</li>
                            </ul>
                        </div>
                        <div className={styles.footer__column}>
                            <h4>Nossas Redes Sociais</h4>
                            <div className={styles.footer__social}>
                                <Image
                                    alt={`Instagram Logo`}
                                    src={Instagram}
                                />
                                <Image
                                    alt={`Facebook Logo`}
                                    src={Facebook}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footer__division}>
                    <h4>Tags</h4>
                    <TagContainer alignment={alignment}>
                        {tags?.map((tag, index) => {
                            return (
                                <Tag key={index} clickable={false} text={tag} type={Priority.SECONDARY}
                                     isSelected={false}/>
                            )
                        })}
                    </TagContainer>
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
