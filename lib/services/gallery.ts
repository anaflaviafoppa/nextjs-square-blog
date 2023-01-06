import CacheData from '../cache-data';
import {CacheLabels} from '../../components/utils/cache';
import {getImagesList} from '../controllers/gallery';

export async function listOfImages() {
    const listImages = CacheData.get(CacheLabels.GALLERY);
    if(listImages) {
        return listImages;
    }

    const data = await getImagesList();
    CacheData.set({key:CacheLabels.GALLERY, value:data.nodes});
    return data.nodes;
}
