import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
    state: () => ({
        documents: [],
        loadingDoc: false,
    }),
    actions: {
        async getUrls() {
            if (this.documents.length !== 0) {
                return;
            }

            this.loadingDoc = true;
            try {
                const q = query(
                    collection(db, "urls"),
                    where("user", "==", auth.currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, doc.data());
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            } catch (error) {
                console.log(error);
                return error.code
            } finally {
                this.loadingDoc = false;
            }
        },
        async addUrl(name) {
            try {
                this.loadingDoc = true
                const objetoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid,
                };
                const docRef = await addDoc(collection(db, "urls"), objetoDoc);
                // console.log(docRef.id);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id,
                });
            } catch (error) {
                console.log(error);
                return error.code
            } finally {
                this.loadingDoc = false
            }
        },
        async readUrl(id) {
            try {
                this.loadingDoc = true
                const docRef = doc(db, "urls", id);
                const docSpan = await getDoc(docRef);

                if (!docSpan.exists()) {
                    throw new Error("no existe el doc");
                }

                if (docSpan.data().user !== auth.currentUser.uid) {
                    throw new Error("no le pertenece ese documento");
                }

                return docSpan.data().name;
            } catch (error) {
                console.log(error.message);
                return error.code
            } finally {
                this.loadingDoc = false
            }
        },
        async updateUrl(id, name) {
            try {
                const docRef = doc(db, "urls", id);
                this.loadingDoc = true
                const docSpan = await getDoc(docRef);
                if (!docSpan.exists()) {
                    throw new Error("no existe el doc");
                }

                if (docSpan.data().user !== auth.currentUser.uid) {
                    throw new Error("no le pertenece ese documento");
                }

                await updateDoc(docRef, {
                    name: name,
                });

                this.documents = this.documents.map((item) =>
                    item.id === id ? { ...item, name: name } : item
                );
                router.push("/");
            } catch (error) {
                console.log(error.message);
                return error.code
            } finally {
                this.loadingDoc = false
            }
        },
        async deleteUrl(id) {
            try { 
                this.loadingDoc = true
                const docRef = doc(db, "urls", id);
                const docSpan = await getDoc(docRef);
                if (!docSpan.exists()) {
                    throw new Error("No exist");
                }

                if (docSpan.data().user !== auth.currentUser.uid) {
                    throw new Error("You don´t have access for this document");
                }

                await deleteDoc(docRef);
                this.documents = this.documents.filter(
                    (item) => item.id !== id
                );
            } catch (error) {
                console.log(error.message);
                return error.code
            } finally {
                this.loadingDoc = false
            }
        },
    },
});
