const MarkerHtml = (url: string) => `
    <div id="marker-wrap">
        <img src="/assets/marker-bg.svg">
        <img id="img-circle" src=${url}>
    </div>
`;

export default MarkerHtml;
