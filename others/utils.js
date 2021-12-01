// Get available fields from Advanced PDF Templates.
JSON.stringify(Array.from(document.getElementsByClassName('newelement-item')).map(element => element.title).filter(title => title.indexOf('.cust') === -1))
