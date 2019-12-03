import { Header3 } from './Components';
// import ActivityStatus from './ActivityStatus';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';

interface Props {}

interface SpotifyActivity {
  item: {
    name: string;
    preview_url: string;
    album: {
      images: {
        0: { height: number; url: string };
        1: { height: number; url: string };
        2: { height: number; url: string };
      };
    };
    artists: [
      {
        name: string;
      }
    ];
  };
}

interface SpotifyResponse extends AxiosResponse {
  data: SpotifyActivity;
}

const Container = styled.div`
  margin-bottom: 2rem;
`;
const CustomHeader = styled(Header3)`
  display: flex;
  height: 1.75rem;
`;
const Item = styled.div`
  font-size: 0.8rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
`;
const SoundIcon = styled.i`
  color: ${props => props.theme.green};
  margin-right: 0.25rem;
`;
const Status = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  font-weight: 400;
`;
const Body = styled.div`
  display: flex;
  margin-top: 1rem;
  font-weight: 500;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
`;
const Music = styled.div`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: ${props => props.theme.white};
`;
const Song = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;
const Artist = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
`;

export const Spotify: React.FC<Props> = () => {
  const [spotifyActivity, setSpotifyActivity] = useState<SpotifyActivity>();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_ROOT_URL}/.netlify/functions/get-spotify-activity`
      )
      .then((res: SpotifyResponse) => {
        setSpotifyActivity(res.data);
        console.log(res.data);
      });
  }, []);

  return spotifyActivity ? (
    <Container>
      <CustomHeader>
        <i
          className="fab fa-spotify"
          style={{ color: '#1DB954', marginRight: '1rem' }}
        ></i>{' '}
        <div style={{ marginRight: '0.5rem' }}>Spotify</div>
        {spotifyActivity && (
          <Item>
            <SoundIcon className="fas fa-volume-up"></SoundIcon>
            <Status>Listening Now</Status>
          </Item>
        )}
      </CustomHeader>
      <Body>
        <img
          alt="album-art"
          height="30rem"
          width="auto"
          src={spotifyActivity.item.album.images[2].url}
        />
        <Music>
          <Song>{spotifyActivity.item.name}</Song>
          <Artist>{spotifyActivity.item.artists[0].name}</Artist>
        </Music>
      </Body>
    </Container>
  ) : null;
};

export default Spotify;
