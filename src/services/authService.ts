import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "_/config/firebase";
import { IAlertHelper } from "_/helpers/alert";
import { mapResponseToUser, User } from "_/models";
import { IUserService } from "./userService";

export interface IAuthService {
    signInWithGoogle: () => Promise<User | undefined>,
    checkAuthenticated: () => Promise<User>,
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
            return this.retrieveUser(result.user)
        } catch (error) {
            console.error(error)
            this.alertHelper.alertError("Não foi possivel logar com o Google")
        }
    }

    async retrieveUser(data: any): Promise<User | undefined> {
        const existingUser = await this.userService.findUser(data.email)

        if(!existingUser){ // Creates user on first login
            this.userService.createUser(data)
            return(mapResponseToUser(data))
        }

        return existingUser
    }

    async checkAuthenticated() {
        return new Promise<User>(resolve => {
            onAuthStateChanged(this.auth, (user) => {
                if(!user) return resolve({} as User)
                resolve(mapResponseToUser(user))
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