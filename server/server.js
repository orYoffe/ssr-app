import path from "path";
import fs from "fs";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App, { getData } from "../src/App";

const PORT = 8080;
const app = express();

const router = express.Router();

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }
    const id = req._parsedOriginalUrl.path.slice(1);

    const context = { url: req._parsedOriginalUrl.path };

    console.log("--¯_(ツ)_/¯-----------id----------", id);

    getData(id).then(todo => {
      const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <App todo={todo} />
        </StaticRouter>
      );

      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<script>window.__TODO__ = ${JSON.stringify(
            todo
          )}</script><div id="root">${html}</div>`
        )
      );
    });
  });
};

router.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

router.use("*", serverRenderer);
// tell the app to use the above rules
app.use(router);

// app.use(express.static('./build'))
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
