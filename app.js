var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
expressSanitizer =require("express-sanitizer"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

//app config
mongoose.connect("mongodb+srv://mayank_manu:Mayank03@cluster0-jhigo.mongodb.net/test?retryWrites=true",{useNewUrlParser : true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/stylesheet", express.static("stylesheet"));
app.use("/script", express.static("script"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//mongoose model config
var blogSchema =new mongoose.Schema({
    title: String,
    author: String,
    alias: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//Restful routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

//New Route
app.get("/blogs/new", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        }
        else{
            res.render("new", {blogs: blogs});
        }
    });
});

app.get("/blogs/about", function(req, res){
    res.render("about");
});

app.get("/blogs/signin", function(req, res){
    res.render("signin");
});

//Create Route
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs/new");
        }
    });
});

app.get("/blogs/allblogs", function(req, res){
     Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        }
        else{
            res.render("allblogs", {blogs: blogs});
        }
    });
});

//Show route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog : foundBlog});
        }
    });
});

//edit route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit", {blog : foundBlog});
        }
    })
});

//update route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err, UpdatedBlog){
        if(err){
          res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/" + req.param.id);
        }
    });
});

app.listen(3000, '127.0.0.1');{
    console.log("SERVER IS RUNNING!");
}

//delete route
app.delete("/blogs/:id",function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//title
//image
//body
//created
