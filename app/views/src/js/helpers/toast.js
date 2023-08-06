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