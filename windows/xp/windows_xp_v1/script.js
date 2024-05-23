document.addEventListener('DOMContentLoaded', (event) => {
	dragElement(document.getElementById("myWindow"));
  
	function dragElement(elmnt) {
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  if (document.getElementById(elmnt.id + "TitleBar")) {
		document.getElementById(elmnt.id + "TitleBar").onmousedown = dragMouseDown;
	  } else {
		elmnt.onmousedown = dragMouseDown;
	  }
  
	  function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	  }
  
	  function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	  }
  
	  function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	  }
	}
  
	document.getElementById("closeButton").addEventListener("click", function() {
	  document.getElementById("myWindow").style.display = "none";
	});
  
	document.getElementById("minimizeButton").addEventListener("click", function() {
	  var window = document.getElementById("myWindow");
	  var content = document.getElementById("content");
	  window.style.width = "200px";
	  window.style.height = "30px";
	  window.style.bottom = "0";
	  window.style.left = "0";
	  content.style.display = "none";
	});
  
	document.getElementById("maximizeButton").addEventListener("click", function() {
	  var window = document.getElementById("myWindow");
	  var content = document.getElementById("content");
	  if (window.style.width === "100%" && window.style.height === "100%") {
		window.style.width = "400px";
		window.style.height = "";
		content.style.height = "";
		content.style.padding = "10px";
	  } else {
		window.style.width = "100%";
		window.style.height = "100%";
		content.style.height = "calc(100% - 32px)";
		content.style.padding = "20px";
	  }
	  content.style.display = "block";
	  window.style.bottom = "";
	  window.style.left = "";
	});
  });
  