import {getFilteredPosts} from '../controllers/search';

export async function getFilteredItems(filterKey: string | string[]) {
    if(!filterKey) {
        return;
    }
    const data = await getFilteredPosts(filterKey);
    return data?.edges;
}
