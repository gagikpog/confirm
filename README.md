# Confirm in JS

#### Link 
```html
    <!-- local -->
    <script src="./confirm.min.js"></script>
    <!-- CDN -->
    <script src="https://gagikpog.ru/data/libs/confirm.min.js"></script>
    <script src="https://gagikpog.ru/confirm/confirm.min.js"></script>
```

#### For use
``` js
    const message = 'title';
    const detailed = 'description';
    const config = {
        MBOK: true,
        theme: 'dark',
        modal: false
    };
    showConfirm(message, detailed, config).then((res) => {
        console.log(`clicked button id = ${res}`);
    });
```

[See more](https://github.com/gagikpog/confirm/blob/master/main.js)

[Demo](https://gagikpog.ru/confirm/)
