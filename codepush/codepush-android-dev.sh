

#Change isDevelopment to true for app center development
#Change isProduction to false for app center development
# sed -i '' 's/isDevelopment: false,/isDevelopment: true,/' source/webservice/URL.js
# sed -i '' 's/isProduction: true,/isProduction: false,/' source/webservice/URL.js

#Change URL's to point development server for app center development
# sed -i '' 's/\/\/ \/\*\*Development\*\//\/\*\*Development\*\//' source/webservice/URL.js
# sed -i '' 's/\/\*\*Production\*\//\/\/ \/\*\*Production\*\//' source/webservice/URL.js


#Release an update using the "release-react" command: -- codepush for app center Android Development
appcenter codepush release-react -a Innova-Zones/Fire-Department-Android -d Development