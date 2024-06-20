import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { renderFieldError } from '@nx-next-app/utils'
import { EMAIL_OR_PHONE_REGEX } from '@nx-next-app/constants'
import { useSetQuestionnaireMutation } from '@nx-next-app/service'
import { useAuth } from '@nx-next-app/data-access'

export type TSurveyForm = {
	content: string
	contactInfo: string
}

const Survey = () => {
	const { t } = useTranslation()
	const [isOpenSurvey, setIsOpenSurvey] = useState<boolean>(false)
	const [isSubmit, setIsSubmit] = useState<boolean>(false)
	const { modal } = useGlobalModal()
	const { handleSubmit, register, reset } = useForm<TSurveyForm>()
	const {
		auth: { isLogin },
	} = useAuth()

	const [setQuestionnaire] = useSetQuestionnaireMutation()

	const onSubmit: SubmitHandler<TSurveyForm> = async data => {
		try {
			await setQuestionnaire({
				...data,
			}).unwrap()
			reset()
			setIsSubmit(true)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onSubmitInvalid = (errors: FieldErrors<TSurveyForm>) => {
		modal.error(renderFieldError(errors))
	}

	const onCloseSurvey = () => {
		reset()
		setIsOpenSurvey(false)
		setIsSubmit(false)
	}

	if (!isLogin) {
		return null
	}

	return (
		<div id='survey'>
			<button className='survey-icon-btn' onClick={() => setIsOpenSurvey(true)}>
				<img
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/survey.svg`}
					alt='survey'
				/>
			</button>
			<div className={classNames('survey-box', { active: isOpenSurvey })}>
				<div
					className={classNames('survey-before', {
						close: isSubmit,
					})}
				>
					<div>{t('Label_Survey_Title')}</div>
					<div>{t('Label_Survey_Hint1')}</div>
					<form
						className='survey-input'
						onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
					>
						<fieldset>
							<textarea
								placeholder={t('Label_Survey_Phd_Content') ?? ''}
								{...register('content', {
									required: {
										value: true,
										message: t('Label_Survey_Req_Content'),
									},
									maxLength: 2000,
								})}
								maxLength={2000}
							/>
						</fieldset>
						<fieldset>
							<input
								{...register('contactInfo', {
									required: {
										value: false,
										message: '',
									},
									pattern: {
										value: EMAIL_OR_PHONE_REGEX,
										message: t('Label_Survey_Vld_Contact'),
									},
								})}
								type='text'
								placeholder={t('Label_Survey_Phd_Contact') ?? ''}
							/>
						</fieldset>
						<fieldset className='survey-btn'>
							<button type='submit'>{t('Label_General_Submit')}</button>
							<button type='button' onClick={onCloseSurvey}>
								{t('Label_General_Cancel')}
							</button>
						</fieldset>
					</form>
				</div>
				<div
					className={classNames('survey-after', {
						close: !isSubmit,
					})}
				>
					<button className='icon icon-close' onClick={onCloseSurvey} />
					<div>
						<img
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/thankyou.png`}
							alt='thankyou'
						/>
						<div>{t('Label_General_Thankyou')}</div>
					</div>
					<div>{t('Label_Survey_Hint2')}</div>
				</div>
			</div>
		</div>
	)
}

export default Survey
