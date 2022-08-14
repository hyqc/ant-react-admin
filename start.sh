#!/bin/bash
cd src/
rm -rf ./.umi*
cd ../
pid=$(lsof -i:8888 | awk 'NR==3{print $2}')
echo $pid
sleep 2
if [ -n "$pid" ]
then
	echo 杀掉进程$pid
	kill -9 $pid
fi
echo 开始启动
yarn install
nohup yarn start > /tmp/mock-wei.log 2>&1 &
echo success
