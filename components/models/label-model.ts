import {TagsModel} from './tags';

export interface LabelModel {
    label: string,
    id: string,
    path: string,
    children: TagsModel[]
}

