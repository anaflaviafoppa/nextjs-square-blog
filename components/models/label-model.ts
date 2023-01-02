import {TagsModel} from './tags';

export interface LabelModel {
    label: string,
    id: string,
    path: string,
    isExternalLink: boolean,
    children: TagsModel[]
}

