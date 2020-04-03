/*
 * @Date: 2020-04-02 00:37:14
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 22:57:53
 */
import { AnyAction, Dispatch } from 'redux';
import { getVideoInfo, getVideoRelatedList } from '@api/index';
import { setCurrentRelatedVideoList, setCurrentVideoInfo } from '../actions';

export function getVideoPageData(aid: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    const [currentVideoInfo, currentRelatedVideoList] = await Promise.all([
      getVideoInfo({ aid }),
      getVideoRelatedList({ aid }),
    ]);

    dispatch(setCurrentVideoInfo(currentVideoInfo));
    dispatch(setCurrentRelatedVideoList(currentRelatedVideoList));
  };
}
