import { IAlertHelper } from "_/helpers"
import { Checkin } from "_/models"
import { DatabaseRepository } from "_/repositories"

export interface ICheckinService {
    createCheckin(checkin: Checkin): Promise<void>
    listCheckins(): Promise<Checkin[] | undefined>
    watchCheckins(callback: (data: Checkin[]) => void): void
    unwatchCheckins(): void
}

export class CheckinService implements ICheckinService {
    constructor(
        private readonly checkinDatabaseRepository: DatabaseRepository,
        private readonly alertHelper: IAlertHelper
    ){}

    async createCheckin(checkin: Checkin): Promise<void> {
        try {
            await this.checkinDatabaseRepository.create(checkin.getDBFormat());
            this.alertHelper.alertSucess("Checkin realizado com sucesso!")
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível realizar o seu checkin.")
        }
    }
    async listCheckins(): Promise<Checkin[] | undefined> {
        try {
            const checkins = await this.checkinDatabaseRepository.getAll<Checkin>()
            return checkins.map(checkin => Checkin.mapResponseToCheckin(checkin))
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível recuperar os checkins.")
        }
    }

    watchCheckins(callback: (data: Checkin[]) => void){
        this.checkinDatabaseRepository.watch((data: any) => {
            const checkins: Checkin[] = data.map((item: any) => Checkin.mapResponseToCheckin(item))
            callback(checkins)
        })
    }

    unwatchCheckins(){
        this.checkinDatabaseRepository.unsubscribe()
    }
}