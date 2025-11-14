import { chatList } from "@/app/page";

type Props = {
    onClick: () => void;
    active: boolean
    data: chatList;
}

export const ChatListItem = ({ onClick, active, data }: Props) => {
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
            {/*chatListItem--lines*/}
            <div className="flex-1 flex flex-col justify-around border-b border-gray-200 pr-[15px] ml-[15px] flex-wrap min-w-0 h-full ">
                {/*chatListItem--line*/}
                <div className="flex justify-between items-center w-full ">
                    {/*chatListItem--name*/}
                    <div className="text-[17px] text-black">{data.title}</div>
                    {/*chatListItem--date*/}
                    <div className="text-[12px] text-gray-400">19:00</div>
                </div>
                {/*chatListItem--line*/}
                <div className="flex justify-between items-center w-full">
                    {/*chatListItem--lastMsg*/}
                    <div className="text-[12px] text-gray-400 flex w-full">
                        <p className="truncate m-0">Opa, tudo bem?</p>
                    </div>
                </div>
            </div>
        </div >
    )
}