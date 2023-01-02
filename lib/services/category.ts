
import {CacheLabels} from '../../components/utils/cache';
import {
    getAllValidCategories,
    getChildrenCategory,
    getPostsByCategory,
    getTitleFromPage
} from '../controllers/category';
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

export async function getChildrenCategories(name: string | string[]) {
    const category = CacheData.get(CacheLabels.TAGS_CATEGORY + name);
    if(category) {
        return category;
    }

    const data = await getChildrenCategory(name);
    CacheData.set({key: CacheLabels.TAGS_CATEGORY + name, value: data?.nodes[0]});
    return data?.nodes[0];
}

export async function getAllCategories() {
    const categories =  CacheData.get(CacheLabels.ALL_TAGS_CATEGORY);
    console.log('CATEGORIES', categories)
    if(categories) {
        return categories;
    }

    const categoriesMapped = [];
    function mapCategories(categories) {
        categories.forEach(parent => {
            categoriesMapped.push({name: parent.name, path: parent.uri});
            parent.children.nodes.forEach(children => {
                categoriesMapped.push({name: children.name, path: children.uri});
            })
        })
    };

    const data = await getAllValidCategories();

    mapCategories(data?.nodes);
    CacheData.set({key: CacheLabels.ALL_TAGS_CATEGORY, value: categoriesMapped})
    return  categoriesMapped;
}
