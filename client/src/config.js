const config = process.env.NODE_ENV === 'production'
    ? require('./config/production')
    : require('./config/development');

export default config.default;
