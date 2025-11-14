export const ChatIntro = () => {
    return (
        <div className="bg-[#f8f9fb] flex flex-col justify-center items-center h-full border-b-[6px] border-[#4ADF83]">
            <img
                src="/images/intro-whatsapp.jpg"
                alt=""
                className="w-[250px] h-auto"
            />
            <h1 className="text-[32px] text-[#525252] font-bold mt-[30px]">Mantenha seu celular conectado</h1>
            <h2 className="text=[14px] text-[#777] mt-[20px] text-center">O whatsapp conecta ao seu telefone para sincronizar suas mensagens.</h2>
            <h2 className="text=[14px] text-[#777] text-center">Para reduzir o uso de devIndicatorServerState, conecte seu telefone a uma rede Wi-Fi.</h2>
        </div>
    )
}