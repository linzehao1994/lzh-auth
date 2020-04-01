const request = require('request-promise');

module.exports = (options = {}) => {
  const { baseUrl } = options;

  if (!baseUrl) throw new Error('baseUrl required in auth middleware');

  return async (req, res, next) => {
    let accessToken;

    if (req.query['access_token']) {
      accessToken = req.query['access_token'];
    } else if ((req.headers.authorization || '').indexOf('Bearer ') == 0) {
      accessToken = req.headers.authorization.replace('Bearer', '').trim();
    } else {
      return res.status(401).send({ error: 'access_token required' });
    }

    try {
      const body =
        (await request({
          uri: `${baseUrl}/oauth/me`,
          qs: { access_token: accessToken },
          json: true
        })) || {};

      req.session = req.session || {};

      Object.assign(req.session, body, { accessToken });

      return next();
    } catch (error) {
      return res.status(401).send({ error: 'access_token invalid' });
    }
  };
};
