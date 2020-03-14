function show(index) {
    const message = 'title';
    const detailed = 'description';
    let config = {}
    switch (index) {
        case 0:
            break;
        case 1:
            config = {
                MBOK: true,
                theme: 'dark'
            };
            break;
        case 2:
            config = {
                MBOK: true,
                theme: 'dark',
                modal: false
            };
            break;
        case 3:
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
        case 4:
            config = {
                templateId: 'template'
            };
            break;
    }

    showConfirm(message, detailed, config).then((res) => {
        const output = document.querySelector('#console');
        output.textContent = `confirm result: id = ${res}\n` + output.textContent;
    });
}

function clearConsole() {
    const output = document.querySelector('#console');
    output.textContent = '';
}