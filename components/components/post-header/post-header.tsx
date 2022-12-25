import Avatar from '../../avatar'
import Date from '../../date'
import CoverImage from '../../cover-image'
import PostTitle from '../post-title/post-title'
import Categories from '../../categories'
import styles from './post-header.module.scss';
import Container from '../../containers/container/container';


export default function PostHeader({
                                       title,
                                       coverImage,
                                       date,
                                       author,
                                       categories,
                                   }) {
    return (
        <>
            <div className={styles.header}>
                <Container>
                    <PostTitle>{title}</PostTitle>
                </Container>
                <div>
                    <CoverImage title={title} coverImage={coverImage}/>
                </div>
            </div>

            {/*<div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar author={author}/>
                </div>
                <div className="mb-6 text-lg">
                    Posted <Date dateString={date}/>
                    <Categories categories={categories}/>
                </div>
            </div>*/}
        </>
    )
}
