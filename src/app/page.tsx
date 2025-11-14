"use client";

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { ChatListItem } from '@/components/ChatListItem';
import { ChatIntro } from '@/components/ChatIntro';
import { ChatWindow } from '@/components/ChatWindow';

export type chatList = {
    chatId: number;
    title: string;
    image: string;
}

const HomePage = () => {
    const [chatList, seChatList] = useState<chatList[]>([
        { chatId: 1, title: 'Fulano de Tal', image: '/images/avatar.png' },
        { chatId: 2, title: 'Fulano de Tal', image: '/images/avatar.png' },
        { chatId: 3, title: 'Fulano de Tal', image: '/images/avatar.png' },
        { chatId: 4, title: 'Fulano de Tal', image: '/images/avatar.png' },
    ]);
    const [activeChat, setActiveChat] = useState({ chatId: 2 });


    return (
        <div className="h-screen flex bg-neutral-100">
            {/*sideber*/}
            <div className="w-[35%] max-w-[415px] flex flex-col border-r-2 border-neutral-200">

                <header className="h-[60px] flex justify-between items-center px-4">
                    {/*avatar*/}
                    <img
                        src="/images/avatar.png"
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
                        <div className="cursor-pointer w-[40px] h-[40px] rounded-[20px] flex justify-center items-center">
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
                            active={activeChat.chatId === chatList[key].chatId}
                            onClick={() => setActiveChat(chatList[key])}
                        />
                    ))}
                </div>

            </div >

            {/*contentArea*/}
            < div className="flex-1" >
                {activeChat.chatId !== undefined &&
                    <ChatWindow />
                }
                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }
            </div >

        </div >
    )
};

export default HomePage;