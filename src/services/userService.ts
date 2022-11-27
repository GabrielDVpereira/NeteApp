import { defineRandomColor, IAlertHelper } from '_/helpers';
import { mapResponseDbToUser, User } from '_/models'
import { DatabaseRepository } from "_/repositories"

export interface IUserService {
    createUser(user: User): Promise<User | undefined>
    findUser(email: string): Promise<User | undefined>
}

export class UserService implements IUserService {
    constructor(
        private readonly userDatabaseRepository: DatabaseRepository,
        private readonly alertHelper: IAlertHelper
    ){}

    async createUser(user: User): Promise<User | undefined> {
        try {
            user.color = defineRandomColor()
            await this.userDatabaseRepository.create(user)
            this.alertHelper.alertSucess("Usuário criado com sucesso!")
            return user
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível fazer o cadastro.")
        }
    }

    async findUser(email: string): Promise<User | undefined>{
        try {
            const userFound =  await this.userDatabaseRepository.findBy('email', email)
            if(userFound.length) return mapResponseDbToUser(userFound[0])
        } catch (error) {
            console.log(error)
            this.alertHelper.alertError("Ocorreu um erro ao buscar o usuário")
        }
    }
}
