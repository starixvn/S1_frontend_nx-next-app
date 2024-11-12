/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable react/no-danger */
import { getGA4ID, getGTMId } from '@nx-next-app/site/nova88/data'
import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'

interface CustomDocumentProps extends DocumentInitialProps {
	host?: string
}

class MyDocument extends Document<CustomDocumentProps> {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		const host = ctx.req && ctx.req.headers ? ctx.req.headers.host : ''
		return { ...initialProps, host }
	}

	render() {
		const { host } = this.props
		const gtmId = getGTMId(host)
		const ga4Id = getGA4ID(host)
		return (
			<Html>
				<Head>
					<link
						href='https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@300;400;600&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap'
						rel='stylesheet'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500&display=swap'
						rel='stylesheet'
					/>

					{process.env['NEXT_PUBLIC_SITE_NAME'] !== '' && (
						<link
							rel='stylesheet'
							href={`/css/${process.env['NEXT_PUBLIC_SITE_NAME']}/style-dark.css`}
						/>
					)}

					{process.env['NEXT_PUBLIC_SITE_NAME'] !== '' && (
						<link
							rel='stylesheet'
							href={`/css/${process.env['NEXT_PUBLIC_SITE_NAME']}/style.css`}
						/>
					)}

					{process.env['NEXT_PUBLIC_SITE_NAME'] !== '' && (
						<link
							rel='stylesheet'
							href={`/css/${process.env['NEXT_PUBLIC_SITE_NAME']}/swiper.css`}
						/>
					)}

					{process.env['NEXT_PUBLIC_SITE_NAME'] !== '' && (
						<link
							rel='stylesheet'
							href={`/css/${process.env['NEXT_PUBLIC_SITE_NAME']}/font.css`}
						/>
					)}

					{process.env['NEXT_PUBLIC_ENV'] === 'PRD' && (
						<>
							{/* Yuri Track , 市場廣告商使用的追蹤碼 */}
							<script
								dangerouslySetInnerHTML={{
									__html: `!function(y,u,r,i){y._yuri_track||((n=y._yuri_track=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}).queue=n.queue||[],y._yuri_track._fp||(y._yuri_track._fp=1,t=u.createElement(r),s=u.getElementsByTagName(r)[0],t.async=1,t.src=i,s.parentNode.insertBefore(t,s)))}(window,document,"script","https://cdn.jsdelivr.net/gh/adzon/assets/pixel.js?_rid={click_id}");`,
								}}
							/>

							{/* GA4 市場區分 domain 的 ga4 */}
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
							/>

							{/* Google Tag Manager - 市場區分 domain 的 google tag */}
							<script
								dangerouslySetInnerHTML={{
									__html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
								}}
							/>

							{/* Facebook Pixel 市場埋的廣告碼 */}
							<script
								dangerouslySetInnerHTML={{
									__html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function()
              {n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '499913589025927');
              fbq('track', 'PageView');
            `,
								}}
							/>
							<noscript>
								<img
									height='1'
									width='1'
									style={{ display: 'none' }}
									src='https://www.facebook.com/tr?id=499913589025927&ev=PageView&noscript=1'
								/>
							</noscript>
							{/* Facebook Pixel - 存／提款成功事件 */}
							{/* <script
								dangerouslySetInnerHTML={{
									__html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1037896624403579'); fbq('track', 'PageView');
                `,
								}}
							/>

							<noscript>
								<img
									height='1'
									width='1'
									style={{ display: 'none' }}
									src='https://www.facebook.com/tr?id=1037896624403579&ev=PageView&noscript=1'
								/>
							</noscript> */}
							{/* CRM System , Optimove */}
							<script
								async
								data-optimove-service-worker-path='/worker.js'
								src='https://sdk.optimove.net/websdk/?tenant_id=1431&tenant_token=792f0d9fbcc040c5880a3080c206515e'
							/>
						</>
					)}
				</Head>
				<body>
					{process.env['NEXT_PUBLIC_ENV'] === 'PRD' && (
						// Google Tag Manager (noscript) - 市場區分 domain 的 google tag
						<noscript>
							<iframe
								src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
								height='0'
								width='0'
								style={{ display: 'none', visibility: 'hidden' }}
								title='Google Tag Manager'
							/>
						</noscript>
					)}

					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
