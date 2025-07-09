const TopBar = () => {
	const email = "john.doe@example.com";
	
	return (
		<div className="flex items-center justify-between bg-white h-[56px] px-4 py-2 border-b border-[#E0E0E0]">
			{/* PATH */}
			<div className="flex items-center gap-4 w-[343px] h-[24px]  ">
				{/* Panel */}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 4C20.5449 4 22 5.45507 22 7.25V16.75C22 18.5449 20.5449 20 18.75 20H5.25C3.45507 20 2 18.5449 2 16.75V7.25C2 5.45507 3.45507 4 5.25 4H18.75ZM5.25 5.5C4.2835 5.5 3.5 6.2835 3.5 7.25V16.75C3.5 17.7165 4.2835 18.5 5.25 18.5H14.5V5.5H5.25Z" fill="#618666"/>
</svg>


				{/* Path */}
				<div className="flex items-center gap-1 w-[303px] h-[24px] justify-start ">
					<div className="text-[12px] font-bold text-[#AFAFAF] max-w-[76px] items-center w-fit cursor-pointer" onClick={() => console.log('Workspace clicked')}>
						Workspace
					</div>
					<div className="w-3 h-3 items-center  text-[#AFAFAF]">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.23483 2.10983C4.08839 2.25628 4.08839 2.49372 4.23483 2.64017L7.59467 6L4.23484 9.35984C4.08839 9.50628 4.08839 9.74372 4.23484 9.89016C4.38128 10.0366 4.61872 10.0366 4.76517 9.89016L8.39017 6.26516C8.53661 6.11872 8.53661 5.88128 8.39017 5.73483L4.76517 2.10983C4.61872 1.96339 4.38128 1.96339 4.23483 2.10983Z" fill="#AFAFAF"/>
</svg>

					</div>
					<div className="text-[12px] font-bold text-[#AFAFAF] max-w-[76px] items-center w-fit cursor-pointer" onClick={() => console.log('Folder 2 clicked')}>
						Folder 2
					</div>
					<div className="w-3 h-3 items-center  text-[#AFAFAF]">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.23483 2.10983C4.08839 2.25628 4.08839 2.49372 4.23483 2.64017L7.59467 6L4.23484 9.35984C4.08839 9.50628 4.08839 9.74372 4.23484 9.89016C4.38128 10.0366 4.61872 10.0366 4.76517 9.89016L8.39017 6.26516C8.53661 6.11872 8.53661 5.88128 8.39017 5.73483L4.76517 2.10983C4.61872 1.96339 4.38128 1.96339 4.23483 2.10983Z" fill="#AFAFAF"/>
</svg>

					</div>
					<div className="text-[12px] flex font-bold text-black items-center gap-2 w-[131px] h-6 ">
						<div className=" items-center w-fit h-fit cursor-pointer" onClick={() => console.log('SpreadSheet 3 clicked')}>
							SpreadSheet 3
						</div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.45832 12C8.45832 12.8054 7.80541 13.4583 6.99999 13.4583C6.19457 13.4583 5.54166 12.8054 5.54166 12C5.54166 11.1946 6.19457 10.5417 6.99999 10.5417C7.80541 10.5417 8.45832 11.1946 8.45832 12ZM13.4583 12C13.4583 12.8054 12.8054 13.4583 12 13.4583C11.1946 13.4583 10.5417 12.8054 10.5417 12C10.5417 11.1946 11.1946 10.5417 12 10.5417C12.8054 10.5417 13.4583 11.1946 13.4583 12ZM17 13.4583C17.8054 13.4583 18.4583 12.8054 18.4583 12C18.4583 11.1946 17.8054 10.5417 17 10.5417C16.1946 10.5417 15.5417 11.1946 15.5417 12C15.5417 12.8054 16.1946 13.4583 17 13.4583Z" fill="#AFAFAF"/>
</svg>

					</div> 				
				</div>
			</div>

			{/* ACTIONS */}
			<div className="flex items-center gap-2 ">
				<div className="relative flex items-center w-[180px]">
					<div className="absolute left-3 w-4 h-4 text-[#8D8D8D]" >
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M14.4732 14.4733C14.2132 14.7333 13.7866 14.7333 13.5266 14.4733L11.3666 12.3067C11.7132 12.0267 12.0266 11.7133 12.3066 11.3667L14.4732 13.5267C14.7332 13.7867 14.7332 14.2133 14.4732 14.4733Z" fill="#AFAFAF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M7.50004 12.3333C10.1694 12.3333 12.3334 10.1694 12.3334 7.5C12.3334 4.83062 10.1694 2.66667 7.50004 2.66667C4.83066 2.66667 2.66671 4.83062 2.66671 7.5C2.66671 10.1694 4.83066 12.3333 7.50004 12.3333ZM7.50004 13.6667C10.9058 13.6667 13.6667 10.9058 13.6667 7.5C13.6667 4.09424 10.9058 1.33333 7.50004 1.33333C4.09428 1.33333 1.33337 4.09424 1.33337 7.5C1.33337 10.9058 4.09428 13.6667 7.50004 13.6667Z" fill="#AFAFAF"/>
</svg>
</div>
					
					<input 
						type="text" 
						className="max-w-[165px]  h-[40px] bg-[#F6F6F6] pl-9 pr-3 rounded-lg text-xs font-inter placeholder:text-[#8D8D8D] text-[#8D8D8D] font-bold" 
						placeholder="Search within sheet"  
					/>
				</div>

				<div className="relative cursor-pointer" onClick={() => console.log('Notification icon clicked')}>
					<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99999 -0.00377655C13.0499 -0.00377655 16.3567 3.19097 16.4958 7.24528L16.5 7.49622V11.5932L17.88 14.7492C17.949 14.9071 17.9847 15.0776 17.9847 15.25C17.9847 15.9404 17.425 16.5 16.7347 16.5L12 16.5015C12 18.1583 10.6568 19.5015 8.99999 19.5015C7.40231 19.5015 6.09633 18.2526 6.00508 16.6778L5.99954 16.4992L1.27485 16.5C1.10351 16.5 0.934005 16.4648 0.776852 16.3965C0.14365 16.1215 -0.146699 15.3852 0.12834 14.752L1.49999 11.5941V7.49612C1.50059 3.34132 4.85208 -0.00377655 8.99999 -0.00377655ZM10.4995 16.4992L7.49999 16.5015C7.49999 17.3299 8.17156 18.0015 8.99999 18.0015C9.77969 18.0015 10.4204 17.4066 10.4931 16.646L10.4995 16.4992ZM8.99999 1.49622C5.67983 1.49622 3.00047 4.17048 2.99999 7.49622V11.9059L1.65601 15H16.3525L15 11.9068L15.0001 7.50908L14.9964 7.28388C14.8853 4.0504 12.2416 1.49622 8.99999 1.49622Z" fill="#121212"/>
</svg>

					<div className="absolute -top-2 -right-2 w-4 h-4 bg-[#618666] rounded-full flex items-center justify-center text-[11px] text-white font-medium border-2 border-white">
						2
					</div>
				</div>

				<div className="flex items-center gap-2 pl-2 pr-3 py-[6px] ">
					<img 
						src="https://i.pravatar.cc/150?img=19" 
						alt="John Doe" 
						className="w-8 h-8 rounded-full"
					/>
					<div className="flex flex-col max-h-8">
						<span className="text-sm font-normal truncate">John Doe</span>
						<span className="text-xs text-[#8D8D8D]">
							{`${email.slice(0, 8)}...`}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TopBar