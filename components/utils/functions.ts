import {BreakPoints} from './constants';

export function isMobileSize ():boolean {
    const width = window.innerWidth;
    return width < BreakPoints.TABLET
}
