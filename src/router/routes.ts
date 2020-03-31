/*
 * @Date: 2020-03-30 00:42:49
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-30 15:22:34
 */
import { Store } from 'redux';
import { RouteProps as _RouteProps } from 'react-router';
import loadable from '@loadable/component';

interface RouteProps extends _RouteProps {
  asyncData?: (store: Store) => void;
}

const routes: Array<RouteProps> = [
  {
    path: '/',
    component: loadable(() => import('@pages/home')),
    exact: true,
  },
  {
    path: '/channel/:cid',
    component: loadable(() => import('@pages/channel')),
  },
  {
    path: '/h5',
    component: loadable(() => import('@pages/h5')),
  },
  {
    path: '/login',
    component: loadable(() => import('@pages/login')),
  },
  {
    path: '/ranking',
    component: loadable(() => import('@pages/ranking')),
  },
  {
    path: '/space',
    component: loadable(() => import('@pages/space')),
  },
  {
    path: '/video/:vid',
    component: loadable(() => import('@pages/video')),
  },
];

export default routes;
