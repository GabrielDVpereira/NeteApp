import { DateTime  } from 'luxon'


export const parseDateToLocaleString = (date: Date) => DateTime.fromJSDate(date).toString().substring(0,16)