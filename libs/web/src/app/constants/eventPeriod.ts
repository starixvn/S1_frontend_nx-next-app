import { IEventPeriod } from '@nx-next-app/types'

export const EVENT_PERIOD: {
	LUCKY_WHEEL?: IEventPeriod
	EUROPE_CUP: IEventPeriod
	EUROPE_EVENT_AFTER_PREDICT: IEventPeriod
	OLYMPIC: IEventPeriod
	MIDAUTUMN: IEventPeriod
	CHRISTMAS: IEventPeriod
	NEW_YEAR_EVENT: IEventPeriod
} = {
	LUCKY_WHEEL: { start: '2021/12/13 00:00:00', end: null },
	// 歐洲盃賽事期間
	EUROPE_CUP: { start: '2024/04/15 00:00:00', end: '2024/07/15 23:59:59' },
	// 歐洲盃賽事預測結束時間
	EUROPE_EVENT_AFTER_PREDICT: { start: '2024/06/14 23:59:59', end: null },
	// 奧運期間
	OLYMPIC: { start: '2024/06/16 00:00:00', end: '2024/08/15 23:59:59' },
	// 2024中秋節
	MIDAUTUMN: { start: '2024/09/12 00:00:00', end: '2024/09/18 23:59:59' },
	// 2024 聖誕節
	CHRISTMAS: { start: '2024/12/17 00:00:00', end: '2024/12/26 23:59:59' },
	// 2025 新年活動
	NEW_YEAR_EVENT: { start: '2025/1/20 00:00:00', end: '2025/2/12 23:59:59' },
}
