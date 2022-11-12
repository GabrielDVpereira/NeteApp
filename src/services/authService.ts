import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "_/config/firebase";
import { IAlertHelper } from "_/helpers/alert";
import { mapAuthResponseToUser, User } from "_/models";
import { IUserService } from "./userService";

export interface IAuthService {
    signInWithGoogle: () => Promise<User | undefined>,
    checkAuthenticated: () => Promise<User | undefined>,
    logout: () => Promise<void>
}

export class AuthService implements IAuthService {
    private readonly provider : GoogleAuthProvider = new GoogleAuthProvider();
    private readonly auth : Auth = getAuth(app);

    constructor(
        private readonly alertHelper: IAlertHelper,
        private readonly userService: IUserService
    ){}

    async signInWithGoogle(): Promise<User | undefined> {
        try {
            const result = await signInWithPopup(this.auth, this.provider)
            return await this.retrieveUser(result.user)
        } catch (error) {
            console.error(error)
            this.alertHelper.alertError("Não foi possivel logar com o Google")
        }
    }

    async retrieveUser(data: any): Promise<User | undefined> {
        const existingUser = await this.userService.findUser(data.email)

        if(!existingUser){
            return this.createUserOnFirstLogin(data)
        }

        return existingUser
    }

    async createUserOnFirstLogin(data: any): Promise<User> {
        const responseUser = mapAuthResponseToUser(data)
        this.userService.createUser(responseUser)
        return responseUser
    }

    async checkAuthenticated() {
        return new Promise<User | undefined>(resolve => {
            onAuthStateChanged(this.auth, async (user) => {
                if(!user || !user.email) return resolve({} as User)
                resolve(await this.userService.findUser(user.email))
            });
        })
    }

    async logout(){
        try {
            await signOut(this.auth)
        } catch (error) {
            this.alertHelper.alertError("Não foi possivel fazer o logout")
        }
    }
}