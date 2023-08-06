window.addEventListener('load', function() {
    const textareas = document.querySelectorAll('textarea[data-auto-resize]');

    const resize = function(element, ghost) {
        ghost.innerText = element.value + "\nx";
        
        let newHeight = ghost.clientHeight - 15;

        element.style.height = newHeight < 300 ? '300px' : `${newHeight}px`;
    };

    if (textareas) {
        textareas.forEach((element) => {
            let container = document.createElement('div');
            let ghost = document.createElement('div');
            let style = getComputedStyle(element);

            element.style.overflowY = 'hidden';

            container.style.height = 0;
            container.style.width = 0;
            container.style.overflow = 'hidden';

            ghost.style.width = style.width;
            ghost.style.padding = style.padding;
            ghost.style.lineHeight = style.lineHeight;
            ghost.style.border = style.border;
            ghost.style.font = style.font;

            container.appendChild(ghost);
            element.parentNode.appendChild(container);

            onEvent(element, 'input', function(e) {
                resize(e.target, ghost);
            });

            resize(element, ghost);
        });
    }
});

/**
 * Add event listener (uses event delegation)
 * 
 * @param {string|Node} selector 
 * @param {string} action 
 * @param {function} callback 
 * @param {boolean} [preventDefault=false] Set to true to automatically invoke event.preventDefault.
 */
const onEvent = (selector, action, callback, preventDefault = false, capture = false) => {
    capture = !capture ? ['blur', 'focus', 'change'].includes(action.toLowerCase()) : capture;

    // If we have a list if items, let's register the event on each of them
    if (Array.isArray(selector) || selector instanceof NodeList || selector instanceof HTMLCollection) {
        selector.forEach((element) => {
            onEvent(element, action, callback);
        });
        return;
    }

    document.addEventListener(action, e => {
        let isSame = false;
        if (typeof selector === 'string') {
            isSame = e.target && e.target.matches && e.target.matches(selector);
        }

        if (selector instanceof Node) {
            isSame = e.target && e.target === selector;
        }

        if (isSame) {
            if (preventDefault) {
                e.preventDefault();
            }

            callback(e);
        }
    }, capture);
};

const toast = new class {
    #toasts = null;

    constructor() {
        this.#toasts = document.querySelector('#toasts');
    }

    /**
     * Show an info toast
     * 
     * @param {string} message 
     * @param {string} title 
     * @param {int} timeout 
     */
    info(message, title = null, timeout = 5) {
        this.#createToast('info', message, title, timeout);
    }

    /**
     * Show a success toast
     * 
     * @param {string|array|object} message 
     * @param {string} title 
     * @param {int} timeout 
     */
    success(message, title = null, timeout = 5) {
        this.#createToast('success', message, title, timeout);
    }

    /**
     * Show an error toast
     * 
     * @param {string|array|object} message 
     * @param {string} title 
     * @param {int} timeout 
     */
    error(message, title = null, timeout = 5) {
        this.#createToast('error', message, title, timeout);
    }

    /**
     * 
     * @param {string} type 
     * @param {string|array|object} message 
     * @param {string} title 
     * @param {int} timeout 
     * @returns {void}
     */
    #createToast(type, message, title, timeout) {
        if (!message && !title) {
            return;
        }

        let toastEl = this.#createElement('div', {classes: ['toast', type]});
        
        if (title) {
            let titleEl = this.#createElement('div', {classes: 'title'});
            titleEl.innerText = title;
            toastEl.appendChild(titleEl);
        }

        if (message) {
            let msgEl = null;

            if (typeof message === 'string') {
                msgEl = this.#createElement('p');
                msgEl.innerText = message;
            }

            if (Array.isArray(message)) {
                msgEl = this.#createElement('ul');
                message.forEach((msg) => {
                    const li = this.#createElement('li');
                    li.innerText = msg;
                    msgEl.appendChild(li);
                });
            }

            if (typeof message === 'object') {
                msgEl = this.#createElement('ul');

                for (let prop in message) {
                    const li = this.#createElement('li');
                    li.innerText = `${prop}: ${message[prop]}`;
                    msgEl.appendChild(li);
                }
            }

            if (msgEl) {
                toastEl.appendChild(msgEl);
            }
        }

        this.#toasts.appendChild(toastEl);

        toastEl.addEventListener('click', (e) => toastEl.remove());

        if (timeout > 0) {
            setTimeout(() => toastEl.remove(), timeout * 1000);
        }
    }

    /**
     * 
     * @param {string} tag 
     * @param {object} options 
     * @returns HTMLElement
     */
    #createElement(tag, options = {}) {
        let el = document.createElement(tag);

        if (options.id || false) {
            el.setAttribute('id', options.id);
        }

        if (options.classes || false) {
            if (Array.isArray(options.classes)) {
                el.classList.add(...options.classes);
            } else {
                el.classList.add(options.classes);
            }
        }

        return el;
    }
}
