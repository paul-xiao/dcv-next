#!/bin/bash
 
while true
do
for i in {20..1}
do
echo -en "\e[38;5;$((RANDOM % 256))m"
# expand twice
eval printf \' %.0s\' {1..$((41 - i))}
eval printf \''#%.0s'\' {1..$((2*i -1))}
echo -e "\e[0m"
done
 
echo -en "\e[20F"
sleep 0.2
done