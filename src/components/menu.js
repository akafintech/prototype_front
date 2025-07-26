

export default function Menu({ text, url }) {
    return (
        <a className="flex w-72 items-center gap-3 px-3 py-2 relative flex-[0_0_auto] hover:bg-gray-200" href={url}>
            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="bg-[url(https://c.animaapp.com/mdfz0qs1nELw0Y/img/vector---0-6.svg)] relative flex-1 w-6 grow bg-[100%_100%]" />
            </div>
            
            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                    {text}
                </div>
            </div>
        </a>
    )

}