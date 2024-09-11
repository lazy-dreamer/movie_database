import { doc, setDoc, getDoc } from "firebase/firestore";
import {db} from "../index";
import {TFilmProps} from "../components/film_block/FilmBlock";

export async function getUserFavorites(userId: string) {
  const docRef = doc(db, "favorites", userId); 
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().favorites;
  } else {
    await setDoc(docRef, { favorites: [] });
    return [];
  }
}

export async function saveUserFavorites(userId: string, favorites: TFilmProps[]) {
  const docRef = doc(db, "favorites", userId);
  await setDoc(docRef, { favorites }, { merge: true });
}
