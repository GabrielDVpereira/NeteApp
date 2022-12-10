import { parseHoursToMilisseconds } from "_/util"

export abstract class Event {
    public readonly end: Date
    public description: string
    public modalTitle?: string

    constructor(
        public readonly start: Date,
        public readonly duration: number,
        public readonly username: string,
        public readonly color: string,
        public readonly title: string,
        public readonly id?: string
    ){
        this.end = new Date(start.getTime() + parseHoursToMilisseconds(duration))
        this.description = `${this.start.toLocaleString()} e tem duraçao de ${
            this.duration}h, terminando em ${this.end.toLocaleString()}`

        this.generateTexts()
    }

    abstract generateTexts(): void
    abstract getDBFormat(): void
}