import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const App = (props) => {
  const [videos, setvideos] = useState([])
  const [selectedVideo, setselectedVideo] = useState(null)

  useEffect(() => {
    onTermSubmit('buildings');
  }, []);

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    })
    setvideos(response.data.items);
    setselectedVideo(response.data.items[0]);
  }

  const onVideoSelect = video => {
    setselectedVideo(video);
  };
  return (
    <div className="ui container">
      <SearchBar onFormSubmit={onTermSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList
              onVideoSelect={(video) => onVideoSelect(video)}
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
