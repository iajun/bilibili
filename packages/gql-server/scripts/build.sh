###
 # @Date: 2020-03-22 11:37:06
 # @Author: Sharp
 # @LastEditors: Sharp
 # @LastEditTime: 2020-03-22 11:38:31
 ###

rimraf dist

tsc -p ./tsconfig.json

cpr src/gql/schema.gql dist/gql/schema.gql