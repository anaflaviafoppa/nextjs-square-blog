import {TagsModel} from './tags';

export interface LabelModel {
    label: string,
    id: string,
    children: TagsModel[]
}

