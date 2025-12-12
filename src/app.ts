import fastify from 'fastify';
import { booksRouter } from './routes/books';
import cookies from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { userRoute } from './modules/user/routes/user.route';
import { sessionRoute } from './modules/user/routes/session.route';
import { env } from './env';
import { checkUserAuthentication } from './modules/user/middlewares/check-user-authentication';

export const app = fastify();

// plugins
app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
});
app.register(cookies);

// Decorators
app.decorate('authenticate', checkUserAuthentication);

// Routes
app.addHook('preHandler', async (req, res) => {
  req.jwt = app.jwt;
});

app.register(sessionRoute, { prefix: '/session' });
app.register(userRoute, { prefix: '/users' });
app.register(booksRouter, { prefix: '/books' });
