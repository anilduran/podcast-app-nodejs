const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config({
    path: __dirname + '/src/.env'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

const podcastListsRoute = require('./src/routes/podcastLists.route');
const authRoute = require('./src/routes/auth.route');
const categoriesRoute = require('./src/routes/categories.route');
const usersRoute = require('./src/routes/users.route');
const meRoute = require('./src/routes/me.route');
const healthCheckRoute = require('./src/routes/healthCheck.route');
const podcastsRoute = require('./src/routes/podcasts.route');
const playlistsRoute = require('./src/routes/playlists.route');

app.use('/api/auth', authRoute);
app.use('/api/podcast-lists', podcastListsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/users', usersRoute);
app.use('/api/me', meRoute);
app.use('/health-check', healthCheckRoute);
app.use('/api/podcasts', podcastsRoute);
app.use('/api/playlists', playlistsRoute);

app.listen(3000, () => {
    console.log('app is running...');
});