import { createRoot, hydrateRoot } from "react-dom/client";
import router from "./app/http/routes";

// Find the root element
const root = document.getElementById('root');
const route = (window as any).__ROUTE__ || '';
const controller = router.getRoute(route);

if (root?.hasChildNodes()) {
    // Hydrate existing SSR HTML
    hydrateRoot(root, controller());
} else {
    // Render from scratch (optional)
    const rootContainer = createRoot(root!);
    rootContainer.render(controller());
}