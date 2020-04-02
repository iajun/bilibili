/*
 * @Date: 2020-04-01 20:50:52
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 15:40:42
 */

class Error {
  static SERVER_FETCH_DATA_ERROR = '500101:获取数据出错，请稍后再试';
  static SERVER_EXTRACT_STATE_ERROR = '500102: 获取数据状态出错，请稍后再试';
  static FETCH_VIDEO_LIST_ERROR = '500201: 获取视频列表失败，请稍后再试';
  static FETCH_VIDEO_INFO_ERROR = '500202: 获取视频详情失败，请稍后再试';

  static REQUEST_DATA_ERROR = '401101:您的请求数据有误，请检查后再试';

  static FVIDEO_INFO_AID_ERROR = '401201: 请输入正确的视频ID';
}

module.exports = Error;
