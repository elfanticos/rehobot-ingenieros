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
    incidence: {
      list: '/api/incidence/list',
      insert: '/api/incidence/insert',
      update: '/api/incidence/update',
      delete: '/api/incidence/delete'
    },
    combo: {
      projects: '/api/combo/projects',
      clients: '/api/combo/clients',
      roles: '/api/combo/roles'
    },
    advance: {
      insert: '/api/advance/insert'
    },
    user: {
      list: '/api/user/list',
      insert: '/api/user/insert',
      update: '/api/user/update',
      delete: '/api/user/delete'
    },
    oauth: {
      login: '/api/oauth/login'
    }
  }
};
