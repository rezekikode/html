let windowCount = 0;

function openWindow() {
    const mdiContainer = document.querySelector('.mdi-container');
    const newWindow = document.createElement('div');
    newWindow.className = 'mdi-window';
    newWindow.style.top = `${windowCount * 30}px`;
    newWindow.style.left = `${windowCount * 30}px`;
    newWindow.innerHTML = `
        <div class="mdi-window-header">
            Window ${++windowCount}
            <span style="float:right;cursor:pointer;" onclick="closeWindow(this)">X</span>
        </div>
        <div class="mdi-window-content">
            Content of window ${windowCount}
        </div>
    `;
    mdiContainer.appendChild(newWindow);
    dragElement(newWindow);
}

function closeWindow(closeButton) {
    const windowElement = closeButton.parentElement.parentElement;
    windowElement.remove();
}

function dragElement(el) {
    const header = el.querySelector('.mdi-window-header');
    header.onmousedown = function(event) {
        event.preventDefault();
        let shiftX = event.clientX - el.getBoundingClientRect().left;
        let shiftY = event.clientY - el.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            el.style.left = pageX - shiftX + 'px';
            el.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        header.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            header.onmouseup = null;
        };
    };

    header.ondragstart = function() {
        return false;
    };
}
