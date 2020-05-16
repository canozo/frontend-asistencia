import config from './config';

async function api(route, method, body, token, signal) {
  const data = await fetch(`${config.server}/api${route}`, {
    method,
    signal,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const res = await data.json();
  if (res.status === 'error') {
    throw new Error(res.msg);
  }
  return res;
}

export default api;
