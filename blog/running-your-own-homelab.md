---
title: "Running your own homelab for the rest of us"
date: "2025-02-09"
excerpt: "A how-to guide for runing your own homelab using raspberry Pi and Nginx"
---

## Things you'll need
1. A Raspberry Pi (I'm using version 4)
2. Micro SD Card
3. Wi-Fi or ethernet cable
4. Power supply


## Loading RaspberryOS onto your Pi

If you don't already, you'll need to load the raspberry Pi OS onto your micro sd card. You can download installer via https://www.raspberrypi.com/software/ on your laptop. 

1. connect the micro-sd to your laptop
2. run the raspberryPi imager
3. It will prompt you to choose `device`, `operating system`, and `storage`

## Adding SSH file

cd into micro-sd 
```
touch .ssh
```

## Connecting to wifi
In order to connect to wifi you'll need to update the `wpa_supplicant.conf` file.

```bash
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="<your wifi name>"
    psk="<your wifi password>"
    key_mgmt=WPA-PSK
    priority=1
}
```

Ensure you have a `.ssh` and `wpa_supplicant.conf` file in the micro-sd directory

## Test Connection

You should now be able to ping your raspberryPi

```bash
ping raspberrypi.local
```

# Using Tailscale for private networking

Install Tailscale on the devices you want to access your private network. I connected my laptop, iphone, and raspberryPi. 

https://tailscale.com/learn/how-to-ssh-into-a-raspberry-pi

https://login.tailscale.com/admin/machines

You can ssh via the browser in the Tailscale app

TODO: when you're connected to tailscale - should have access regardless of what network you're on.

## Let's set up the web server using Nginx

In order to server the files from our raspberryPi's ip address we'll need a web server. I chose Nginx because it's easy to set up and its what I know.

I followed this tutorial up until #7 (since i'm not loading php files) https://pimylifeup.com/raspberry-pi-nginx/

## Adding your apps

In Nginx all apps are stored in `cd /var/www/html/` I have a bunch of react apps built with vite.

So I built the applications then used `scp` to move over the files

```
scp -r /path/to/source user@remote:/path/to/destination
scp -r /path/to/my/app pi@<your_raspberry_ip>:/var/www/html/<app_name>
```

## 
ssh into other machines
Why can i still ssh into my pi not on tailscale

at recurse on tailscale -> should have access,


## Add users to tailscale group

https://login.tailscale.com/admin/users

**give usrers access to public ip
**196.168 is always private ip
