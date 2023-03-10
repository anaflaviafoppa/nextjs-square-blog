export enum Priority {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

export enum Alignment {
    CENTER = 'center',
    START = 'start',
    END = 'end'
}

export enum Order {
    REVERT= 'revert',
    NORMAL = 'normal'
}

export enum Pages {
    INITIAL = '/',
    SEARCH = '/search/[search]'
}

export enum TagsLabels {
    ALL = 'all'
}

export enum IdsName {
    CAROUSEL = 'carousel'
}

export enum MenuName {
   CATEGORIES = 'CATEGORIES',
    SEARCH_FILTER = 'SEARCH',
    LABELS_MOBILE = 'LABELS_MOBILE',
    CATEGORIES_MOBILE = 'CATEGORIES_MOBILE',
    MOBILE = 'MOBILE'
}

export abstract class BreakPoints {
    static TABLET = 1200;
}
