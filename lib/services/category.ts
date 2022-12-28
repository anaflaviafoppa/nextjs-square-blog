
import {CacheLabels} from '../../components/utils/cache';
import {getPostsByCategory, getTitleFromPage} from '../controllers/category';
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

export async function getTitlesFromPage(name: string | string[]) {
    const titleCached = CacheData.get(CacheLabels.TITLE_CATEGORY + name);
    if(titleCached) {
        return titleCached;
    }

    const data = await getTitleFromPage(name);
    CacheData.set({key: CacheLabels.TITLE_CATEGORY + name, value: data?.edges});
    return data?.edges;
}
