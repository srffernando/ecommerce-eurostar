const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'EuroStar API is running',
		endpoints: {
			healthcheck: '/api/healthcheck',
			docs: '/api/docs'
		}
	});
});

app.use('/api', routes);

module.exports = app;
