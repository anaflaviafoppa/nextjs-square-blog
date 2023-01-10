import CoverImage from '../../cover-image'
import PostTitle from '../post-title/post-title'
import styles from './post-header.module.scss';
import Container from '../../containers/container/container';
import Categories from '../../categories';


export default function PostHeader({
                                       title,
                                       coverImage,
                                       displayImage,
                                       date,
                                       author,
                                       categories,
                                   }) {
    return (
        <>
            <div className={styles.header}>
                <Container>
                    <div className='container-large-y'>
                        <PostTitle>{title}</PostTitle>
                    </div>

                </Container>
                {displayImage && coverImage && <div className={styles.header__image_container}>
                    <CoverImage title={title} coverImage={coverImage}/>
                </div>}
            </div>

            {/*<div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar author={author}/>
                </div>
                <div className="mb-6 text-lg">
                    Posted <Date dateString={date}/>
                    <Categories categorias={categorias}/>
                </div>
            </div>*/}
        </>
    )
}
