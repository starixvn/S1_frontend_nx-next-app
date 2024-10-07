const Country = () => {
	return (
		// <!-- TODO:新增 .active language-list會出現-->
		<div className='language-selector'>
			<button className='thrid'>
				<img
					className='icon'
					src='https://banner.picasso12.com/desktop/img/flag/ch.jpg'
					alt=''
				/>{' '}
				Malaysia
			</button>
			<div className='language-list'>
				<div className='country-current'>
					<div className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/ch.jpg'
							alt=''
						/>
					</div>
					<div className='country-info'>
						<div>Malaysia</div>
						<div className='language-options'>
							<button>English</button>
							<button>简体中文</button>
							<button>Malay</button>
						</div>
					</div>
				</div>
				<div className='country-options'>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/ch.jpg'
							alt=''
						/>
						Bangladesh
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/bd.jpg'
							alt=''
						/>
						Brazil
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/cs.jpg'
							alt=''
						/>
						China
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/gb.jpg'
							alt=''
						/>
						Global
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/id.jpg'
							alt=''
						/>
						Indonesia
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/in.jpg'
							alt=''
						/>
						India
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/jp.jpg'
							alt=''
						/>
						Japanese
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/kh.jpg'
							alt=''
						/>
						Cambodia
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/ko.jpg'
							alt=''
						/>
						Korea
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/th.jpg'
							alt=''
						/>
						Thailand
					</button>
					<button className='icon'>
						<img
							src='https://banner.picasso12.com/desktop/img/flag/vn.jpg'
							alt=''
						/>
						Vietnam
					</button>
				</div>
			</div>
		</div>
	)
}

export default Country
