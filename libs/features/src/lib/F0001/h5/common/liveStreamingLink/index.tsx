import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import { LIVESTREAM_CURRENCY_TO_LANG_KEY } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useLazyGetDataListQuery,
	ILiveStreamingData,
} from '@nx-next-app/service'
import { isEventPeriod } from '@nx-next-app/utils'
import { EUROPE_EVENT_PERIOD } from '@nx-next-app/site/nova88'
import LiveStreamingModal from './LiveStreamingModal'

const LiveStreamingLink = () => {
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()
	const { LANG_TO_CURRENCY = {} } = useStaticData()
	const [isShowLiveStreaming, setIsShowLiveStreaming] = useState(false)
	const [liveStreamingList, setLiveStreamingList] = useState<
		ILiveStreamingData[]
	>([])
	const [getLiveStreamingList, { isFetching: isGetLiveStreamingListFetching }] =
		useLazyGetDataListQuery()
	const handleGetLiveStreamingList = async () => {
		try {
			const { data: resultList } = await getLiveStreamingList({
				langId,
				currencyId,
			}).unwrap()

			if (resultList.length > 0) {
				setIsShowLiveStreaming(true)
				// 根據開始時間+2hr判斷是否過期,並取前3項
				const filterList = resultList
					.filter(({ battleTime }: { battleTime: string }) =>
						dayjs(battleTime).add(2, 'hours').isAfter(dayjs())
					)
					.slice(0, 3)

				setLiveStreamingList(filterList)
			}
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const handleLiveSteamingModalOpen = () => {
		modal.open(<LiveStreamingModal liveStreamingList={liveStreamingList} />, {
			className: 'livesportspop',
		})
	}

	useEffect(() => {
		// 當currencyId為vn或th時顯示直播icon
		if (
			currencyId === LANG_TO_CURRENCY['vn'] ||
			currencyId === LANG_TO_CURRENCY['th'] ||
			currencyId === LANG_TO_CURRENCY['my']
		) {
			handleGetLiveStreamingList()
		}
	}, [langId, isLogin])

	return isShowLiveStreaming && !isGetLiveStreamingListFetching ? (
		<div
			className={classNames('eventLink livesports', {
				eurocup: isEventPeriod(EUROPE_EVENT_PERIOD),
			})}
		>
			<button
				className='icon icon-close'
				onClick={() => setIsShowLiveStreaming(false)}
			/>
			<a onClick={handleLiveSteamingModalOpen}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/livesports-${LIVESTREAM_CURRENCY_TO_LANG_KEY[currencyId]}.png`}
					alt='livesports'
				/>
			</a>
		</div>
	) : null
}

export default LiveStreamingLink
