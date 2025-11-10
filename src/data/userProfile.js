import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firebase_db } from '../utils/FireBaseConfig';

// Upsert user's profile (name + goal)
export async function upsertUserProfile(uid, { displayName, calorieGoal }) {
  const ref = doc(firebase_db, 'users', uid);
  await setDoc(ref, {
    ...(displayName !== undefined ? { displayName } : {}),
    ...(calorieGoal !== undefined ? { calorieGoal: Number(calorieGoal) } : {}),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// Live subscribe to user's profile
export function watchUserProfile(uid, onData) {
  const ref = doc(firebase_db, 'users', uid);
  return onSnapshot(ref, (snap) => {
    onData(snap.exists() ? snap.data() : null);
  });
}