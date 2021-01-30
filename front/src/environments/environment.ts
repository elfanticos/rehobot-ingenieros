const IP_SERVER = 'localhost:3000';

export const environment = {
  production: false,
  api: `http://${IP_SERVER}`,
  apiService: {
    client: {
      list: '/api/client/list',
      insert: '/api/client/insert',
      update: '/api/client/update',
      delete: '/api/client/delete'
    },
    combo: {
      projects: '/api/combo/projects'
    }
  }
};
