import { paths } from '@nx-next-app/constants'
import { isNumber } from 'lodash'

export const getPathParams = ({
	urlRouter,
	tpId,
	tpGameType,
	gameId,
	matchId,
}: {
	urlRouter: string
	tpId?: string
	tpGameType?: number
	gameId?: string
	matchId?: number
}) => {
	let result = ''

	if (urlRouter === paths.slots.root) {
		result = `?tpId=${tpId}${
			isNumber(tpGameType)
				? `&tpGameType=${tpGameType}`
				: '&tpGameType=undefined'
		}`
	} else if (urlRouter === paths.sports.root) {
		result = `?tpId=${tpId}${gameId ? `&gameId=${gameId}` : ''}${
			matchId ? `&matchId=${matchId}` : ''
		}`
	}
	return result
}
