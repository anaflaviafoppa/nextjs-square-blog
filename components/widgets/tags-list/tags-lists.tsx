import React from 'react';
import TagContainer from '../../containers/tag-container/tag-container';
import {Priority, TagsLabels} from '../../utils/constants';
import Link from 'next/link';
import Tag from '../../components/tag/tag';
import {useRouter} from 'next/router';
import Container from '../../containers/container/container';

function TagsLists({tagsList, selectedLabel, alignment, allowShowAll, type}) {
    const router = useRouter();

    return (
        <Container>
            {tagsList?.length > 1 &&
                <div className="container-y">
                    <TagContainer alignment={alignment}>
                        {allowShowAll && <Link href={'/categorias/' + router.query.label}>
                            <Tag clickable={true} text={'Mostrar Todos'} type={Priority.PRIMARY}
                                 isSelected={selectedLabel === TagsLabels.ALL}
                                 slug={TagsLabels.ALL}
                            />
                        </Link>}
                        {tagsList?.map((tag, index) => {
                            return (
                                <Link href={'/categorias/' + router.query.label + '/' + tag.slug} key={index}>
                                    <Tag clickable={true} text={tag.name} type={type}
                                         isSelected={selectedLabel === tag.slug}
                                         slug={tag.slug}/>
                                </Link>
                            )
                        })}
                    </TagContainer>
                </div>
            }
        </Container>
    );
}

export default TagsLists;
