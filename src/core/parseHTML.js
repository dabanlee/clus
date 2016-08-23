//
// parseHTML
//

export default function parseHTML(DOMString) {
    let htmlDoc = document.implementation.createHTMLDocument();
    htmlDoc.body.innerHTML = DOMString;
    return htmlDoc.body.children;
}
