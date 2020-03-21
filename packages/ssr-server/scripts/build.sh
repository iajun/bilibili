###
 # @Date: 2020-03-22 10:09:23
 # @Author: Sharp
 # @LastEditors: Sharp
 # @LastEditTime: 2020-03-22 10:51:27
 ###
cd ../web

rimraf dist
yarn build:client
yarn build:server

cd ../ssr-server

rimraf dist

tsc -p tsconfig.json

rimraf dist/web

cpr dist/ssr-server/src dist/src
rimraf dist/ssr-server

cpr public dist/public

cpr ../web/dist dist/dist
rimraf ../web/dist

cpr package.json ./dist/package.json

rimraf ../../server

cpr dist ../../server
rimraf dist

cd ../../server

cnpm i


