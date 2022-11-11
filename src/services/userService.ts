import { IAlertHelper } from '_/helpers';
import { User } from '_/models'
import { DatabaseRepository } from "_/repositories"

export interface IUserService {
    createUser(user: User): Promise<void>
    findUser(user: User): Promise<User | undefined>
}

export class UserService implements IUserService {
    constructor(
        private readonly userDatabaseRepository: DatabaseRepository,
        private readonly alertHelper: IAlertHelper
    ){}

    async createUser(user: User): Promise<void> {
        try {
            await this.userDatabaseRepository.create(user);
            this.alertHelper.alertSucess("Usuário criado com sucesso!")
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível fazer o cadastro.")
        }
    }

    async findUser(user: User): Promise<User | undefined>{
        try {
            const userFound =  await this.userDatabaseRepository.findBy('email', user.email) as User[]
            return userFound[0]
        } catch (error) {
            console.log(error)
            this.alertHelper.alertError("Ocorreu um erro ao buscar o usuário")
        }
    }
}
