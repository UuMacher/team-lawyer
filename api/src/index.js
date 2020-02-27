const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/phonecall', (ctx, next) => {
  ctx.body = 'phonecall route';
});

router.get('/crawler', (ctx, next) => {
  ctx.body = 'crawler route';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log('listening on port 3000');
app.listen(3000);
