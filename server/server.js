const express = require('express')
const xmlbuilder = require('xmlbuilder');
const app = express();
const PORT = process.env.PORT || 3000;

// Define your application's routes
const routes = [
  '/',
  '/en/home',
  '/en/about',
  '/en/contact',
  '/en/catalog',
  '/en/terms-and-condtions',
  '/en/privacy-policy',
  '/en/cookie-policy',
  '/en/distributors',
  // Add more routes as needed
];

app.get('/sitemap.xml', (req, res) => {
  const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
  root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  routes.forEach(route => {
    const url = root.ele('url');
    url.ele('loc', `https://oflesh.com${route}`);
    // You can add more elements like <changefreq> and <priority> here if needed
  });

  res.header('Content-Type', 'application/xml');
  res.send(root.end({ pretty: true }));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});