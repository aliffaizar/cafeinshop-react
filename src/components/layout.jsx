import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = () => {
	return (
		<div className='flex flex-col h-screen overflow-hidden'>
			<Header />
			<div className='flex h-full flex-1 flex-row'>
				<Sidebar />
				<div className='flex-1 flex p-3 mb-15 relative'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
