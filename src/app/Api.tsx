import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, addDoc, updateDoc, arrayUnion, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

import { Timestamp, getDoc } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const Api = {
    googlePopup: async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            return result;
        } catch (error: any) {
            console.error("Erro no login do Google:", error);

            if (error.code === 'auth/popup-closed-by-user') {
                alert('Você fechou o popup de login');
            } else if (error.code === 'auth/cancelled-popup-request') {
                console.log('Popup anterior cancelado');
            } else {
                alert('Erro ao fazer login: ' + error.message);
            }

            return null;
        }
    },
    addUser: async (u: any) => {
        // Sintaxe correta do Firestore v9+
        const userDocRef = doc(db, 'users', u.id);
        await setDoc(userDocRef, {
            name: u.name,
            avatar: u.avatar
        }, { merge: true });
    },
    getContactList: async (userId: string) => {
        let list: any = [];

        const usersCollectionRef = collection(db, 'users');
        const results = await getDocs(usersCollectionRef);

        results.forEach((result) => {
            let data = result.data();
            if (result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                })
            }
        })

        return list;
    },
    addNewChat: async (user: any, user2: any) => {
        // Verificar se já existe um chat com esse usuário
        const user1DocRef = doc(db, 'users', user.id);
        const user1Snap = await getDoc(user1DocRef);

        if (user1Snap.exists()) {
            const user1Data = user1Snap.data();
            if (user1Data.chats) {
                // Procurar se existe chat com user2
                const existingChat = user1Data.chats.find((chat: any) => chat.with === user2.id);
                if (existingChat) {
                    // Chat já existe, não criar novamente
                    return existingChat.chatId;
                }
            }
        }

        // Se não existe, criar novo chat
        const chatsCollectionRef = collection(db, 'chats');
        const newChat = await addDoc(chatsCollectionRef, {
            messages: [],
            users: [user.id, user2.id]
        });

        // Atualizar o primeiro usuário
        const user1UpdateRef = doc(db, 'users', user.id);
        await updateDoc(user1UpdateRef, {
            chats: arrayUnion({
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        });

        // Atualizar o segundo usuário
        const user2DocRef = doc(db, 'users', user2.id);
        await updateDoc(user2DocRef, {
            chats: arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });

        return newChat.id;
    },
    onChatList: (userId: any, setChatList: any) => {
        const userDocRef = doc(db, "users", userId);

        return onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (data.chats) {
                    let chats = [...data.chats];

                    chats.sort((a: any, b: any) => {
                        if (a.lastMessageDate === undefined) {
                            return - 1;
                        }
                        if (b.lastMessageDate === undefined) {
                            return - 1;
                        }
                        if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                            return 1;
                        } else {
                            return -1
                        }

                    })
                    setChatList(chats);
                }
            }
        });
    },
    onChatContent: (chatId: string, setList: any, setUsers: any) => {
        const chatDocRef = doc(db, "chats", chatId);

        return onSnapshot(chatDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setList(data.messages);
                setUsers(data.users);
            }
        });
    },
    sendMessage: async (chatData: any, userId: any, type: any, body: any, users: any) => {
        const chatDocRef = doc(db, "chats", String(chatData.chatId));

        // Adiciona a mensagem
        await updateDoc(chatDocRef, {
            messages: arrayUnion({
                type,
                author: userId,
                body,
                date: Timestamp.now()
            })
        });

        // Atualiza o preview da lista (lastMessage + lastMessageDate)
        for (let i in users) {
            const userDocRef = doc(db, "users", users[i]);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
                const uData = userSnap.data();

                if (uData?.chats) {
                    let chats = [...uData.chats];

                    const chatIndex = chats.findIndex(c => c.chatId === chatData.chatId);

                    if (chatIndex !== -1) {
                        chats[chatIndex].lastMessage = body;
                        chats[chatIndex].lastMessageDate = Timestamp.now();
                    }

                    await updateDoc(userDocRef, { chats });
                }
            }
        }
    }

};