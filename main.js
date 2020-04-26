let activeTab = 0;

function show() {
    const message = 'title';
    const detailed = 'description';
    let config = {};
    switch (activeTab) {
        case '0':
            break;
        case '1':
            config = {
                MBOK: true,
                theme: 'dark'
            };
            break;
        case '2':
            config = {
                MBOK: true,
                theme: 'dark',
                modal: false
            };
            break;
        case '3':
            config = {
                buttons: [{
                        id: 'MBCANCEL',
                        title: 'Отмена',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        order: 3
                    }, {
                        id: 'MBOK',
                        title: 'ОК',
                        backgroundColor: '#6c757d',
                        color: '#fff',
                        order: 2
                    }
                ]
            };
            break;
        case '4':
            config = {
                templateId: 'template',
                asyncClose: true,
                validator: (form, button) => {
                    return new Promise((res) => {
                        setTimeout(() => {
                            res(true);
                        }, 2000);
                    });
                }
            };
            break;
        case '5':
            config = {
                templateCallBack: () => {
                    const content = document.createElement('div');
                    content.style.display = 'flex';
                    content.style.justifyContent = 'center';
                    content.style.alignItems = 'center';

                    const label = document.createElement('label');
                    label.for = 'remember';
                    label.style.marginRight = '10px';
                    label.textContent = 'Remember';
                    const input = document.createElement('input');
                    input.name = 'remember';
                    input.type = 'checkbox';

                    content.appendChild(label);
                    content.appendChild(input);
                    return content;
                },
                asyncClose: true
            };
            break;
    }

    showConfirm(message, detailed, config).then((res) => {
        const output = document.querySelector('#console');
        output.textContent = `confirm result: id = ${res.button}  FormData = ${JSON.stringify(res.formData)}\n` + output.textContent;
        res.close();
    });
}

function clearConsole() {
    const output = document.querySelector('#console');
    output.textContent = '';
}

function switchTab(event, tabs) {
    const id = event.target.dataset && event.target.dataset["id"] || null;
    if (id === null) {
        return;
    }
    activeTab = id;
    [...tabs.children].forEach((tab) => {tab.classList.remove('tab-active')});
    event.target.classList.add('tab-active');

    const frame = document.querySelector('#codeFrame');

    frame.src = `./tabs/${id}.html`;
}