import React, { useEffect, useState } from 'react';
import axios from 'axios';
require('dotenv').config();

interface Props {}

interface TweetType {
  text: string;
}

export const Tweets: React.FC<Props> = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-tweets`)
      .then(res => {
        return setTweets(res.data);
      })
      .catch(console.log);
  }, []);

  return (
    <ul>
      {tweets.map((tweet: TweetType, id: number) => {
        return <ol key={id}>{tweet.text}</ol>;
      })}
    </ul>
  );
};

export default Tweets;
