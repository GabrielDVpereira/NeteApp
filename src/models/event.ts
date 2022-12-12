import { parseHoursToMilisseconds } from "_/util"

export abstract class Event {
    public readonly end: Date
    public description: string
    public title?: string

    constructor(
        public readonly date: Date,
        public readonly duration: number,
        public readonly username: string,
        public readonly color: string,
        public readonly calendarTitle: string,
        public readonly id?: string
    ){
        this.end = new Date(date.getTime() + parseHoursToMilisseconds(duration))
        this.description = `${this.date.toLocaleString()} e tem duraçao de ${
            this.duration}h, terminando em ${this.end.toLocaleString()}`

        this.generateTexts()
    }

    abstract generateTexts(): void
    abstract getDBFormat(): void
}