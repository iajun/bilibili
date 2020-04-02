/*
 * @Date: 2020-04-01 20:50:52
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-01 23:20:08
 */

class Error {
  static SERVER_FETCH_DATA_ERROR = '500101:获取数据出错，请稍后再试';
  static SERVER_EXTRACT_STATE_ERROR = '500102: 获取数据状态出错，请稍后再试';
  static FETCH_VIDEO_LIST_ERROR = '500201: 获取视频列表失败，请稍后再试';
  static REQUEST_DATA_ERROR = '401101:您的请求数据有误，请检查后再试';
}

module.exports = Error;
