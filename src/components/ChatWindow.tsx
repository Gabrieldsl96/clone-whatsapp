import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
});

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useRef, useState } from 'react';
import { MessageItem } from "./MessageItem";
import { Api } from "@/app/Api";

export const ChatWindow = ({ user, data, onOpenSidebar }: any) => {

    const body = useRef<HTMLDivElement | null>(null);

    let recognition: any = null;

    if (typeof window !== "undefined") {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
        }
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setList([]);

        // proteção contra data indefinido
        if (!data || !data.chatId) return;

        const chatIdStr = String(data.chatId); // garante string
        console.log("Chamando onChatContent com chatId:", chatIdStr, typeof chatIdStr);

        const unsub = Api.onChatContent(chatIdStr, setList, setUsers);

        // cleanup quando o componente desmonta / chat muda
        return () => {
            if (typeof unsub === 'function') unsub();
        };
    }, [data?.chatId]);


    useEffect(() => {
        if (!body.current) return;

        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);


    const handleEmojiClick = (emojiObject: any) => {
        setText(prev => prev + emojiObject.emoji);
    };


    const handleOpenEmoji = () => {
        setEmojiOpen(true)
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false)
    }

    const handleInputKeyUp = (e: any) => {
        if (e.keyCode == 13) {
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users)
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleMicClick = () => {
        if (recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }

            recognition.onend = () => {
                setListening(false);
            }

            recognition.onresult = (e: any) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();
        }
    }


    return (
        <div className='flex flex-col h-full w-full'>
            {/*chatWindow--header*/}
            <div className="h-[60px] border-b border-[#ccc] flex justify-between items-center shrink-0">
                {/*chatWindow--headerinfo*/}
                <div className="flex items-center cursor-pointer">
                    {/* Botão de menu no mobile - lado esquerdo */}
                    <button
                        onClick={onOpenSidebar}
                        className="md:hidden flex items-center justify-center text-neutral-600 hover:text-neutral-900 w-[40px] h-[40px] mr-[10px]"
                    >
                        <MenuIcon />
                    </button>
                    {/*chatWindow--avatar*/}
                    <img
                        src={data.image}
                        alt=""
                        className="w-[40px] h-[40px] rounded-[50%] ml-[15px] mr-[15px]"
                    />
                    {/*chatWindow--name*/}
                    <div className="text-[17px] text-black">{data.title}</div>
                </div>

                {/*chatWindow--headersbuttons*/}
                <div className='flex items-center mr-[15px]'>
                    {/*chatWindow--btn*/}
                    <div className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'>
                        <SearchIcon className='text-neutral-400 w-5 h-5' />
                    </div>
                    <div className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'>
                        <AttachFileIcon className='text-neutral-400 w-5 h-5' />
                    </div>
                    <div className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'>
                        <MoreVertIcon className='text-neutral-400 w-5 h-5' />
                    </div>
                </div>

            </div>

            {/*chatWindow--body*/}
            <div
                ref={body}
                className={`flex-1 px-[30px] py-[20px] overflow-y-auto bg-[#E5DDD5] bg-contain bg-center bg-[url('/images/fundo2.jpg')] min-h-0`}
            >
                {list.map((item, key) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            {/*chatWindow--emojiarea*/}
            <div className={`[&_aside]:w-auto! **:max-w-full! overflow-y-hidden transition-all duration-300 ease-in-out shrink-0 ${emojiOpen ? 'h-[300px]' : 'h-0'}`}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    skinTonesDisabled
                    searchDisabled
                />
            </div>

            {/*chatWindow--footer*/}
            <div className={`h-[62px] flex items-center shrink-0`}>

                {/*chatWindow--pre*/}
                <div className='flex mx-[15px]'>
                    {emojiOpen && (
                        <div
                            className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'
                            onClick={handleCloseEmoji}
                        >
                            <CloseIcon className='text-neutral-400 w-5 h-5' />
                        </div>
                    )}

                    <div
                        className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon className={`w-5 h-5 ${emojiOpen ? 'text-[#009688]' : 'text-neutral-400'}`} />
                    </div>

                </div>

                {/*chatWindow--inputarea*/}
                <div className='flex-1'>
                    <input
                        type='text'
                        placeholder='Digite uma mensagem'
                        className='w-full h-[40px] border-0 outline-0 bg-white rounded-[20px] text-[15px] text-[#4A4A4A] pl-[15px]'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>

                {/*chatWindow--pos*/}
                <div className='flex mx-[15px]'>
                    {text === '' &&
                        <div
                            className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'
                            onClick={handleMicClick}
                        >
                            <MicIcon className={` w-5 h-5 ${listening ? 'text-[#126ECE]' : 'text-neutral-400'}`} />
                        </div>
                    }
                    {text !== '' &&
                        <div
                            className='w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'
                            onClick={handleSendClick}
                        >
                            <SendIcon className='text-neutral-400 w-5 h-5' />
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}