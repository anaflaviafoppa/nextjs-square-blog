import CacheData from '../cache-data';
import {CacheLabels} from '../../components/utils/cache';
import {getHeaderContent} from '../controllers/header';
import {LabelModel} from '../../components/models/label-model';

export async function getLabels() {
    const labels: LabelModel[] = [];

    function addNewMainLabel({label, id, path}) {
        const newPath = extractPath(path);
        labels.push({label, id, path: newPath,  children: []});
    }

    function extractPath(path) {
        if(path.includes('categorias')) {
            return  '/' + path.split('/')[2]
        } else {
            return  '/' + path.split('/')[1]
        }
    }

    function addCategory({label, parentId, path}) {
        const parentIndex = labels.findIndex(item => item.id === parentId);
        const parent = labels[parentIndex];
        const children = parent.children;
        const slug =  path.split(parent.path)[1].split('/')[1];
        children.push({label, path: parent.path, parentLabel: parent.label, slug});
        labels.splice(parentIndex, 1, {label: parent.label,
            path: parent.path, id: parent.id, children});
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
            addNewMainLabel({label, path, id});
        } else {
            addCategory({label, path, parentId})
        }
    });

    CacheData.set({key: CacheLabels.LABELS, value: labels});
    return labels;
}
