const IP_SERVER = 'localhost:3000';

export const environment = {
  production: false,
  api: `http://${IP_SERVER}`,
  apiService: {
    client: {
      list: '/api/client/list',
    }
  }
};
