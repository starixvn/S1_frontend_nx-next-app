
#!/bin/sh

# $1={appName}
# 複製 {appsName} 至 build folder
#  https://github.com/i18next/next-i18next#custom-next-i18nextconfigjs-path
cp apps/$1/.env dist/apps/$1
cp apps/$1/next-i18next.config.js dist/apps/$1
cp -R public/locales/ dist/apps/$1/public/locales
