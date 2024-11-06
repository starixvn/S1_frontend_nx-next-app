import Logo from '@12b-indo-desktop/components/layout/common/header/Logo'
import UserFunction from '@12b-indo-desktop/components/layout/common/header/UserFunction'
import UserInfo from '@12b-indo-desktop/components/layout/common/header/userInfo'
import MenuList from './menuList'

const LayoutHeader = () => {
	return (
		<header id='header'>
			<div className='header-top'>
				<Logo />

				{/* <!-- header-btn --> */}
				<div className='header-btn-group '>
					{/* <!-- user-info --> */}
					<UserInfo />

					{/* <!-- user-function --> */}
					<UserFunction />
				</div>
			</div>

			<MenuList />
		</header>
	)
}

export default LayoutHeader
