import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "_/config/firebase";
import { parseUser } from "_/helpers";
import { IAlertHelper } from "_/helpers/alert";
import { User } from "_/models";
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
            const userResponse = parseUser(result.user)
            return await this.createUserOnFirstLogin(userResponse)
        } catch (error) {
            console.error(error)
            this.alertHelper.alertError("Não foi possivel logar com o Google")
        }
    }
    async createUserOnFirstLogin(userResponse: User): Promise<User | undefined> {
        const findUser = await this.userService.findUser(userResponse)

        if(!findUser){
            this.userService.createUser(userResponse)
            return(userResponse)
        }

        return findUser
    }

    async checkAuthenticated() {
        return new Promise<User>(resolve => {
            onAuthStateChanged(this.auth, (user) => {
                if(!user) return resolve({} as User)
                resolve(parseUser(user))
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