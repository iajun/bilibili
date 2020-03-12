import loadable from '@loadable/component';
import { RouteProps as _RouteProps } from 'react-router';
import { Store } from 'redux';

interface RouteProps extends _RouteProps {
  asyncData?: (store: Store) => void;
}

const routes: Array<RouteProps> = [
  {
    path: '/',
    component: loadable(() => import('../pages/home')),
    exact: true,
  },
  {
    path: '/test',
    component: loadable(() => import('../pages/test')),
  },
];

export default routes;
