import CacheData from '../cache-data';
import {CacheLabels} from '../../components/utils/cache';
import {getHeaderContent} from '../controllers/header';
import {LabelModel} from '../../components/models/LabelModel';

export async function getLabels() {
    const labels: LabelModel[] = [];

    function addNewMainLabel({label, id}) {
        labels.push({label, id, children: []});
    }

    function addCategory({label, parentId, path}) {
        const parentIndex = labels.findIndex(item => item.id === parentId);
        const parent = labels[parentIndex];
        const children = parent.children;
        children.push({label, path, parentLabel: parent.label});
        labels.splice(parentIndex, 1, {label: parent.label, id: parent.id, children});
    }


    const labelsCached = CacheData.get(CacheLabels.LABELS);
    if (labelsCached) {
        return labelsCached;
    }

    const data = await getHeaderContent();
    const node = data?.nodes[0];
    const structureNavbar = node.menuItems?.edges;
    structureNavbar.forEach(({node}) => {
        const label = node.label;
        const id = node.id;
        const parentId = node.parentId;
        const path = node.path;
        if (!parentId) {
            addNewMainLabel({label, id});
        } else {
            addCategory({label, path, parentId})
        }
    });

    CacheData.set({key: CacheLabels.LABELS, value: labels});
    return labels;
}
