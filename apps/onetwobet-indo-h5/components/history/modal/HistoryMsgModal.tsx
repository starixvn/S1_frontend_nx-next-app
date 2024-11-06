import { useGlobalModal } from '@nx-next-app/components/config-provider'
import dayjs from 'dayjs'
import { uniqueId } from 'lodash-es'
import { useTranslation } from 'next-i18next'

export interface IHistoryMsgModalProps {
	transId: string
	messageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
}

const HistoryMsgModal = ({ transId, messageDetail }: IHistoryMsgModalProps) => {
	const { t } = useTranslation()
	const { closeModal } = useGlobalModal()

	return (
		<div className='pop'>
			<div className='statustitle'>
				{transId} {t('Label_General_Message')}
			</div>
			<div className='statuscontent'>
				{messageDetail
					?.slice()
					.sort(
						({ createTime: createTimeA }, { createTime: createTimeB }) =>
							new Date(createTimeB).getTime() - new Date(createTimeA).getTime()
					)
					.map(({ createTime, errorTypeName, message }) => (
						<div key={uniqueId(createTime)}>
							<div className='subtitle'>{errorTypeName}</div>
							<div>{dayjs(createTime).format('MM/DD/YYYY hh:mm:ss A (Z)')}</div>
							<div>{message}</div>
						</div>
					))}
			</div>
			<button className='success' onClick={() => closeModal()}>
				{t('Label_General_OK')}
			</button>
		</div>
	)
}

export default HistoryMsgModal
