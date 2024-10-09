import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export * from './appDownload-context'
export * from './bankInfo-context'
export * from './cryptoWallet-context'
export * from './deposit-context'
export * from './eWallet-context'
export * from './history-context'
export * from './luckyWheel-context'
export * from './profileInfo-context'
export * from './promotion-context'
export * from './referral-context'
export * from './slots-context'
export * from './statement-context'
export * from './transferFunds-context'
export * from './withdrawal-context'

dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
