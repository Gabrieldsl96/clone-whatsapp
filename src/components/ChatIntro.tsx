import MenuIcon from '@mui/icons-material/Menu';

export const ChatIntro = ({ onOpenSidebar }: any) => {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Header com botão de menu no mobile */}
            <div className="md:hidden flex items-center px-4 h-[60px] bg-white border-b-2 border-neutral-200">
                <button
                    onClick={onOpenSidebar}
                    className="flex items-center justify-center text-neutral-600 hover:text-neutral-900"
                >
                    <MenuIcon />
                </button>
            </div>

            <div className="bg-[#f8f9fb] flex flex-col justify-center items-center flex-1 w-full border-b-[6px] border-[#4ADF83] px-4 md:px-0">
                <img
                    src="/images/intro-whatsapp.jpg"
                    alt=""
                    className="w-[200px] md:w-[250px] h-auto"
                />
                <h1 className="text-[24px] md:text-[32px] text-[#525252] font-bold mt-[20px] md:mt-[30px] text-center">Mantenha seu celular conectado</h1>
                <h2 className="text-[12px] md:text-[14px] text-[#777] mt-[15px] md:mt-[20px] text-center max-w-[90%] md:max-w-none">O whatsapp conecta ao seu telefone para sincronizar suas mensagens.</h2>
                <h2 className="text-[12px] md:text-[14px] text-[#777] text-center mt-[10px] md:mt-[0] max-w-[90%] md:max-w-none">Para reduzir o uso de devIndicatorServerState, conecte seu telefone a uma rede Wi-Fi.</h2>
            </div>
        </div>
    )
}