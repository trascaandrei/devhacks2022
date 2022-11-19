import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

export const routeNames = {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    requests: '/requests',
    activities: '/activities',
}

const routes: Array<any> = [
    {
        path: routeNames.home,
        component: Home,
        authenticatedRoute: false,
    },
    {
        path: routeNames.dashboard,
        component: Dashboard,
        authenticatedRoute: true,
    },
];

const mappedRoutes = routes.map((route) => {
    const requiresAuth = Boolean(route.authenticatedRoute);

    return {
        path: route.path,
        component: route.component,
        authenticatedRoute: requiresAuth,
    };
});

export default mappedRoutes;
