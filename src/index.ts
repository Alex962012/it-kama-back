import express, { Request, Response } from "express";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 5000;
const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
const addreses = [
  { id: 1, value: "50 let " },
  { id: 2, value: "adrewws" },
];

app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    let searchString = req.query.title.toString();
    res.send(products.filter((p) => p.title.indexOf(searchString) > -1));
  } else {
    res.send(products);
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((el) => el.id === +req.params.id);
  if (product) {
    res.send(product);
  }
  res.send(404);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  products.forEach((product, i) => {
    if (product.id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return;
    }

    res.send(404);
  });
});
app.get("/adreses", (req: Request, res: Response) => {
  res.send(products);
});

app.get("/adreses/:id", (req: Request, res: Response) => {
  const adress = addreses.find((adr) => adr.id === +req.params.id);
  if (adress) {
    res.send(adress);
  }
  res.send(404);
});

app.post("/products", (req: Request, res: Response) => {
  const newProduct = {
    id: +new Date(),
    title: req.body.title,
  };
  products.push(newProduct);
  res.send(201).send(newProduct);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const product = products.find((el) => el.id === +req.params.id);
  if (product) {
    product.title = req.body.title;
    res.send(product);
  }
  res.send(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
