const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db_config = require("./config/db_config.json");
const app = express();
const cors = require("cors");

const sessionStoreOptions = {
  host: db_config.host,
  port: db_config.port,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  charset: "utf8mb4", // 여기서 utf8mb4 설정
};

const sessionStore = new MySQLStore(sessionStoreOptions);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const sessionMiddleware = session({
  key: "session_cookie_name",
  secret: "dasdasd!@#@!#@skja1#@!$!ASDasd", // 여기에 랜덤한 문자열 사용
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  unset: "destroy",
  cookie: {},
});

app.use(sessionMiddleware);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "../front/build")));
app.use(express.static(path.join(__dirname, "public")));

const mypageRoutes = require("./user/mypage");
const loginRoutes = require("./user/login");

//유저정보
app.use("/mypage", mypageRoutes);
app.use("/", loginRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});