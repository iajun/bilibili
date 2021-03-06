/*
 * @Date: 2020-04-02 01:09:52
 * @Author: Sharp
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-21 16:19:46
 */

interface Tag {
  name: string;
  id: string;
}
class Video {
  public aid: string;
  public bid: string;
  public cid: string;
  public author: string;
  public coins: number;
  public duration: string;
  public pic: string;
  public play: number;
  public title: string;
  public review: number;
  public danmu: number;
  public ctime: number;
  public desc: string;
  public src: string;
  public tags: Tag[];
  public pages: any[];

  private constructor(
    aid = '',
    bid = '',
    cid = '',
    author = '',
    coins = 0,
    duration = '',
    pic = '',
    play = 0,
    title = '',
    review = 0,
    danmu = 0,
    ctime = 0,
    desc = '',
    src = '',
    tags = [],
    pages = [],
  ) {
    this.aid = aid;
    this.bid = bid;
    this.cid = cid;
    this.author = author;
    this.coins = coins;
    this.duration = duration;
    this.pic = pic;
    this.play = play;
    this.title = title;
    this.review = review;
    this.danmu = danmu;
    this.ctime = ctime;
    this.desc = desc;
    this.src = src;
    this.tags = tags;
    this.pages = pages;
  }

  public static createVideoFromRankingVideos(data: any) {
    return new Video(
      data.aid,
      data.bvid,
      data.cid,
      data.author,
      data.coins,
      data.duration,
      data.pic,
      data.play,
      data.title,
      data.video_review,
      data.danmu,
    );
  }

  public static createVideoFromVideoInfo(data: any) {
    const info = data.videoInfo || {};

    return new Video(
      info.aid,
      info.bvid,
      info.cid,
      info.owner.name,
      info.stat.coin,
      info.duration,
      info.pic,
      info.stat.view,
      info.title,
      info.stat.reply,
      info.stat.danmaku,
      info.ctime * 1000,
      info.desc,
      info.initUrl,
      data.videoTags || [],
      info.pages || [],
    );
  }
}

export default Video;
