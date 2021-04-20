const DomWordReplacer = require('@mooeypoo/dom-word-replacer').default;
const dictDefinition = require('../src/data/binarygender.json');
const fetch = require('node-fetch');

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

const normalizeUrl = str => {
  // Add https if not given
  const prefix = 'https://'
  return str.substr(0, prefix.length) === prefix ?
    str :
    prefix + str
}

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
  const pathparams = event.path.replace('api/replace', '');
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

  url = normalizeUrl(url);

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

  const urlObj = new URL(url);

  // Perform replacement
  const replacer = new DomWordReplacer(dictDefinition, {
    termClass: 'neutralitywtf-term',
    ambiguousClass: 'neutralitywtf-term-ambiguous',
    css: `
      .neutralitywtf-term {
        background-color: rgba(139, 195, 74, 0.5);
        padding: 0 0.2em;;
      }
      .neutralitywtf-term.neutralitywtf-term-ambiguous {
        background-color: rgba(255, 193, 7, 0.5);
      }
    `
  });

  // Convert one-way
  let result = replacer.replace(data.content, 'men', 'women', urlObj.origin);
  // now the other side
  result = replacer.replace(result, 'women', 'men');

  return {
    statusCode: 200,
    body: result
  }
}