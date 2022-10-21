function onDocumentLoad() {
    if (document.readyState === 'complete') {
        document.body.append('async');
        document.removeEventListener('readystatechange', onDocumentLoad);
    }
}

if (document.readyState !== 'complete') {
    document.addEventListener('readystatechange', onDocumentLoad);
} else {
    onDocumentLoad();
}
