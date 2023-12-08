import { isArray, uniqueId } from 'lodash-es'

const JackpotItem = ({ itemList }: { itemList: (string | number[])[] }) => {
	const itemRender = (item: string | number[]) => {
		const key = `jackpot-text-item-${uniqueId()}`
		if (item === ',' || item === '.') {
			return (
				<div key={key}>
					<div>{item}</div>
				</div>
			)
		}
		// 是陣列就會是 number
		if (isArray(item) && item.length > 0) {
			return (
				<div className='numberRow' key={key}>
					<div className='active'>
						{item.map(num => (
							<div key={`${key}-${uniqueId()}`}>{num}</div>
						))}
					</div>
				</div>
			)
		}

		return ''
	}

	return <>{itemList.map(item => itemRender(item))}</>
}

export { JackpotItem }
