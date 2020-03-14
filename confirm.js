
function showConfirm(message, description, config) {
    const id = `confirm_${new Date().getTime()}`;
    const dialogId = `#${id}`;
    createHtml(id);

    return new Promise((res, rej) => {
        const dialog = document.querySelector(dialogId);

        config = config || {};
        const isNeedUseDefaultButtons = config.MBOK || config.MBCANCEL || config.MBYES;

        if (!config.buttons) {
            config.buttons = [{
                    id: 'MBCANCEL',
                    title: 'Cancel',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    order: 3
                }, {
                    id: 'MBOK',
                    title: 'OK',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    order: 2
                }, {
                    id: 'MBYES',
                    title: 'Yes',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    order: 1
                }
            ];
        }
        config = {
            ...{
                theme: 'white',
                modal: true,
                templateId: ''
            },
            ...config
        };

        const buttonsContainer = document.querySelector(`${dialogId} .messageBox-buttons`);
        while(buttonsContainer.hasChildNodes()) {
            buttonsContainer.removeChild(buttonsContainer.lastChild);
        }
        config.buttons.forEach((button) => {
            if (isNeedUseDefaultButtons && !(button.id in config)) {
                return;
            }
            const btn = document.createElement('button');
            btn.classList.add('btn', 'mbButton');
            btn.textContent = button.title;
            btn.id = button.id;
            btn.onclick = function() {
                dialog.style.display = 'none';
                dialog.remove();
                res(btn.id)
            };
            btn.style.backgroundColor = button.backgroundColor;
            btn.style.color = button.color;
            btn.style.order = button.order;
            buttonsContainer.appendChild(btn);
        });

        dialog.classList = [];
        dialog.classList.add('confirm', config.theme);
        dialog.style.display = 'flex';

        if (config.modal) {
            dialog.classList.add('modal');
        } else {
            dialog.classList.remove('modal');
        }

        const maxWidth = document.body.clientWidth;

        const minWidth = 350;
        let width = config.buttons.length * 130;
        width = width < minWidth ? minWidth : config.buttons.length * 130;
        width = width < maxWidth ? width : maxWidth;
        document.querySelector(`${dialogId} .dialog`).style.maxWidth = `${width}px`;
        document.querySelector(`${dialogId} .dialog`).style.minWidth = `${width}px`;
        document.querySelector(`${dialogId} #messageTitle`).textContent = message;
        document.querySelector(`${dialogId} #messageDescription`).textContent = description;
        
        if (config.templateId) {
            const template = document.querySelector(`#${config.templateId}`);
            const clone = document.importNode(template, true);
            clone.style.display = 'block';
            const contentContainer = document.querySelector(`${dialogId} #messageDefaultContent`);
            contentContainer.appendChild(clone);
        }

    });

    function createHtml (id) {

        const confirm = document.createElement('div');
        confirm.id = id;
        confirm.classList.add('confirm');
        confirm.style.display = 'none';

        const dialog = document.createElement('div');
        dialog.classList.add('dialog');

        const h1 = document.createElement('h1');
        h1.id = 'messageTitle';
        h1.classList.add('title');

        const content = document.createElement('div');
        content.id = 'messageDefaultContent';
        content.classList.add('messageDefaultContent');

        const p = document.createElement('p');
        p.id = 'messageDescription';
        p.classList.add('description');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('messageBox-buttons');

        dialog.appendChild(h1);
        dialog.appendChild(content);
        dialog.appendChild(p);
        dialog.appendChild(buttonsContainer);

        confirm.appendChild(dialog);
        document.body.appendChild(confirm);
    }
}

const sheet = (function() {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
})();

`
.confirm *{
    padding: 0;
    margin: 0;
}
.confirm {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 361;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.confirm.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000008c;
  transform: translate(0, 0);
}
.confirm .dialog {
  background-color: white;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
.confirm .description {
  flex: 2;
  text-align: center;
  padding: 12px;
  max-width: 100%;
}
.confirm .title {
  text-align: center;
  margin-top: 30px;
}
.confirm .messageBox-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
}
.confirm .mbButton {
  width: 120px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
}
.confirm.dark > *{
  color: white;
  background-color: #1e1e1e;
}
`.split('}').map((str) => str + '}').slice(0,-1).forEach((style, index) => {
    sheet.insertRule(style, index);
});

