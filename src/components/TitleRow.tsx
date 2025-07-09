import React from 'react';

type TitleRowProps = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

const TitleRow: React.FC<TitleRowProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className='h-12 gap-6 pl-8 pr-4 bg-[#FFFFFF] w-full overflow-hidden border-t-[#EEEEEE] border-t-1 '>
      <div className='flex flex-row gap-2 justify-start items-center w-fit '>
        {tabs.map(tab => (
          <div
            key={tab}
            className={
              `h-11 gap-2 flex items-center justify-center px-4 py-2 font-bold text-[15px] text-[#757575] cursor-pointer ` +
              (selectedTab === tab ? 'border-t-4 border-t-[#4B6A4F] bg-[#E8F0E9]' : '')
            }
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </div>
        ))}
        <div className="cursor-pointer" onClick={() => console.log('Add tab clicked')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="4" fill="white"/>
            <path d="M14 6.5C13.54 6.5 13.1667 6.87333 13.1667 7.33333V13.1667H7.33333C6.87333 13.1667 6.5 13.54 6.5 14C6.5 14.46 6.87333 14.8333 7.33333 14.8333H13.1667V20.6667C13.1667 21.1267 13.54 21.5 14 21.5C14.46 21.5 14.8333 21.1267 14.8333 20.6667V14.8333H20.6667C21.1267 14.8333 21.5 14.46 21.5 14C21.5 13.54 21.1267 13.1667 20.6667 13.1667H14.8333V7.33333C14.8333 6.87333 14.46 6.5 14 6.5Z" fill="#757575"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TitleRow