const Koa = require('koa');
const koaRouter = require('@koa/router');
const koaBody = require('koa-body');
const app = new Koa();

app.use(koaBody({
  formidable:{
    uploadDir: './uploads',
    keepExtensions: true
  },
  multipart: true,
  urlencoded: true
}));

const router = new koaRouter();

router.post('/phonecall', handlePhonecall);

function *handlePhonecall() {
  console.log("Files: ", this.request.body.files);
  console.log("Fields: ", this.request.body.fields);
  this.body = "Received your data!";
}

app.use(router.routes());
app.use(router.allowedMethods());

console.log('listening on port 3000');
app.listen(3000);
