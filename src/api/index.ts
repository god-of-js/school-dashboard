import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  WhereFilterOp,
} from 'firebase/firestore';
import 'firebase/firestore';
import User from '../types/User';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import db, { auth } from './firebase';
import AuthDetails from '../types/AuthDetails';
import TaskGroup from '../types/TaskGroup';
import Task from '../types/Task';

class ApiService {
  createUserWithEmailAndPassword(data: AuthDetails) {
    return createUserWithEmailAndPassword(auth, data.email, data.password).then(
      ({ user }) => user,
    );
  }

  signInWithEmailAndPassword(data: AuthDetails) {
    return signInWithEmailAndPassword(auth, data.email, data.password).then(
      ({ user }) => user,
    );
  }

  recordAccountDetails(data: User) {
    return this.setDoc('user', data._id, data);
  }
  createTask(data: Task) {
    return this.setDoc('task', data._id, data);
  }
  createTaskGroup(data: TaskGroup) {
    return this.setDoc('task-group', data._id, data);
  }

  getTasksOfUser(userId: string) {
    return this.query<Task>({
      collectionName: 'task',
      key: 'userId',
      condition: '==',
      value: userId,
    });
  }
  getTaskGroupsOfUser(userId: string) {
    return this.query<TaskGroup>({
      collectionName: 'task-group',
      key: 'userId',
      condition: '==',
      value: userId,
    });
  }

  getUser(userId: string) {
    return this.getItem<User>('user', userId).then((user) => ({_id: 'F1xLKP4EBAMmhuEiuu4gvntSkOi1', email: 'henryeze019@gmail.com', name: 'Eze Henry'}));
  }
  private async setDoc(
    collectionName: string,
    id: string,
    data: unknown,
  ): Promise<unknown> {
    return setDoc(doc(db, collectionName, id), data);
  }

  private async getCollection<T>(collectionName: string): Promise<T[]> {
    const rawObjects = await getDocs(collection(db, collectionName));
    return rawObjects.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as T[];
  }

  private async query<T = unknown>({
    collectionName,
    key,
    condition,
    value,
  }: {
    collectionName: string;
    key: string;
    condition: WhereFilterOp;
    value: string;
  }): Promise<T[]> {
    const dbRef = collection(db, collectionName);
    const rawQuery = query(dbRef, where(key, condition, value));
    const snapShots = await getDocs(rawQuery);
    const documentList: T[] = [];
    snapShots.forEach((doc) => {
      documentList.push(doc.data() as T);
    });
    return documentList;
  }

  private async getItem<T>(collectionName: string, id: string): Promise<T> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      throw new Error('404: Document not found');
    }
  }
}

export default new ApiService();
