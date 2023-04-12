相關套件

- [react-hook-form](https://react-hook-form.com/get-started)

> 使用 React Hook Form 處理表單驗證。

- [usehooks-ts](https://usehooks-ts.com/)

> 使用 usehooks-ts 進行邏輯處理。

- [lodash](https://lodash.com/docs/4.17.15)

> 使用 JavaScript 實用程序庫。

## [generate app flow](/README/flow.md)

## [next-i18next](/README/next-i18next.md)

## [environment-next](/README/environment-next.md)

---

### Configure tsconfig.base.json

到專案的 tsconfig.base.json 加入該專案的指定路徑，方便 import 時使用，避免使用 `../..`

底下以 app1 為例：

tsconfig.base.json

```json
	"paths": {
			"@nx-next-app/api": ["libs/app/service/index.ts"],
			"@nx-next-app/store": ["libs/app/store"],
			"@nx-next-app/components": ["libs/web/src/components/index.ts"],
			"@nx-next-app/hooks": ["libs/web/src/hooks/index.ts"],
			"@nx-next-app/constants": ["libs/app/constants/index.ts"],
		},
```
