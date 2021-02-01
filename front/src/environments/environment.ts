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
    project: {
      list: '/api/project/list',
      insert: '/api/project/insert',
      update: '/api/project/update',
      delete: '/api/project/delete'
    },
    combo: {
      projects: '/api/combo/projects',
      clients: '/api/combo/clients'
    }
  }
};
