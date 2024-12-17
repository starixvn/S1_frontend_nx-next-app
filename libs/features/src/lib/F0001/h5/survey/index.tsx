import { Form, Header } from '@nx-next-app/components/H0001'
import { useGlobalModal } from '@nx-next-app/components/config-provider'
import { EMAIL_OR_PHONE_REGEX } from '@nx-next-app/constants'
import { WrapperCustomTitleBack } from '@nx-next-app/features/F0001/h5/common/CommonStyles'
import { WrapperSurvayH5 } from '@nx-next-app/features/F0001/h5/survey/styles'
import { useSetQuestionnaireMutation } from '@nx-next-app/service'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'next-i18next'

type TSurveyForm = {
	content: string
	contactInfo: string
}

const Survey = () => {
	const { t } = useTranslation()
	const { modal } = useGlobalModal()
	const router = useRouter()
	const [isSubmitted, setIsSubmit] = useState<boolean>(false)
	const { register, handleSubmit, reset, formState } = useForm<TSurveyForm>({
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
			setIsSubmit(true)
		} catch (error) {
			modal.error((error as Error).message)
		}
	}

	const onCancel = () => {
		reset()
		router.back()
	}

	const renderInfoMessage = (errMsg: string) => {
		if (errMsg) {
			return (
				<div
					className={classNames('tip active', {
						message: errMsg === t('Label_Survey_Req_Content'),
					})}
				>
					{errMsg}
				</div>
			)
		}
		return null
	}

	return (
		<WrapperSurvayH5>
			<Header className='header'>
				<WrapperCustomTitleBack>
					<div className='title custom-title-back'>
						<i className='icon icon-arrow-left-line' onClick={onCancel} />
						{t('Label_General_Survey')}
					</div>
				</WrapperCustomTitleBack>
			</Header>
			<main className='main survey'>
				<div
					className={classNames('survey-before', {
						close: isSubmitted,
					})}
				>
					<div className='heading-survey'>{t('Label_Survey_Title')}</div>
					{/* <div className='slogan-survey'>{t('Label_Survey_Hint1')}</div> */}
					<div className='slogan-survey'><Trans
                      i18nKey='Label_Survey_Hint1'
                      values={{
                        site: process.env['NEXT_PUBLIC_BRAND_NAME'] || '',
                      }}
                    /></div>

					<Form className='survey-input' onSubmit={handleSubmit(onSubmit)}>
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
								className='inputBox-blue'
							/>
							{renderInfoMessage(errors['contactInfo']?.message as string)}
						</fieldset>
						<fieldset className='btnGroup'>
							<button
								type='submit'
								disabled={!isDirty || !isValid || isSubmitting}
								className={`${
									!isDirty || !isValid || isSubmitting
										? 'btn-disable'
										: 'btn-primary'
								}`}
							>
								{t('Label_General_Submit')}
							</button>
							<button
								type='button'
								onClick={onCancel}
								className='btn-secondary'
							>
								{t('Label_General_Cancel')}
							</button>
						</fieldset>
					</Form>
				</div>
				<div
					className={classNames('survey-after', {
						close: !isSubmitted,
					})}
				>
					<div className='icon-survey'>
						<i className='icon icon-like' />
					</div>
					<div className='thank-box'>
						<div className='thank-box-heading'>
							{t('Label_General_Thankyou')}
						</div>
						<div className='thank-box-body'><Trans
                      i18nKey='Label_Survey_Hint2'
                      values={{
                        site: process.env['NEXT_PUBLIC_BRAND_NAME'] || '',
                      }}
                    /></div>
					</div>
				</div>
			</main>
		</WrapperSurvayH5>
	)
}

export default Survey
