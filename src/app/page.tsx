"use client";

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            {/* Overlay para mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/*sidebar*/}
            <div className={`w-full md:w-[35%] md:max-w-[415px] flex flex-col border-r-2 border-neutral-200 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 fixed md:relative h-full md:h-auto z-50 md:z-auto`}>

                {!showNewChat && (
                    <>
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
                                {/* Fechar sidebar no mobile */}
                                <div
                                    className="cursor-pointer w-[40px] h-[40px] rounded-[20px] flex justify-center items-center md:hidden"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <CloseIcon className='text-neutral-400' />
                                </div>
                            </div>
                        </header>
                    </>
                )}

                <NewChat
                    chatlist={chatList}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                    onSelectChat={(chat: any) => {
                        setActiveChat(chat);
                        setSidebarOpen(false);
                    }}
                />

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
                            onClick={() => {
                                setActiveChat(item);
                                setSidebarOpen(false);
                            }}
                        />
                    ))}

                </div>

            </div >

            {/*contentArea*/}
            <div className="flex-1 flex flex-col">
                {/* Header com botão de menu no mobile */}
                <div className="md:hidden flex items-center px-4 h-[60px] bg-white border-b-2 border-neutral-200">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex items-center justify-center text-neutral-600 hover:text-neutral-900"
                    >
                        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>

                <div className="flex-1">
                    {activeChat &&
                        <ChatWindow user={user} data={activeChat} />
                    }
                    {!activeChat && <ChatIntro />}
                </div>
            </div >

        </div >
    )
};

export default HomePage;