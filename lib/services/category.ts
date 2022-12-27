
import {CacheLabels} from '../../components/utils/cache';
import {getPostsByCategory} from '../controllers/category';
import CacheData from '../cache-data';

export async function getPostsByCategories(slug: string | string[]) {
    const postsCached = CacheData.get(CacheLabels.CATEGORY_POSTS + slug);
    if(postsCached) {
        return postsCached;
    }

    const data = await getPostsByCategory(slug);
    CacheData.set({key:CacheLabels.CATEGORY_POSTS + slug, value: data?.edges});
    return data?.edges;
}
