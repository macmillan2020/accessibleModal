//hold previously focused element
var focusedElementBeforeModal;

var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');

var modalToggle = document.querySelector('.modal-toggle');
modalToggle.addEventListener('click', openModal);

function openModal() {
    //save current focus
    focusedElementBeforeModal = document.activeElement;

    //listen for and trap the keyboard
    modal.addEventListener('keydown', trapTabKey);

    //listen for indicators to close the modal
    modalOverlay.addEventListener('click', closeModal);

    var confirmationBtn = modal.querySelector('#confirmed');
    confirmationBtn.addEventListener('click', closeModal);

    //find all focusable elements
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';
    var focusableElements = modal.querySelectorAll(focusableElementsString);
    //convert nodeList to array 
    focusableElements = Array.prototype.slice.call(focusableElements);

    var firstTabStop = focusableElements[0];
    var lastTabStop = focusableElements[focusableElements.length - 1];

    //show modal & overlay 
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';

    //focus first child
    firstTabStop.focus();

    function trapTabKey(e) {
        // check for TAB key press
        if (e.keyCode === 9) {

            //SHIFT + TAB KEYS
            if (e.shiftKey) {
                if (document.activeElement === firstTabStop) {
                    e.preventDefault();
                    lastTabStop.focus();
                }
                //TAB KEY
            } else {
                if (document.activeElement === lastTabStop) {
                    e.preventDefault();
                    firstTabStop.focus();
                }
            }
            //ESC KEY
            if (e.keyCode === 27) {
                closeModal();
            }
        }
    }

    function closeModal() {
        //hide modal and overlay
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';

        //set focus back to element that had it before modal was open
        focusedElementBeforeModal.focus();
    }

}

document.addEventListener("DOMContentLoaded", function() {
    openModal();
})
