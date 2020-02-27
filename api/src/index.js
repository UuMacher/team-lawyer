const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const { execSync } = require('child_process');

app.use(koaBody({
  formidable:{
    uploadDir: './uploads',
    keepExtensions: true
  },
  multipart: true,
  urlencoded: true
}));

app.use(async (ctx, next) => {
  const result = execSync('cd 3rdparty/DeepSpeech && deepspeech-venv/bin/deepspeech --model deepspeech-0.6.1-models/output_graph.pbmm --lm deepspeech-0.6.1-models/lm.binary --trie deepspeech-0.6.1-models/trie --audio ../../uploads/test.wav');
  ctx.body = result;
});

app.listen(3000, () => console.log('Koa app listening on 3000'));
