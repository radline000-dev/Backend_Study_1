//Module Import
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const connectDB = require("./config/db");
const ErrorResponse = require("./utils/ErrorResponse");
const fileuplaod = require("express-fileupload");

// Settings models import
const user = require("./routes/user");
const cafe = require("./routes/cafe");

// 환경 변수 로드
dotenv.config({ path: "./config/config.env" });

//Data Base  Connect
connectDB();

//express 생성
const app = express();
//정적 폴더 셋팅
app.use(express.static(path.join(__dirname, "public")));

//json를 읽을 수 있게
app.use(express.json());
app.use(fileuplaod());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Settings router Import
app.use("/api/user", user);
app.use("/api/cafe", cafe);

app.use(errorHandler);

//PORT Setting
const PORT = process.env.PORT || 5000;

//Server
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port  ${PORT}`.yellow
      .bold
  );
});
