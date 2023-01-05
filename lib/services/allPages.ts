import {getHeaderCTA, getLabels} from './header';
import {footerContent} from './footer';
import {getAllCategories} from './category';

export async function contentAllPages() {
    const labels = await getLabels();
    const CTAHeader = await getHeaderCTA();
    const footer = await footerContent();
    const allCategories = await getAllCategories();
    return {
        labels, CTAHeader, footer, allCategories
    };
}
