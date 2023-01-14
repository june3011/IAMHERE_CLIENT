const MarkerHtml = (hoverState: boolean, url: string, content: string) => `   
    <div id="marker-wrap">
    <div>
      <img src="/assets/marker-bg.svg">
        <img id="img-circle" src=${url}>
    </div>
    
        <div id="tooltip">
            <img id="tooltip-profile-img" src=${url}>
            <div id="tooltip-content">${content}</div>
            <img id="messege-start" src="/assets/chat_btn.svg">
        </div>
    </div>
`;

export default MarkerHtml;
