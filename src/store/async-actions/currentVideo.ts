/*
 * @Date: 2020-04-02 00:37:14
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 17:01:01
 */
import { AnyAction, Dispatch } from 'redux';
import { getVideoInfo } from '@api/index';
import { setCurrentVideoInfo } from '../actions';
import Video from '@model/video';

export function getVideogPageData(aid: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    const promises = [getVideoInfo({ aid })];
    let ret1;

    try {
      [ret1] = await Promise.all(promises);
    } catch (error) {}

    dispatch(setCurrentVideoInfo(ret1 as Video));
  };
}
