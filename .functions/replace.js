const DomWordReplacer = require('@mooeypoo/dom-word-replacer').default;
const dictDefinition = require('../src/data/binarygender.json');
const parse5 = require('parse5');
const xmlserializer = require('xmlserializer');
const xmldom = require('xmldom');
const fetch = require('node-fetch');

/* Operational functions */
const getDocumentFromHtml = htmlString => {
  const document = parse5.parse(htmlString);
  const xhtml = xmlserializer.serializeToString(document);
  return new xmldom.DOMParser().parseFromString(xhtml);
};

const preprocess = (url, htmlString) => {

  return xmlserializer.serializeToString(doc);
}

// Source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const validateUrl = str => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
};

const getUrlContents = async url => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return {
      status: 'success',
      content: text
    };
  } catch (error) {
    return {
      status: 'error',
      content: error
    };
  }
};

exports.handler = async event => {
  const pathparams = event.path.replace('.netlify/functions/replace', '');
  let [url, type] = pathparams.split('/').filter(entry => !!entry);
  type = type || 'desktop';
  url = decodeURIComponent(url);

  // Validate url
  if (!validateUrl(url)) {
    // Return failure
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: true,
        message: 'Given URL is malformed: ' + url
      }, null, 2)
    };
  }

  // Fetch URL
  const data = await getUrlContents(url);
  if (data.status === 'error') {
    // Return failure
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: true,
        message: data.content
      }, null, 2)
    };
  }

  // Perform replacement
  const replacer = new DomWordReplacer(dictDefinition, {
    termClass: 'neutralitywtf-term',
    ambiguousClass: 'neutralitywtf-term-ambiguous'
  });

  // Convert one-way
  let result = replacer.replace(data.content, 'men', 'women');
  // now the other side
  result = replacer.replace(result, 'women', 'men');

  // Inject CSS
  const doc = getDocumentFromHtml(result);
  const css = `
    .neutralitywtf-term {
      background-color: yellow;
      border-bottom: 1px dashed #666666;
    }
  `;
  const cssNode = doc.createElement('style');
  cssNode.appendChild(doc.createTextNode(css));
  doc.getElementsByTagName('head')[0].appendChild(cssNode);
  result = xmlserializer.serializeToString(doc);

  // Fix base url
  const urlObj = new URL(url);
  const baseNode = doc.createElement('base');
  baseNode.setAttribute('href', urlObj.origin);
  baseNode.setAttribute('target', '_blank');
  const existingBaseElement = doc.getElementsByTagName('base');
  if (existingBaseElement.length) {
    doc.parentElement.insertBefore(baseNode, existingBaseElement);
    doc.parentElement.removeChild(existingBaseElement);
  } else {
    doc.getElementsByTagName('head')[0].appendChild(baseNode);
  }
  result = xmlserializer.serializeToString(doc);

  return {
    statusCode: 200,
    body: result
  }
}