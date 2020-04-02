/*
 * @Date: 2020-03-30 00:42:49
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 16:28:32
 */
import { Store } from 'redux';
import { RouteProps as _RouteProps } from 'react-router';
import { getChannelPageData } from '@store/async-actions/channel';
import { getIndexPageData } from '@store/async-actions/home';
import { getVideogPageData } from '@store/async-actions/currentVideo';
import loadable from '@loadable/component';

interface RouteProps extends _RouteProps {
  asyncData?: (store: Store, params?: any) => void;
}

const routes: Array<RouteProps> = [
  {
    path: '/',
    component: loadable(() => import('@pages/home')),
    asyncData: (store) => store.dispatch(getIndexPageData() as any),
    exact: true,
  },
  {
    path: '/channel/:cid',
    component: loadable(() => import('@pages/channel')),
    asyncData: (store) => store.dispatch(getChannelPageData() as any),
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
    path: '/video/av:aid',
    component: loadable(() => import('@pages/video')),
    asyncData: (store, params: any) =>
      store.dispatch(getVideogPageData(params.aid) as any),
  },
];

export default routes;
