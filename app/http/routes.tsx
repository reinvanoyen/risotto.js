import Router from "../../src/Router";
import pages from "./controllers/pages";
import projects from "./controllers/projects";
import events from "./controllers/events";
import locations from "./controllers/locations";

const router = new Router();

router.get('/', pages.home);
router.get('/about', pages.about);

router.get('/projects', projects.index);
router.get('/projects/:id', projects.view);

router.get('/events', events.index);
router.get('/events/:id', events.view);

router.get('/locations', locations.index);
router.get('/locations/:id', locations.view);

export default router;