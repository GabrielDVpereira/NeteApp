import { getFirestore, setDoc, doc, Firestore, collection, query, getDocs, QueryConstraint, where, Query, DocumentData  } from 'firebase/firestore';


export interface DatabaseRepository {
    getAll<T>(): Promise<T[]>
    create(data: any): Promise<void>
    findBy<T>(field: string, value: string): Promise<T[]>
}

export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()

    constructor( private readonly collection: string){}

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

    async parseQueryResult<T>(query: Query<DocumentData>){
        const docsSnap = await getDocs(query)

        const result: T[] = []

        docsSnap.forEach(snap => {
            const data = snap.data() as T
            result.push(data)
        })
        return result
    }
}