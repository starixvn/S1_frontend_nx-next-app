import classNames from 'classnames'
import Image from 'next/future/image'
import { useBoolean } from 'usehooks-ts'

const AppDownload = () => {
	const { value: isActive, setFalse } = useBoolean(true)

	return (
		<div
			className={classNames('appdownload', {
				active: isActive,
			})}
		>
			<button className='icon icon-close' onClick={setFalse} />
			<Image
				src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/app/appicon.jpg`}
				alt='appicon-img'
				height={36}
				width={34}
			/>
			<div>
				<div>Download the App</div>
				<div>Bet Anytime Anywhere</div>
			</div>
			<a href='app.html'>Download</a>
		</div>
	)
}

export default AppDownload
