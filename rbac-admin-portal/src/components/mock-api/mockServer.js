import { createServer, Model } from 'miragejs';

createServer({
  models: {
    user: Model,
    role: Model,
  },

  seeds(server) {
    server.create('user', { name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' });
    server.create('role', { name: 'Admin', permissions: ['Read', 'Write', 'Delete'] });
    server.create('role', { name: 'User', permissions: ['Read'] });
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', (schema) => schema.users.all());
    this.post('/users', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.users.create(attrs);
    });
    this.put('/users/:id', (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      return schema.users.find(id).update(attrs);
    });
    this.delete('/users/:id', (schema, request) => {
      const id = request.params.id;
      return schema.users.find(id).destroy();
    });

    this.get('/roles', (schema) => schema.roles.all());
    this.put('/roles/:id', (schema, request) => {
      const id = request.params.id;
      const attrs = JSON.parse(request.requestBody);
      return schema.roles.find(id).update(attrs);
    });
  },
});
