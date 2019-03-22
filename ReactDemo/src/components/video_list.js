import React from 'react';
import VideoListItem from './video_list_item';

// Props will arrive as an argument to the function
// Important to notice that when using a class base component instead
// of a funciton base component, you will be able to access props anywhere
// by doing this.props. Be aware when refactoring a function component to
// a class component.
const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
      // If you dont add a key it re renders all components
      return (
        <VideoListItem
          key={video.etag}
          video={video}
          onVideoSelect={props.onVideoSelect} />
      );
    });
    return (
      <ul className="list-group">
        {videoItems}
      </ul>
    );
};

export default VideoList;
