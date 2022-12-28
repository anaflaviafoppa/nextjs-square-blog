import React, {useEffect} from 'react';
import Layout from '../components/layout';
import Container from '../components/containers/container/container';
import Cards from '../components/widgets/cards/cards';
import {NextPage} from 'next';
import {getLabels} from '../lib/services/header';
import {getFilteredItems} from '../lib/services/search';
import {useRouter} from 'next/router';

interface Props {
    labels: any,
    posts: any
}

const Search: NextPage<Props> = ({labels, posts}) => {
    const router = useRouter()

    useEffect(() => {
    }, [router.query.key]);

    return (
        <Layout labels={labels}>
            <Container>
                {
                    !!posts?.length && <Cards items={posts}
                                    title={'Veja Também'}
                                    isEnabledSeeMore={true}
                                    maxPosts={6}
                    />
                }
                <h1>No results</h1>
            </Container>
        </Layout>
    );
}

Search.getInitialProps = async ({query}) => {
    console.log('QUERY--------------------',query);
    const labels = await getLabels();
    const posts = await getFilteredItems(query.key);
    return {labels, posts}

}

export default Search;



