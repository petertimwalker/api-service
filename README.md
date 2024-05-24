# api-service

This is a simple Express app hosted on an Amazon Linux 2 EC2 server used by peterwalker.xyz/bookapp to fetch the Google Books Api key it uses.

peterwalker.xyz/bookapp fetches this api key by calling https://api.peterwalker.xyz/api/key.

This is important because Single Page Applications expose any secrets they are built with.

I use certbot to create the https certifications

```sudo yum install -y certbot```

```sudo certbot certonly --standalone -d api.peterwalker.xyz```

I run this process in the background of my EC2 server using
```nohup sudo node server.js &```
