"use client";

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { ChatListItem } from '@/components/ChatListItem';
import { ChatIntro } from '@/components/ChatIntro';
import { ChatWindow } from '@/components/ChatWindow';
import { NewChat } from '@/components/NewChat';
import { Login } from '@/components/login';
import { Api } from './Api';

import { Timestamp } from "firebase/firestore";

export type chatList = {
    chatId: number;
    title: string;
    image: string;
    lastMessage?: string;
    lastMessageDate?: number | Timestamp;
}

type User = {
    id: string;
    name: string;
    avatar: string;
}

const HomePage = () => {
    const [chatList, setChatList] = useState<chatList[]>([]);
    const [activeChat, setActiveChat] = useState<any>(null);
    const [user, setUser] = useState<User | null>(null);
    const [showNewChat, setShowNewChat] = useState(false);

    useEffect(() => {
        if (user !== null) {
            let unsub = Api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user])

    const handleNewChat = () => {
        setShowNewChat(true)
    }

    const handleLoginData = async (u: any) => {
        let newUser: any = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        }
        await Api.addUser(newUser)
        setUser(newUser)
    }

    if (user === null) {
        return (<Login onReceive={handleLoginData} />)
    }

    return (
        <div className="h-screen flex bg-neutral-100">
            {/*sideber*/}
            <div className="w-[35%] max-w-[415px] flex flex-col border-r-2 border-neutral-200">

                <NewChat
                    chatlist={chatList}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />

                <header className="h-[60px] flex justify-between items-center px-4">
                    {/*avatar*/}
                    <img
                        src={user.avatar}
                        alt=""
                        className="w-[40px] h-[40px] rounded-[20px] cursor-pointer"
                    />
                    {/*botões*/}
                    <div className="flex">
                        {/*status*/}
                        <div className="cursor-pointer w-[40px] h-[40px] rounded-[20px] flex justify-center items-center">
                            <DonutLargeIcon
                                className='text-neutral-400'
                            />
                        </div>
                        {/*mensagem*/}
                        <div
                            className="cursor-pointer w-[40px] h-[40px] rounded-[20px] flex justify-center items-center"
                            onClick={handleNewChat}
                        >
                            <ChatIcon
                                className='text-neutral-400'
                            />
                        </div>
                        {/*3 pontinhos*/}
                        <div className="cursor-pointer w-[40px] h-[40px] rounded-[20px] flex justify-center items-center">
                            <MoreVertIcon
                                className='text-neutral-400'
                            />
                        </div>
                    </div>
                </header>

                {/*search*/}
                <div className="bg-gray-100 border-b-2 border-gray-200 py-[5px] px-[15px]">
                    {/*search input*/}
                    <div className="bg-white h-[40px] rounded-[20px] px-[15px] flex items-center">
                        <SearchIcon
                            className='text-neutral-400 w-5 h-5'
                        />
                        <input
                            type='search'
                            placeholder='Procurar ou começar uma nova conversa'
                            className='flex-1 border-0 outline-0 bg-transparent ml-[10px] h-full'
                        />
                    </div>
                </div>

                {/*chatlist*/}
                <div className="flex-1 bg-white overflow-auto">
                    {chatList.map((item, key) => (
                        <ChatListItem
                            key={key}
                            data={item}
                            active={activeChat && activeChat.chatId === item.chatId}
                            onClick={() => setActiveChat(item)}
                        />
                    ))}

                </div>

            </div >

            {/*contentArea*/}
            < div className="flex-1" >
                {activeChat &&
                    <ChatWindow user={user} data={activeChat} />
                }
                {!activeChat && <ChatIntro />}
            </div >

        </div >
    )
};

export default HomePage;