export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Partition = {
  __typename?: 'Partition';
  tid: Scalars['ID'];
  typename: Scalars['String'];
  subPartition: Array<Partition>;
};

export type Query = {
  __typename?: 'Query';
  partitionList: Array<Partition>;
  rankingVideos: Array<Video>;
  videoTags: Array<Tag>;
};

export type QueryPartitionListArgs = {
  tid?: Maybe<Scalars['ID']>;
};

export type QueryRankingVideosArgs = {
  rid?: Maybe<Scalars['ID']>;
  day?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type QueryVideoTagsArgs = {
  aid: Scalars['ID'];
};

export type Tag = {
  __typename?: 'Tag';
  tid: Scalars['ID'];
  name: Scalars['String'];
  cover?: Maybe<Scalars['String']>;
  ctime?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['Int']>;
};

export type Video = {
  __typename?: 'Video';
  vid: Scalars['ID'];
  author: Scalars['String'];
  duration: Scalars['String'];
  pic: Scalars['String'];
  play: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  review: Scalars['Int'];
};
