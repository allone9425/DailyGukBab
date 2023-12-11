const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/https://place.map.kakao.com', {
			target: 'http://localhost:4000', 
			changeOrigin: true,
		})
	);
};