function addLoadEvent(func) {
	var oldOnLoad = window.onLoad;
	if (typeof window.onLoad != 'function') {
		window.onLoad = func;
	} else {
		window.onLoad = function(){
			oldOnLoad();
			func();
		};
	}
}

// Get next element node including current node
function getNextElement(node) {
	if (node.nodeType == 1) {
		return node;
	}
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}

// Add a class to the element, if the element has aready class then append the new class
function addClass(element, class) {
	if (!element.className) {
		element.className = class;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += class;
		element.className = newClassName;
	}
}

function displayAbbreviations() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
		return false;
	}

	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length < 1) {
		return false;
	}
	var defs = new Array();
	for (var i = 0; i < abbreviations.length; i++) {
		var currentAbbr = abbreviations[i];
		if (currentAbbr.childNodes.length < 1) {
			continue;
		}
		var title = currentAbbr.getAttribute("title");
		var key = currentAbbr.lastChild.nodeValue;
		defs[key] = title;
	}

	if (defs.length < 1) {
		return false;
	}

	var dlist = document.createElement("dl");
	for (var key in defs) {
		var description = defs[key];

		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);

		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(description);
		ddesc.appendChild(ddesc_text);

		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}

	var header = document.createElement("h2");
	var header_text = document.createTextNode("abbreviations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}

