class YouTubeVideo extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        this.getYTLayout()
            .then(response => {
                shadow.appendChild(this.parseHTML(response));

                const idYT = this.getAttribute('data-video-id');
                const widthYT = this.getAttribute('data-width');
                const heightYT = this.getAttribute('data-height');
                const src = `https://www.youtube.com/embed/${idYT}`;

                this.createAttributes(
                    ['width', 'height', 'src', 'title', 'allow'],
                    [widthYT, heightYT, src, `YouTube video player`,
                        `accelerometer; autoplay; clipboard-write; encrypted-media;
                         gyroscope; picture-in-picture; fullscreen`
                    ]); // The attribute 'allow' with value 'fullscreen' only works in Firefox (?)
                        // I've used all methods from different sources that I've found
            })

        this.getYTStyle()
            .then(response => {
                const positionYT = `.yt-elem {position: absolute; top: 50%;
                                    left: 50%; transform: translate(-50%, -50%)};`;
                const styleYT = document.createElement('style');
                styleYT.textContent = positionYT ? response + positionYT : response;
                shadow.append(styleYT);
            })
    }

    createAttributes(namesAttr, valuesAttr) {
        const iframeElem = this.shadowRoot.querySelector('.yt-elem');
        console.log(iframeElem)

        if (Array.isArray(namesAttr)) {
            namesAttr.forEach((name, index) => {
                iframeElem.setAttribute(name, `${valuesAttr[index]}`);
            });
        } else {
            iframeElem.setAttribute(name, `${valuesAttr}`)
        }
        return iframeElem;
    }

    async getYTLayout() {
        let layoutYT = await fetch('components/yt-video.html');
        return layoutYT.text();
    }

    async getYTStyle() {
        let cssYT = await fetch('components/style.css');
        return cssYT.text();
    }

    parseHTML(str) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');
        return doc.body.firstChild;
    }
}

customElements.define('yt-video', YouTubeVideo);