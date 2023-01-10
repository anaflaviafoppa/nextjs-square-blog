import {getBannerSelected} from "../controllers/banner";

const BANNER_SELECTED_CATEGORY_MOBILE = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_MOBILE_ID;
const BANNER_SELECTED_CATEGORY_DESKTOP = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_DESKTOP_ID;

export async function getBannerSelectedForSomeCategories(preview, listOfCategories) {
    if(!listOfCategories) {
        return ''
    }
    const data = await getBannerSelected(preview);
    const nodes = data?.edges;
    const categoriesPost = listOfCategories?.nodes.map(category => category.id);

    function filterById(categories, generalCategories): boolean {
         return categories.some(category => generalCategories.includes(category))
    }

    const filteredBanners = nodes.filter(({node}) => {
        const listIds = node.categories.nodes.map(category => category.id);
        return filterById(listIds, categoriesPost);
    });

    const mobile = filteredBanners.filter(({node}) => {
        const listIds = node.categories.nodes.map(category => category.id);
        return listIds.includes(BANNER_SELECTED_CATEGORY_MOBILE)
    })?.[0]?.node || '';

    const desktop = filteredBanners.filter(({node}) => {
        const listIds = node.categories.nodes.map(category => category.id);
        return listIds.includes(BANNER_SELECTED_CATEGORY_DESKTOP)
    })?.[0]?.node || '';


    return filteredBanners ? {mobile, desktop} : '';
}