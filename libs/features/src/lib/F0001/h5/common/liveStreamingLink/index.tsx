import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { includes } from 'lodash-es'
import { useAuth, useStaticData } from '@nx-next-app/data-access'
import classNames from 'classnames'
import { LIVESTREAM_CURRENCY_TO_LANG_KEY, EVENT_PERIOD } from '@nx-next-app/constants'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import {
	useLazyGetDataListQuery,
	ILiveStreamingData,
} from '@nx-next-app/service'
import { isEventPeriod } from '@nx-next-app/utils'
import LiveStreamingModal from './LiveStreamingModal'

const LiveStreamingLink = () => {
	const { modal } = useGlobalModal()
	const {
		userInfo: { currencyId, langId },
		auth: { isLogin },
	} = useAuth()
	const { ALLOWED_CURRENCIES } = useStaticData()
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
			// eslint-disable-next-line no-console
			console.error('LiveStreaming', error)
		}
	}

	const handleLiveSteamingModalOpen = () => {
		modal.open(<LiveStreamingModal liveStreamingList={liveStreamingList} />, {
			className: 'livesportspop',
		})
	}

	useEffect(() => {
		// 當currencyId為vn或th時顯示直播icon
		if (includes(ALLOWED_CURRENCIES.LIVE_STREAMING_LINK, currencyId)) {
			handleGetLiveStreamingList()
		}
	}, [langId, isLogin])

	return isShowLiveStreaming && !isGetLiveStreamingListFetching ? (
		<div
			className={classNames('eventLink livesports', {
				eurocup: isEventPeriod(EVENT_PERIOD.EUROPE_CUP),
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
