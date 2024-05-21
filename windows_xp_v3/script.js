document.addEventListener('DOMContentLoaded', () => {
    class Window {
      constructor(windowElement, mdiContainer) {
        this.windowElement = windowElement;
        this.mdiContainer = mdiContainer;
        this.titleBar = this.windowElement.querySelector('.title-bar');
        this.content = this.windowElement.querySelector('.content');
        this.minimizeButton = this.windowElement.querySelector('.minimize');
        this.maximizeButton = this.windowElement.querySelector('.maximize');
        this.closeButton = this.windowElement.querySelector('.close');
        this.footerHeight = document.querySelector('.footer-bar').offsetHeight;
        this.headerHeight = document.querySelector('.menu-bar').offsetHeight;
  
        this.initEvents();
      }
  
      initEvents() {
        this.titleBar.onmousedown = (e) => this.dragMouseDown(e);
        this.closeButton.onclick = () => this.closeWindow();
        this.minimizeButton.onclick = () => this.minimizeWindow();
        this.maximizeButton.onclick = () => this.maximizeWindow();
      }
  
      dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = () => this.closeDragElement();
        document.onmousemove = (e) => this.elementDrag(e);
      }
  
      elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
  
        const newTop = this.windowElement.offsetTop - this.pos2;
        const newLeft = this.windowElement.offsetLeft - this.pos1;
        const maxTop = this.mdiContainer.clientHeight - this.windowElement.clientHeight;
        const maxLeft = this.mdiContainer.clientWidth - this.windowElement.clientWidth;
  
        if (newTop >= this.headerHeight && newTop <= maxTop - this.footerHeight) {
          this.windowElement.style.top = newTop + 'px';
        } else if (newTop < this.headerHeight) {
          this.windowElement.style.top = this.headerHeight + 'px';
        } else if (newTop > maxTop - this.footerHeight) {
          this.windowElement.style.top = (maxTop - this.footerHeight) + 'px';
        }
  
        if (newLeft >= 0 && newLeft <= maxLeft) {
          this.windowElement.style.left = newLeft + 'px';
        } else if (newLeft < 0) {
          this.windowElement.style.left = '0px';
        } else if (newLeft > maxLeft) {
          this.windowElement.style.left = maxLeft + 'px';
        }
      }
  
      closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
  
      closeWindow() {
        this.windowElement.style.display = 'none';
      }
  
      minimizeWindow() {
        this.windowElement.style.width = '200px';
        this.windowElement.style.height = '30px';
        this.windowElement.style.bottom = '0';
        this.windowElement.style.left = '0';
        this.content.style.display = 'none';
      }
  
      maximizeWindow() {
        if (this.windowElement.style.width === '100%' && this.windowElement.style.height === '100%') {
          this.windowElement.style.width = '400px';
          this.windowElement.style.height = '';
          this.content.style.height = '';
          this.content.style.padding = '10px';
        } else {
          this.windowElement.style.width = '100%';
          this.windowElement.style.height = '100%';
          this.content.style.height = 'calc(100% - 32px)';
          this.content.style.padding = '20px';
        }
        this.content.style.display = 'block';
        this.windowElement.style.bottom = '';
        this.windowElement.style.left = '';
      }
    }
  
    const mdiContainer = document.getElementById('mdiContainer');
    const myWindow = document.getElementById('myWindow');
    new Window(myWindow, mdiContainer);
  });
  