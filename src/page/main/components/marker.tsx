const MarkerHtml = (
  hoverState: boolean,
  url: string,
  memo: string,
  mbti: string,
  name: string
) => `   
    <div id="marker-wrap">
    <div>
      <img src="/assets/marker-bg.svg">
        <img id="img-circle" src=${url}>
    </div>
    
        <div id="tooltip">
            <img id="tooltip-profile-img" src=${url}>
            <div id="tooltip-content">${name}</div>
            <div id="tooltip-content">${mbti}</div>
            <div id="tooltip-content">${memo}</div>
            <img id="messege-start" src="/assets/chat_btn.svg">
        </div>
    </div>
`;

export default MarkerHtml;
