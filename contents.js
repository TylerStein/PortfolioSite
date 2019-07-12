const contentLinkElements = document.querySelectorAll('.content-link');
const contentLinkAnchors = [];
let activeElementIndex = -1;

for (let i = 0; i < contentLinkElements.length; i++) {
    const element = contentLinkElements.item(i);
    const href = element.getAttribute('href');
    if (href) {
        const id = href.substring(1);
        const anchorElement = document.getElementById(id);
        if (anchorElement) {
            element.removeAttribute('href');
            element.addEventListener('mouseup', (ev) => {
                console.log('scrollTo', anchorElement.offsetTop);
                window.scrollTo(window.scrollX, anchorElement.offsetTop - 20);
            });
            contentLinkAnchors.push({
                listElement: element,
                contentElement: anchorElement
            })
        }
    }
}

function onScroll(ev) {
    const top = window.scrollY;
    for (let i = contentLinkAnchors.length - 1; i >= 0; i--) {
        const element = contentLinkAnchors[i].contentElement;
        if ((top >= element.offsetTop - 20) && (top < element.offsetTop + element.clientHeight)) {
            if (activeElementIndex > -1) {
                contentLinkAnchors[activeElementIndex].listElement.classList.remove('active');
            }

            activeElementIndex = i;
            contentLinkAnchors[i].listElement.classList.add('active');

            break;
        }
    }
}

document.addEventListener('scroll', (ev) => onScroll(ev));
onScroll(null);