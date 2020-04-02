/*
 * @Date: 2020-04-02 01:09:52
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 10:21:32
 */
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

  private constructor(
    aid: string,
    bid: string,
    cid: string,
    author: string,
    coins: number,
    duration: string,
    pic: string,
    play: number,
    title: string,
    review: number,
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
    );
  }
}

export default Video;
