#!/bin/bash

if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Not running as root"
    exit
fi

cp ./leds /usr/local/bin/leds
chmod +x /usr/local/bin/leds

cp ./resources/colours.conf /home/pi/.config/leds/colours.conf 
cp ./resources/etc/bash_completion.d/leds /etc/bash_completion.d/leds