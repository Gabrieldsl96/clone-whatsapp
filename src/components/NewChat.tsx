import { Api } from '@/app/Api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';

type Contact = {
    id: string;
    name: string;
    avatar: string;
};

export const NewChat = ({ user, chatlist, show, setShow, onSelectChat }: any) => {
    const [list, setList] = useState<Contact[]>([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results)
            }
        }
        getList();
    }, [user])

    const addNewChat = async (user2: any) => {
        const chatId = await Api.addNewChat(user, user2);

        // Encontrar o chat na lista e ativar
        if (chatlist && onSelectChat) {
            const existingChat = chatlist.find((chat: any) => chat.chatId === chatId);
            if (existingChat) {
                onSelectChat(existingChat);
            }
        }

        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div className={`w-full md:w-[415px] fixed md:fixed top-0 md:top-0 bottom-0 md:bottom-0 left-0 md:left-0 bg-white flex flex-col border-r border-[#ddd] transition-all duration-300 ease-in-out ${show ? 'translate-x-0' : '-translate-x-full'} z-50 md:z-50 h-full md:h-full`}>{/*newChat*/}
            {/*newChat--head*/}
            <div className="flex bg-[#00bfa5] items-center pt-[60px] pr-[15px] pb-[15px] pl-[15px]">
                {/*newChat--backbutton*/}
                <div
                    className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
                    onClick={handleClose}
                >
                    <ArrowBackIcon className='text-white' />
                </div>
                {/*newChat--headtitle*/}
                <div className="text-[19px] h-[40px] leading-[40px] flex-1 font-bold text-white ml-[20px]">Nova Conversa</div>
            </div>
            {/*newChat-list*/}
            <div className="flex-1 overflow-y-auto">
                {list.map((item, key) => (
                    //newChat--item
                    <div
                        className='flex items-center p-[15px] cursor-pointer hover:bg-[#f5f5f5]'
                        key={key}
                        onClick={() => addNewChat(item)}
                    >
                        {/*newChat--itemavatar*/}
                        <img
                            src={item.avatar}
                            alt=''
                            className='w-[50px] h-[50px] rounded-[50%] mr-[15px]'
                        />
                        {/*newChat--itemname*/}
                        <div className='text-[17px] text-black'>{item.name}</div>
                    </div>
                ))}
            </div>
        </div >
    )
}