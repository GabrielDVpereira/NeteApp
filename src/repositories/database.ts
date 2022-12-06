import { getFirestore, setDoc, doc, Firestore, collection, query, getDocs, where, Query, DocumentData, onSnapshot, Unsubscribe, updateDoc, QueryDocumentSnapshot  } from 'firebase/firestore';
import { UpdateObj } from '_/util';

type VoidCallback<T> = (data: T[]) => void
export interface DatabaseRepository {
    getAll<T>(): Promise<T[]>
    create(data: any): Promise<void>
    findBy<T>(field: string, value: string): Promise<T[]>
    update<T>(id: string, updateObject: UpdateObj<T>): Promise<void>
    watch<T>(callback: VoidCallback<T>): Promise<void>
    unsubscribe(): void
}

export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()
    private unsub: Unsubscribe | null = null

    constructor( private readonly collection: string){}

    async watch<T>(callback: VoidCallback<T>){
        this.unsub = onSnapshot(collection(this.firestore, this.collection), async (snap) => {
            const data: T[] = snap.docs.map(doc => this.parseSnap<T>(doc))
            callback(data)
        })
    }

    async unsubscribe(){
        this.unsub?.()
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

    async update<T>(id: string, updateObject: UpdateObj<T>): Promise<void>{
        const docRef = doc(collection(this.firestore, this.collection), id);

        await updateDoc(docRef, updateObject);
    }

    async parseQueryResult<T>(query: Query<DocumentData>){
        const docsSnap = await getDocs(query)
        const result: T[] = []

        docsSnap.forEach(snap => {
            const data = this.parseSnap<T>(snap)
            result.push(data)
        })
        return result
    }

    parseSnap<T>(snap: QueryDocumentSnapshot<DocumentData>): T{
        return { ...snap.data(), id: snap.id } as T
    }
}