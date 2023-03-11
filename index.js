import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import FileUpload from "express-fileupload";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import routeUser from "./routes/routeUser.js";
import routeMenu from "./routes/routeMenu.js";
import routeAuth from "./routes/routeAuth.js";
import routeAccess from "./routes/routeAccess.js";
import routeDestination from "./routes/routeDestination.js";
import routeArticle from "./routes/routeArticle.js";
import routePartner from "./routes/routePartner.js";
import routeGallery from "./routes/routeGallery.js";
import routeComponent from "./routes/routeComponent.js";
import routeBeranda from "./routes/frontend/routeBeranda.js";
import routeProfil from "./routes/frontend/routeProfil.js";
import routeDetailProfil from "./routes/frontend/routeDetailProfil.js";
import routeNavbar from "./routes/frontend/Navbar.js";
import routeFooter from "./routes/frontend/footer.js";
import routeTentang from "./routes/frontend/routeTentang.js";
import routeDetailArtikel from "./routes/frontend/routeDetailArtikel.js";
import routeMitra from "./routes/frontend/routeMitra.js";
import routeArtikel from "./routes/frontend/routeArtikel.js";
import routeMap from "./routes/frontend/routeMap.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
   db: db
});

// app.use(session({
//    secret: process.env.SESS_SECRET,
//    resave: false,
//    saveUninitialized: true,
//    store: store,
//    cookie: {
//       secure: 'auto'
//    }
// }));

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
// app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(routeAccess);
app.use(routeArticle);
app.use(routeDestination);
app.use(routeGallery);
app.use(routePartner);
app.use(routeUser);
app.use(routeAuth);
app.use(routeComponent);
app.use('/menu', routeMenu);

app.use(routeBeranda);
app.use(routeProfil);
app.use(routeDetailProfil);
app.use(routeNavbar);
app.use(routeFooter);
app.use(routeTentang);
app.use(routeDetailArtikel);
app.use(routeMitra);
app.use(routeArtikel);
app.use(routeMap);


app.listen(5000, ()=> console.log('Server running at port 5000'));