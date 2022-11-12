import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, onAuthStateChanged, signOut, UserCredential } from "firebase/auth";
import { app } from "_/config/firebase";
import { IAlertHelper } from "_/helpers/alert";
import { mapAuthResponseToUser, User } from "_/models";
import { IUserService } from "./userService";

export interface IAuthService {
    signIn: () => Promise<User | undefined>,
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

    async signIn(): Promise<User | undefined> {
        try {
            const credentials = await this.signInWithGoogle()
            const existingUser = await this.checkUserExists(credentials.user.email || '')
            if(existingUser) return existingUser

            return await this.createUser(credentials.user)
        } catch (error) {
            console.error(error)
            this.alertHelper.alertError("Não foi possivel logar com o Google")
        }
    }

    async signInWithGoogle() : Promise<UserCredential> {
        return await signInWithPopup(this.auth, this.provider)
    }

    async checkUserExists(email: string): Promise<User | undefined>  {
        return await this.userService.findUser(email)
    }

    async createUser(data: any): Promise<User | undefined> {
        const responseUser = mapAuthResponseToUser(data)
        return this.userService.createUser(responseUser)
    }

    async checkAuthenticated() {
        return new Promise<User>(resolve => {
            onAuthStateChanged(this.auth, (user) => {
                if(!user) return resolve({} as User)
                resolve(mapAuthResponseToUser(user))
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