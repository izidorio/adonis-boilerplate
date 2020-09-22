const jwtParse = (token) => {
  const [, uuid] = token.split('.');
  const buff = Buffer.from(uuid, 'base64');
  const tokenDecode = buff.toString('ascii');

  const tokenParse = JSON.parse(tokenDecode);
  return tokenParse;
};

module.exports = jwtParse;
