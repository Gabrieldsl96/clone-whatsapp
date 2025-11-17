import { chatList } from "@/app/page";
import { useEffect, useState } from "react";

type Props = {
    onClick: () => void;
    active: boolean
    data: chatList;
}

export const ChatListItem = ({ onClick, active, data }: Props) => {

    const [time, setTime] = useState('');

    useEffect(() => {
        if (!data.lastMessageDate) return;

        let dateObj: Date;

        // Timestamp do Firestore (tem método toDate)
        if (typeof data.lastMessageDate === "object" && 'toDate' in data.lastMessageDate) {
            dateObj = data.lastMessageDate.toDate();
        }
        // Number timestamp (segundos)
        else if (typeof data.lastMessageDate === "number") {
            dateObj = new Date(data.lastMessageDate * 1000);
        }
        // String
        else {
            dateObj = new Date(data.lastMessageDate);
        }

        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        setTime(`${hours}:${minutes}`);
    }, [data.lastMessageDate]);


    return (
        <div
            className={`flex cursor-pointer h-[70px] items-center ${active ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={onClick}
        >
            <img
                src={data.image}
                alt=""
                className="h-[50px] w-[50px] rounded-[25px] ml-[15px]"
            />

            <div className="flex-1 flex flex-col justify-around border-b border-gray-200 pr-[15px] ml-[15px] flex-wrap min-w-0 h-full ">
                <div className="flex justify-between items-center w-full ">
                    <div className="text-[17px] text-black">{data.title}</div>
                    <div className="text-[12px] text-gray-400">{time}</div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <div className="text-[12px] text-gray-400 flex w-full">
                        <p className="truncate m-0">{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};
