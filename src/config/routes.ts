import IRoute from '../interfaces/route';
import Home from '../pages/Home/Home';
import Repos from '../pages/Repos/Repos';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        exact: true
    },
    {
        path: '/:busca/repos',
        name: 'Repos',
        component: Repos,
        exact: true
    },
]

export default routes;