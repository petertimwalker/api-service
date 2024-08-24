# api-service

This is a simple Express app hosted on an Amazon Linux 2 EC2 server used by peterwalker.xyz/bookapp to query Google Books Api.

peterwalker.xyz/bookapp fetches this api key by calling https://api.peterwalker.xyz/api/key.

This is important because Single Page Applications expose any secrets they are built with.

I use certbot to create the https certifications

`sudo yum install -y certbot`

`sudo certbot certonly --standalone -d api.peterwalker.xyz`

I run this process in the background of my EC2 server using
`sudo pm2 start server.js`

# Local dev
1. Get an API key for the Google Books API [here](https://console.cloud.google.com/apis/library/books.googleapis.com?project=booksearch-281216)
2. Set it in .env export API_KEY=
3. npm install
4. NODE_ENV=development npm start
5. Now this server is running on port 3001 http://localhost:3001
6. Set up local dev for the bookapp [here](https://github.com/petertimwalker/portfolio-site/blob/main/README.md#local-dev)
