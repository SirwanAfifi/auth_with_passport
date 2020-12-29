import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import * as session from "express-session";
import auth from "./controllers/authentication";

const PORT = 9000;
const app = express();

app.use(express.json());
app.use(
  session({
    name: "AUTH_S1",
    secret: "SOME_SECRET",
  })
);
app.get("/", (_, res) => res.send("Hello World"));
app.use("/api/auth", auth);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await createConnection();
    console.log("Database connected!");
  } catch (err) {
    console.log(err);
  }
});
