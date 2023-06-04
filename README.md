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

使用 tsconfig.base.json 定義的 paths 方便絕對路徑 import 以減少使用相對路徑

tsconfig.base.json

```json
		"paths": {
			"@apps/*": ["apps/*"],
			"@nx-next-app/components/*": ["libs/web/src/components/*"],
			"@nx-next-app/constants": ["libs/web/src/app/constants"],
			"@nx-next-app/data-access": ["libs/web/src/data-access"],
			"@nx-next-app/features": ["libs/features/src/lib"],
			"@nx-next-app/hooks": ["libs/web/src/hooks"],
			"@nx-next-app/service": ["libs/web/src/service"],
			"@nx-next-app/store": ["libs/web/src/app/store"],
			"@nx-next-app/utils": ["libs/web/src/utils"]
		}
```
