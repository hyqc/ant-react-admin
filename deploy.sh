#!/bin/bash
rm -rf ant-react-admin.tar.gz
rm -rf ant-react-admin
mkdir ant-react-admin
cp -r config mock start.sh tests .editorconfig  .prettierignore  docs package.json tsconfig.json .eslintignore .prettierrc.js jest.config.js public yarn.lock .eslintrc.js .stylelintrc.js jsconfig.json README.md LICENSE src ant-react-admin
cd ant-react-admin/src
rm -rf .umi*
cd ../../
tar -zcvf ant-react-admin.tar.gz ant-react-admin
rm -rf ant-react-admin
