/*
 * @Date: 2020-04-02 00:37:14
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 17:49:52
 */
import { AnyAction, Dispatch } from 'redux';
import { getVideoInfo, getVideoRelatedList } from '@api/index';
import { setCurrentRelatedVideoList, setCurrentVideoInfo } from '../actions';
import Video from '@model/video';

export function getVideoPageData(aid: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    const promises = [getVideoInfo({ aid }), getVideoRelatedList({ aid })];
    let ret1, ret2;

    try {
      [ret1, ret2] = await Promise.all(promises);
    } catch (error) {}

    dispatch(setCurrentVideoInfo(ret1 as Video));
    dispatch(setCurrentRelatedVideoList(ret2 as Video[]));
  };
}
