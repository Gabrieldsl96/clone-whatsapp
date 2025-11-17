import { useEffect, useState } from "react";

export const MessageItem = ({ data, user }: any) => {

    const [time, setTime] = useState('');

    useEffect(() => {
        if (!data.date) return;

        let dateObj;

        if (typeof data.date === "object" && data.date.seconds) {
            dateObj = new Date(data.date.seconds * 1000);
        } else if (typeof data.date === "number") {
            dateObj = new Date(data.date * 1000);
        } else {
            dateObj = new Date(data.date);
        }

        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        setTime(`${hours}:${minutes}`);
    }, [data]);


    return (
        <div className={`mb-[10px] flex ${user.id === data.author ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-[10px] shadow-sm flex flex-col p-[3px] max-w-[90%] ${user.id === data.author ? 'bg-[#DCF8C6]' : 'bg-white'}`}>
                <div className="text-[14px] mt-[5px] mr-[40px] ml-[5px] mb-[5px]">{data.body}</div>
                <div className="text-[11px] text-[#999] mr-[5px] text-right h-[15px] -mt-[15px] ">
                    {time}
                </div>
            </div>
        </div>
    );
};
