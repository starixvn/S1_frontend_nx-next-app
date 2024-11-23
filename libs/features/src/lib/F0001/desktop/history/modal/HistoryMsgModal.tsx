import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { WrapperModal } from '@nx-next-app/features/F0001/desktop/modal/styles'
import dayjs from 'dayjs'
import { cloneDeep, uniqueId } from 'lodash-es'
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
	// 使用 sort 時應建立副本，並對副本做更動，因 sort 會修改原始資料，直接更動 api 回傳的 data 會導致報錯
	const cloneMessageDetail = cloneDeep(messageDetail)
	return (
		<WrapperModal>
			<div className='pop'>
				<div className='statuspop'>
					<i className='icon icon-notifi icon-alert-fill' />
					<i
						className='icon close-popup icon-close-line'
						onClick={() => closeModal()}
					/>
					<div className='title'>
						{transId} {t('Label_General_Message')}
					</div>
					<div className='notifi-content'>
						{cloneMessageDetail
							?.slice()
							.sort(
								({ createTime: createTimeA }, { createTime: createTimeB }) =>
									new Date(createTimeB).getTime() -
									new Date(createTimeA).getTime()
							)
							.map(({ createTime, errorTypeName, message }) => (
								<div key={uniqueId(createTime)}>
									<div className='subtitle'>{errorTypeName}</div>
									<div>
										{dayjs(createTime).format('MM/DD/YYYY hh:mm:ss A (Z)')}
									</div>
									<div>{message}</div>
								</div>
							))}
					</div>
					<div className='btnGroup'>
						<button className='btn-primary' onClick={() => closeModal()}>
							{t('Label_General_OK')}
						</button>
					</div>
				</div>
			</div>
		</WrapperModal>
	)
}

export default HistoryMsgModal
