import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { EMAIL_OR_PHONE_REGEX } from '@nx-next-app/constants'
import { useAuth } from '@nx-next-app/data-access'
import { useSetQuestionnaireMutation } from '@nx-next-app/service'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type TSurveyForm = {
	content: string
	contactInfo: string
}

const Survey = () => {
	const { t } = useTranslation()
	const [isOpenSurvey, setIsOpenSurvey] = useState<boolean>(false)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const { modal } = useGlobalModal()
	const {
		auth: { isLogin },
	} = useAuth()
	const { handleSubmit, register, reset, formState } = useForm<TSurveyForm>({
		mode: 'onBlur',
	})
	const { errors, isSubmitting, isDirty, isValid } = formState

	const [setQuestionnaire] = useSetQuestionnaireMutation()

	const onSubmit: SubmitHandler<TSurveyForm> = async data => {
		try {
			await setQuestionnaire({
				...data,
			}).unwrap()
			reset()
			setIsSubmitted(true)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onCloseSurvey = () => {
		reset()
		setIsOpenSurvey(false)
		setIsSubmitted(false)
	}

	const renderInfoMessage = (errMsg: string) => {
		if (errMsg) {
			return <div className={classNames('tip', 'active')}>{errMsg}</div>
		}
		return null
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
						close: isSubmitted,
					})}
				>
					<i className='icon icon-close-line' onClick={onCloseSurvey} />
					<div>{t('Label_Survey_Title')}</div>
					<div>{t('Label_Survey_Hint1')}</div>
					<form className='survey-input' onSubmit={handleSubmit(onSubmit)}>
						<fieldset className={classNames({ error: !!errors['content'] })}>
							<textarea
								{...register('content', {
									required: {
										value: true,
										message: t('Label_Survey_Req_Content'),
									},
									maxLength: 2000,
								})}
								placeholder={t('Label_Survey_Phd_Content') ?? ''}
								maxLength={2000}
							/>
							{renderInfoMessage(errors['content']?.message as string)}
						</fieldset>
						<fieldset
							className={classNames({ error: !!errors['contactInfo'] })}
						>
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
							{renderInfoMessage(errors['contactInfo']?.message as string)}
						</fieldset>
						<fieldset className='survey-btn'>
							<button
								type='submit'
								disabled={!isDirty || !isValid || isSubmitting}
							>
								{t('Label_General_Submit')}
							</button>
							<button type='button' onClick={onCloseSurvey}>
								{t('Label_General_Cancel')}
							</button>
						</fieldset>
					</form>
				</div>
				<div
					className={classNames('survey-after', {
						close: !isSubmitted,
					})}
				>
					<i className='icon icon-close-line' onClick={onCloseSurvey} />
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
