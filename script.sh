
#!/bin/sh

# $1={appName}
# 複製 {appsName} 至 build folder
#  https://github.com/i18next/next-i18next#custom-next-i18nextconfigjs-path
cp apps/nova88-desktop/.env dist/apps/nova88-desktop
cp apps/nova88-desktop/next-i18next.config.js dist/apps/nova88-desktop
cp -R public/locales/ dist/apps/nova88-desktop/public/locales
