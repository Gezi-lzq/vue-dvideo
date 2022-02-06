// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0;

// 1. Model the Video
// 2. Store the Video
// 3. Upload Video
// 4. List Video

contract DVideo {
  uint public videoCount = 0;
  string public name = "DVideo";
  //Create id=>struct mapping
  mapping(uint => Video) public videos;

  //Create Struct
  struct Video {
    uint id;
    string hash;
    string title;
    address author;
  }

  //Create Event
  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author
  );

 
  constructor() {
  }

  function uploadVideo(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0);
    // Make sure video title exists
    require(bytes(_title).length > 0);
    // Make sure uploader address exists
    require(msg.sender!=address(0));

    // Increment video id
    videoCount ++;
    // Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
  }
}
