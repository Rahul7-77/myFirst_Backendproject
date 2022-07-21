//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// var localStorage = require('localstorage');
var sessionStorage = require('sessionstorage');

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(session({
//   secret: 'This is NITCandid done by LND peeps.',
//   resave: false,
//   saveUninitialized: false
// }))

mongoose.connect("mongodb://localhost:27017/notquoraDB",{useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
// mongoose.set("useCreateIndex",true);

const userSchema = new mongoose.Schema({
  question:String,
  answer:String
});

const juniorSchema = new mongoose.Schema({
  title:String,
  question:String
});

const seniorSchema = new mongoose.Schema({
  email: String,
  password: String
});

// seniorSchema.plugin(passportLocalMongoose);

const clubSchema = new mongoose.Schema({
  question:String,
  answer:String
});

const faqSchema = new mongoose.Schema({
  question:String,
  answer:String
});

const hostelSchema = new mongoose.Schema({
  question:String,
  answer:String
});

const generalSchema = new mongoose.Schema({
  question:String,
  answer:String
});

const User = new mongoose.model("User", userSchema);
const Senior = new mongoose.model("Senior", seniorSchema);
const Junior = new mongoose.model("Junior", juniorSchema);
const Club = new mongoose.model("Club", clubSchema);
const Faq = new mongoose.model("Faq", faqSchema);
const Hostel = new mongoose.model("Hostel", hostelSchema);
const General = new mongoose.model("General", generalSchema);



app.get("/",function(req,res){
  Faq.find({}, function(err,questions){
      res.render('index', {
        questionsList: questions

      })
  })
});

app.get("/home", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    User.find({}, function(err,questions){
        res.render('home', {
          questionsList: questions
        })
    });
  } else {
    res.redirect("/login");
   }
});

app.get("/submit", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    res.render("submit");
  } else {
    res.redirect("/login");
   }
});

app.get("/club-submit", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    res.render("club-submit");
  } else {
    res.redirect("/login");
   }
});

app.get("/hostel-submit", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    res.render("hostel-submit");
  } else {
    res.redirect("/login");
   }
});

app.get("/general-submit", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    res.render("general-submit");
  } else {
    res.redirect("/login");
   }
});

app.get("/faq-submit", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    res.render("faq-submit");
  } else {
    res.redirect("/login");
   }
});

app.get("/jnrback", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    res.render("ans");
  } else {
    res.redirect("/login");
   }
});

app.get("/ans", function(req, res){
   if(sessionStorage.getItem('name')!=null){
     Junior.find({}, function(err,questions){
          res.render('main', {
            questionsList: questions
          })
      });
   } else {
    res.redirect("/login");
   }
 });

app.get("/snrsans", function(req, res){
  if(sessionStorage.getItem('name')!=null){
  User.find({}, function(err,questions){
      res.render('home', {
        questionsList: questions

      })
  })
} else {
  res.redirect("/login");
 }

});

app.get("/club-one", function(req, res){
  if(sessionStorage.getItem('name')!=null){
    Club.find({}, function(err,questions){
        res.render('club-one', {
          questionsList: questions

        })
    })
  } else {
    res.redirect("/login");
   }
});

app.get("/hostel-one", function(req, res){
  if(sessionStorage.getItem('name')!=null){
  Hostel.find({}, function(err,questions){
      res.render('hostel-one', {
        questionsList: questions

      })
  })
} else {
  res.redirect("/login");
 }
});

app.get("/general-one", function(req, res){
  if(sessionStorage.getItem('name')!=null){
  General.find({}, function(err,questions){
      res.render('general-one', {
        questionsList: questions

      })
  })
} else {
  res.redirect("/login");
 }
});

app.get("/faq-one", function(req, res){
  if(sessionStorage.getItem('name')!=null){
  Faq.find({}, function(err,questions){
      res.render('faq-one', {
        questionsList: questions

      })
  })
} else {
  res.redirect("/login");
 }
});

app.post("/submit",function(req,res){
    const submittedQuestion = req.body.question;
    const submittedAnswer = req.body.answer;
    const newuser = new User({
      question: req.body.question,
      answer:req.body.answer
    });
    newuser.save();
      res.redirect("home");

});

app.post("/club-submit",function(req,res){
    const submittedQuestion = req.body.question;
    const submittedAnswer = req.body.answer;
    const newclub = new Club({
      question: req.body.question,
      answer:req.body.answer
    });
    newclub.save();
      res.redirect("club-one");
});

app.post("/faq-submit",function(req,res){
    const submittedQuestion = req.body.question;
    const submittedAnswer = req.body.answer;
    const newfaq = new Faq({
      question: req.body.question,
      answer:req.body.answer
    });
    newfaq.save();
      res.redirect("faq-one");
});

app.post("/hostel-submit",function(req,res){
    const submittedQuestion = req.body.question;
    const submittedAnswer = req.body.answer;
    const newhostel = new Hostel({
      question: req.body.question,
      answer:req.body.answer
    });
    newhostel.save();
      res.redirect("hostel-one");
});

app.post("/general-submit",function(req,res){
    const submittedQuestion = req.body.question;
    const submittedAnswer = req.body.answer;
    const newgeneral = new General({
      question: req.body.question,
      answer:req.body.answer
    });
    newgeneral.save();
      res.redirect("general-one");
});

app.get("/junior",function(req,res){
  res.render("junior");
});

 app.get("/academics",function(req,res){
   User.find({}, function(err,questions){
       res.render('academics', {
         questionsList: questions
       })
   })
 });

 app.get("/club",function(req,res){
   Club.find({}, function(err,questions){
       res.render('club', {
         questionsList: questions
       })
   })
 });

 app.get("/hostel",function(req,res){
   Hostel.find({}, function(err,questions){
       res.render('hostel', {
         questionsList: questions
       })
   })
 });

 app.get("/general",function(req,res){
   General.find({}, function(err,questions){
       res.render('general', {
         questionsList: questions
       })
   })
 });

app.post("/junior",function(req,res){
  // const submittedTitle = req.body.title;
  const submittedQuestion = req.body.question;
  const newuser = new Junior({
    title: req.body.title,
    question: req.body.question
  });
  newuser.save();
   res.render("admin");
});

app.get("/admin", function(req, res){
    res.render("admin");
});

 app.get("/login",function(req,res){
    res.render("register");
 });

app.get("/logout",function(req,res){
  sessionStorage.clear();
   res.redirect("login");
});


app.post("/login",function(req,res){
   const username = req.body.username;
   const password = req.body.password;

   Senior.findOne({email: username},function(err,foundUser){
     if(err){
       console.log(err);
     } else {
       if(foundUser){
         if(foundUser.password === password){
           sessionStorage.setItem('name',foundUser.id)
           res.render("ans");
         }
         else {
           res.send("wrong password");
         }
       }
     }
   });

});


 app.get("/main",function(req,res){
     Junior.find({}, function(err,questions){
         res.render('main', {
           questionsList: questions
         })
     });
 })

app.post("/deletejnr",function(req,res){
  const check = req.body.checkbox;
  if(check){
  const checkedJuniorId = req.body.button;

  Junior.findByIdAndRemove(checkedJuniorId,function(err){
    if(!err){
      res.redirect("/main");
    }
  });
   } else {
     console.log("not success");
   }
});

app.post("/deletehostel",function(req,res){
  const check = req.body.checkbox;
  if(check){
  const checkedHostelId = req.body.button;

  Hostel.findByIdAndRemove(checkedHostelId,function(err){
    if(!err){
      res.redirect("hostel-one");
    }
  });
   } else {
     console.log("not success");
   }
});

app.post("/deletegeneral",function(req,res){
  const check = req.body.checkbox;
  if(check){
  const checkedGeneralId = req.body.button;

  General.findByIdAndRemove(checkedGeneralId,function(err){
    if(!err){
      res.redirect("general-one");
    }
  });
   } else {
     console.log("not success");
   }
});

app.post("/deleteclub",function(req,res){
  const check = req.body.checkbox;
  if(check){
  const checkedClubId = req.body.button;

  Club.findByIdAndRemove(checkedClubId,function(err){
    if(!err){
      res.redirect("club-one");
    }
  });
   } else {
     console.log("not success");
   }
});

app.post("/deletesnr",function(req,res){
  const check = req.body.checkbox;
    if(check){
    const checkedUserId = req.body.button;

    User.findByIdAndRemove(checkedUserId,function(err){
      if(!err){
        res.redirect("/home");
      }
    });
  } else {
    console.log("not success");
  }
});

app.post("/deletefaq",function(req,res){
  const check = req.body.checkbox;
    if(check){
    const checkedFaqId = req.body.button;

    Faq.findByIdAndRemove(checkedFaqId,function(err){
      if(!err){
        res.redirect("faq-one");
      }
    });
  } else {
    console.log("not success");
  }
});

app.listen(3000,function(){
  console.log("Server started on port 3000.");
});
