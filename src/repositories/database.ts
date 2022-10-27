import { getFirestore, setDoc, doc, Firestore, collection, query, getDocs  } from 'firebase/firestore';


export interface DatabaseRepository {
    getAll<T>(): Promise<T[]> 
    create(data: any): Promise<void>
}

export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()

    constructor( private readonly collection: string){}

    async getAll<T>(): Promise<T[]> {
        const docsRef = query(collection(this.firestore, this.collection));
        const docsSnap = await getDocs(docsRef)

        const result: T[] = []
        
        docsSnap.forEach(snap => {
            const data = snap.data() as T
            result.push(data)
        })
        return result
    }
    
    async create(data: any){
        await setDoc(doc(collection(this.firestore, this.collection)), data)
    }
}