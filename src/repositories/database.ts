import { getFirestore, setDoc, doc, Firestore, collection, query, getDocs, where, Query, DocumentData, onSnapshot, QuerySnapshot, Unsubscribe, DocumentSnapshot  } from 'firebase/firestore';


export interface DatabaseRepository {
    getAll<T>(): Promise<T[]>
    create(data: any): Promise<void>
    findBy<T>(field: string, value: string): Promise<T[]>
    watch(callback: (data: any) => void): void
    unsubscribe(): void
}

export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()
    private unsub: Unsubscribe | null = null

    constructor( private readonly collection: string){}

    async watch(callback: (data: any) => void){
        this.unsub = onSnapshot(collection(this.firestore, this.collection), async (snap) => {
            const data: any[] = snap.docs.map(doc => doc.data())
            callback(data)
        })
    }

    async unsubscribe(){
        if(this.unsub === null) return
        this.unsub()
    }

    async getAll<T>(): Promise<T[]> {
        const docsRef = query(collection(this.firestore, this.collection));
        return await this.parseQueryResult(docsRef)
    }

    async create(data: any){
        await setDoc(doc(collection(this.firestore, this.collection)), data)
    }

    async findBy<T>(field: string, value: string) :Promise<T[]> {
        const docsCollection = collection(this.firestore, this.collection);
        const docsRef = query(docsCollection, where(field, "==", value));

        return await this.parseQueryResult(docsRef)
    }

    async parseQueryResult<T>(query: Query<DocumentData>):Promise<T[]>{
        const docsSnap = await getDocs(query)
        const result: T[] = []

        docsSnap.forEach(snap => {
            const data = snap.data() as T
            result.push(data)
        })
        return result
    }
}