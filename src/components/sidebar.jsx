import { NavLink } from "react-router-dom";
import { IoHomeOutline, IoFastFoodOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";

const Sidebar = () => {
	return (
		<div className='min-w-fit p-3 space-y-3 flex flex-col items-center shadow bg-accent'>
			<NavLink
				to='/'
				className={({ isActive }) => {
					return isActive ? "sidenavActive" : "sidenav";
				}}
			>
				<IoHomeOutline className='w-7 h-7' />
				<span className='text-xs'>Home</span>
			</NavLink>
			<NavLink
				to='/menus'
				className={({ isActive }) => (isActive ? "sidenavActive" : "sidenav")}
			>
				<IoFastFoodOutline className='w-7 h-7' />
				<span className='text-xs'>Menus</span>
			</NavLink>
			<NavLink
				to='/categories'
				className={({ isActive }) => (isActive ? "sidenavActive" : "sidenav")}
			>
				<BiCategory className='w-7 h-7' />
				<span className='text-xs'>Categories</span>
			</NavLink>
		</div>
	);
};

export default Sidebar;
