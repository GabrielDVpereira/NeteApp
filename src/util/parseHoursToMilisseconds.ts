const HOUR_IN_MILLISSECONDS =  60 * 60 * 1000;

export function parseHoursToMilisseconds(hours: number){
    return hours *  HOUR_IN_MILLISSECONDS;
}