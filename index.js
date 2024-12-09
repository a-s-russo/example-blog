import express from "express";
import bodyParser from "body-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

let blogs = [
  {
    blogID: uuidv4(),
    blogContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus molestie nisi quis varius. Mauris elementum sapien augue, non venenatis tellus vulputate sit amet. Donec gravida nisi quis massa bibendum mollis. Sed hendrerit libero id lacus gravida, non blandit est venenatis. Mauris vestibulum varius felis, at vehicula quam vestibulum quis. Aliquam a tincidunt neque. Cras felis sem, faucibus vel leo ac, ultricies viverra enim. Ut commodo tincidunt efficitur. Nulla sed lacinia ipsum, ut pharetra velit. Morbi laoreet varius porta. In ornare dapibus condimentum. In sem justo, maximus posuere libero quis, porttitor finibus nibh. Morbi sagittis lacus augue, ut ullamcorper velit convallis eu. Fusce quam magna, auctor sit amet ex eget, ornare ultrices odio. Nam id fringilla mi.",
  },
  {
    blogID: uuidv4(),
    blogContent:
      "Etiam ac mi in sem porta tincidunt. Vestibulum ex massa, accumsan et arcu nec, condimentum luctus mi. Praesent dapibus lacus vitae rutrum ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sapien augue, dignissim at enim vel, rhoncus consectetur nunc. Vivamus erat risus, dictum sed ornare non, consectetur vel dui. Nam sed scelerisque eros. Sed arcu nisi, suscipit eu posuere ut, faucibus in neque. Donec vestibulum nisi magna, eu malesuada nunc laoreet eu. Etiam id convallis ex. Nam interdum feugiat ante, id accumsan mauris iaculis at. Curabitur tincidunt orci in nibh vehicula pulvinar. Vivamus aliquam erat vitae sem malesuada pretium. Vivamus sollicitudin lacus nec varius efficitur. Praesent lacinia dolor pellentesque, tristique odio at, pulvinar metus. Aliquam eleifend sed enim ac euismod. Vestibulum ut porttitor risus, eget accumsan mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam pretium nulla id sodales sodales. Phasellus aliquet purus a magna vehicula elementum. Etiam ornare diam facilisis, consequat leo eget, suscipit tortor.",
  },
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/blogs", (req, res) => {
  res.render("blogs/index", { blogs });
});

app.get("/blogs/new", (req, res) => {
  res.render("blogs/new");
});

app.post("/blogs", (req, res) => {
  const { blogContent } = req.body;
  blogs.push({ blogID: uuidv4(), blogContent: blogContent });
  res.redirect("/blogs");
});

app.get("/blogs/:blogID", (req, res) => {
  const { blogID } = req.params;
  const blog = blogs.find((blog) => blog.blogID === blogID);
  res.render("blogs/show", { blog });
});

app.get("/blogs/:blogID/edit", (req, res) => {
  const { blogID } = req.params;
  const blog = blogs.find((blog) => blog.blogID === blogID);
  res.render("blogs/edit", { blog });
});

app.patch("/blogs/:blogID", (req, res) => {
  const { blogID } = req.params;
  const foundBlog = blogs.find((blog) => blog.blogID === blogID);
  const newBlogContent = req.body.blogContent;
  foundBlog.blogContent = newBlogContent;
  res.redirect("/blogs");
});

app.delete("/blogs/:blogID", (req, res) => {
  const { blogID } = req.params;
  blogs = blogs.filter((blog) => blog.blogID !== blogID);
  res.redirect("/blogs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
