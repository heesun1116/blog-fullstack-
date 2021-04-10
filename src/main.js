require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
//서버와 데이터베이스의 연결
import mongoose from 'mongoose';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const app = new Koa();
const router = new Router();

//process.env 내부 값에 대한 레퍼런스 생성
const { PORT, MONGO_URI } = process.env;

//서버와 데이터 베이스 연결
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((e) => {
    console.error(e);
  });

//라우터 설정

router.use('/api', api.routes()); //api 라우트 적용

//라우터 적용 전에 bodyParser 적용

app.use(bodyParser());
app.use(jwtMiddleware);

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//PORT 가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listenging to port %d', port);
});
