## Table of Contents

1. [如何另開頁面](#如何另開頁面)
2. [如何渲染圖片](#如何渲染圖片)
3. [如何加入使用者驗證](#如何加入使用者驗證)
4. [如何正確使用第三方Script](#如何正確使用三方Script)

**[⬆ back to top](#table-of-contents)**

#### 如何另開頁面

<!-- - [1.1](#next-link) 如何使用 `Link` 來另開頁面 -->

```tsx
<Link href='https://www.google.com/' className='logo' passHref>
	<a target='_blank' rel='noopener noreferrer'>
		Link
	</a>
</Link>
```

#### 如何渲染圖片

- next/future/image
  `next/image` 渲染出來時元素會多包一層 `span` ，會讓設計提供的設計搞稿跑版，故使用 `next/future/image` 渲染圖片(不會有 span tag)

```tsx
// 使用 `next/future/image` 渲染圖片
import Image from 'next/future/image'
```

```tsx

// 先用原生 img 查看寬高，再給予定寬高
<img src={logoUrl} alt='logoUrl' />

// 改為
<Image src={logoUrl} alt='logo' width={150} height={66} />
```

#### 如果加入使用者驗證

如果 originIsSignIn = false, early return redirect

```tsx
// * https://nextjs.org/docs/pages/building-your-application/routing/authenticating
export const getServerSideProps: GetServerSideProps = async context => {
	const initialProps = await useServerSideInitialPropsFetcher(context)

	if (!initialProps.originIsSignIn) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			...initialProps,
			...(await serverSideTranslations(context.locale)),
		},
	}
}
```

#### 如果正確使用三方Script
因 serverSide 在 render 時無法正確吃到 thirdParty 的 script 
故照以下方式撰寫實在 build project 時可能會出現錯誤

```tsx
  window.IGLOO.getBlackbox === 'function'
// Type error: Property 'IGLOO' does not exist on type 'Window & typeof globalThis'.
```

要使用以下寫法才有辦法成功 build project 
```tsx
    (window as any).IGLOO.getBlackbox === 'function'
```
  
