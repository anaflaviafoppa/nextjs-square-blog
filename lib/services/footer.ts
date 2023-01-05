import CacheData from '../cache-data';
import {CacheLabels} from '../../components/utils/cache';
import {getFooterContent} from '../controllers/footer';
import {getAboutUsContent} from '../api';

export async function footerContent() {
    const footerContent = CacheData.get(CacheLabels.FOOTER);
    if (footerContent) {
        return footerContent;
    }

    const data = await getFooterContent();
    const node = data?.nodes[0];
    let structureFooter =  node.menuItems?.edges;
    structureFooter = structureFooter.filter(({node}) => {
        return node.parentId === null;
    });

    let nodeAboutMe = CacheData.get(CacheLabels.ABOUT_US);
    if(!nodeAboutMe) {
        const aboutUsContent = await getAboutUsContent();
        nodeAboutMe = aboutUsContent?.edges?.[0].node;
        CacheData.set({key: CacheLabels.ABOUT_US, value: nodeAboutMe});
    }

    CacheData.set({key: CacheLabels.FOOTER, value: {structureFooter, aboutUsContent: nodeAboutMe}});
    return {structureFooter, aboutUsContent: nodeAboutMe}
}
