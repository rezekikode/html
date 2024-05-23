function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        // closeModal();
    }
}

const closeButton = document.querySelector('.modal-close');

closeButton.addEventListener('click', closeModal);