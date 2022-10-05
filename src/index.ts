import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true, limit: '8mb' }));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(morgan('dev'));
app.use(express.json());

/*********** CORS CONFIG **********************/
app.use(
	cors({
		origin: '*',
	})
);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
//////////////// ENDS CORS CONFIG ///////////////////////

app.use(express.static(path.resolve(__dirname, '../client')));

// Answer API requests.
app.get('/api/', (req, res) => {
	res.json({ message: 'Welcome to the Service API!' });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
