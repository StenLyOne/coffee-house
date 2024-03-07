

//////////////////////////////////////// SLIDER SLIDER SLIDER 

let slider = document.querySelector('.coffee-cards-slider');
let progress = document.querySelectorAll('.progress');
let favoriteWraper = document.querySelector('.favorite-coffee-wraper');
let intervalId;
let setIntervalNext;
let touchstartX = 0;
let touchendX = 0;
let threshold = 50; // Минимальное расстояние для определения свайпа
let index = 0;

if (slider) {

    setIntervalNext = setInterval(nextSlider, 5000);

    

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);

    function handleTouchStart(event) {
        touchstartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        touchendX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        let deltaX = touchendX - touchstartX;
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                prevSlider(); // Свайп вправо
            } else {
                nextSlider(); // Свайп влево
            }
        }
        // Сброс значений
        touchstartX = 0;
        touchendX = 0;
    }

    function nextSlider() {
        let width = favoriteWraper.offsetWidth;
        if (width === 480) {
            const leftNow = parseInt(slider.style.left) || 0;
            slider.style.left = (leftNow - 520) + 'px';
            if (parseInt(slider.style.left) < -1041) {
                slider.style.left = '0px';
            }
        }

        if (width === 348 || width < 348) {
            const leftNow = parseInt(slider.style.left) || 0;
            slider.style.left = (leftNow - 388) + 'px';
            if (parseInt(slider.style.left) < -776) {
                slider.style.left = '0px';
            }
        }
        index++;
        if (index > 2) {
            index = 0;
        }
        progress.forEach(ele => {
            ele.style.width = '0%';
        });

        resetInterval(); // Сброс интервала при переключении слайдов
        animateProgress(index); // Запуск анимации прогресса для нового слайда
    }

    function prevSlider() {
        let width = favoriteWraper.offsetWidth;
        if (width === 480) {
            const leftNow = parseInt(slider.style.left) || 0;
            slider.style.left = (leftNow + 520) + 'px';
            if (parseInt(slider.style.left) > 0) {
                slider.style.left = '-1040px';
            }
        }

        if (width === 348 || width < 348) {
            const leftNow = parseInt(slider.style.left) || 0;
            slider.style.left = (leftNow + 388) + 'px';
            if (parseInt(slider.style.left) > 0) {
                slider.style.left = '-776px';
            }
        }

        index--;
        if (index < 0) {
            index = 2;
        }
        progress.forEach(ele => {
            ele.style.width = '0%';
        });
        resetInterval(); // Сброс интервала при переключении слайдов
        animateProgress(index); // Запуск анимации прогресса для нового слайда
    }

    function animateProgress(index) {
        let widthPercentage = 1;
        const intervalDuration = 5000 / 100; // 5 секунд разделить на 100 интервалов
        if (intervalId) { // Проверка наличия текущего интервала
            clearInterval(intervalId); // Остановка предыдущего интервала
        }

        if (index > 2) {
            index = 0;
        }
        // Увеличение ширины прогресса каждую секунду
        intervalId = setInterval(() => { // Запуск нового интервала
            progress[index].style.width = widthPercentage + '%';
            widthPercentage++;
            if (widthPercentage > 100) {
                widthPercentage = 1;
                clearInterval(intervalId); // Остановка интервала по завершении анимации
                progress.forEach(ele => {
                    ele.style.width = '0%';
                });
            }
        }, intervalDuration);
    }

    function resetInterval() {
        clearInterval(setIntervalNext);
        setIntervalNext = setInterval(nextSlider, 5000);
    }

    animateProgress(index);
}







//////////////////////////////////////// BURGER MENU

const menuBurger = document.querySelectorAll('.burger_menu')
const menuBurgerContainer = document.querySelectorAll('.burger_menu_container')
const links = document.querySelectorAll('.modal a')
const body = document.querySelectorAll('body');
const burgerVector = document.querySelectorAll('.burger_menu_vector')

menuBurger.forEach((ele,index) => {
    
    ele.addEventListener('click', () => {
        menuBurgerContainer[index].classList.toggle('burger_menu_container_activ');
        burgerVector[0].classList.toggle('line1')
        burgerVector[1].classList.toggle('line2')
        
        // Проверяем, есть ли у меню класс 'burger_menu_container_activ' и соответственно добавляем или удаляем стиль для body
        if (menuBurgerContainer[index].classList.contains('burger_menu_container_activ')) {
            body.forEach(element => {
                element.style.overflow = 'hidden'; // Запретить прокрутку страницы
            });
        } else {
            body.forEach(ele => {
                ele.style.overflow = '';
            }) // Разрешить прокрутку страницы
        }
    });
})

links.forEach( ele => { 
    ele.addEventListener('click', () => {
        menuBurgerContainer[0].classList.remove('burger_menu_container_activ');
        // menuBurgerContainer[1].classList.remove('burger_menu_container_activ');
        body.forEach(ele => {
            ele.style.overflow = '';
        }) 
        burgerVector[0].classList.remove('line1')
        burgerVector[1].classList.remove('line2')
    })
})
























async function loadJSON() {
    try {
        const response = await fetch('./js/json.json');
        const data = await response.json();

        function tabs() {
            const btnTabs = document.querySelectorAll('.btn_tabs');

            btnTabs.forEach((ele, index) => {
                ele.addEventListener('click', () => {
                    // Удаление класса btn_tabs_active у всех элементов
                    btnTabs.forEach(btn => {
                        btn.classList.remove('btn_tabs_active');
                    });
                    // Добавление класса btn_tabs_active только к текущему элементу
                    ele.classList.add('btn_tabs_active');

                    const menuGrid = document.querySelector('.menu_grid');
                    menuGrid.innerHTML = ''; // Очищаем содержимое .menu_grid при каждом клике
                    if (index === 0) {
                        displayItems(coffee());
                    } else if (index === 1) {
                        displayItems(tee());
                    } else if (index === 2) {
                        displayItems(dessert());
                    }
                });
            });
        }

        function displayItems(items) {
            const menuGrid = document.querySelector('.menu_grid');
            items.forEach(item => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('menu_box');
                cardElement.setAttribute('id', item.id);

                const imgElement = document.createElement('div');
                imgElement.classList.add('img_menu_box_1');
                imgElement.style.backgroundImage = `url(${item.img})`;

                const textElement = document.createElement('div');
                textElement.classList.add('text_menu_box');

                const nameElement = document.createElement('h3');
                nameElement.textContent = item.name;
                nameElement.style.textAlign = 'left';

                const textMenuElement = document.createElement('div');
                textMenuElement.classList.add('text_menu_box_bot');

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.description;
                descriptionElement.style.textAlign = 'left';
                descriptionElement.style.marginTop = '12px';

                const priceElement = document.createElement('h3');
                priceElement.textContent = `$${item.price}`;
                priceElement.style.textAlign = 'left';

                // Добавление элементов в карточку
                cardElement.appendChild(imgElement);
                cardElement.appendChild(textElement);
                textElement.appendChild(nameElement);
                textElement.appendChild(textMenuElement);
                textMenuElement.appendChild(descriptionElement);
                textMenuElement.appendChild(priceElement);

                // Добавление карточки на страницу
                menuGrid.appendChild(cardElement);
            });
        }

        function coffee() {
            return data.filter(item => item.category === "coffee");
        }

        function tee() {
            return data.filter(item => item.category === "tea");
        }

        function dessert() {
            return data.filter(item => item.category === "dessert");
        }

        function removeAdditiveListeners() {
            const additives = document.querySelectorAll('.additives');
            additives.forEach(ele => {
                const newEle = ele.cloneNode(true);
                ele.parentNode.replaceChild(newEle, ele);
            });
        }

        function applyAdditiveListeners(selectedItem, total) {
            removeAdditiveListeners(); // Удаляем обработчики событий перед повторным применением

            const additives = document.querySelectorAll('.additives');
            additives.forEach(ele => {
                ele.addEventListener('click', (event) => {
                    ele.classList.toggle('btn_tabs-menu-activ');
                    handleAdditiveClick(event, selectedItem, total);
                });
            });
        }

        function handleAdditiveClick(event, selectedItem, total) {
            const ele = event.currentTarget;
            const additivesNumber = ele.querySelector('.additives-number').textContent;

            let addPrice = 0;
            for (let i = 0; i < selectedItem.additives.length; i++) {
                if (additivesNumber === selectedItem.additives[i].name) {
                    addPrice = parseFloat(selectedItem.additives[i]['add-price']);
                    break;
                }
            }

            // Если кнопка уже была активирована, удаляем стоимость добавки
            if (!ele.classList.contains('btn_tabs-menu-activ')) {
                addPrice *= -1; // Умножаем на -1, чтобы вычесть стоимость
            }

            // Обновляем общую стоимость
            total.textContent = '$' + (parseFloat(total.textContent.substr(1)) + addPrice).toFixed(2);
        }

        function applyEventListeners() {
            const menuGrid = document.querySelector('.menu_grid');
            const total = document.querySelector('.total');

            menuGrid.addEventListener('click', (event) => {
                const clickedMenuBox = event.target.closest('.menu_box');
                if (!clickedMenuBox) return; // Если клик был не на .menu_box, просто игнорируем
        
                const id = clickedMenuBox.getAttribute('id');
                const selectedItem = data.find(item => item.id === id);
                const pBtn = document.querySelectorAll('.p-btn');
                const sizeCost = document.querySelectorAll('.size-cost');
                const additivesNumber = document.querySelectorAll('.additives-number');
                const overlay = document.querySelector('.overlay');
                const modalLeftContainer = document.querySelector('.modal-left-container');
                const modalRight1H3 = document.querySelector('.modal-right1 h3');
                const modalRight1P = document.querySelector('.modal-right1 p');

                overlay.style.display = 'flex';
                modalLeftContainer.style.backgroundImage = `url(${selectedItem.img})`;
                modalRight1H3.textContent = selectedItem.name;
                modalRight1P.textContent = selectedItem.description;
                pBtn[0].textContent = selectedItem.sizes.s.size;
                pBtn[1].textContent = selectedItem.sizes.m.size;
                pBtn[2].textContent = selectedItem.sizes.l.size;
                additivesNumber[0].textContent = selectedItem.additives[0].name;
                additivesNumber[1].textContent = selectedItem.additives[1].name;
                additivesNumber[2].textContent = selectedItem.additives[2].name;
                total.textContent = '$' + selectedItem.price;

                sizeCost.forEach((ele, index) => {
                    ele.addEventListener('click', () => {
                        sizeCost.forEach((element) => {
                            element.classList.remove('btn_tabs-menu-activ'); // Удаляем класс у всех элементов
                        });
                        ele.classList.add('btn_tabs-menu-activ'); // Добавляем класс только к текущей цели

                        const linksP = ele.querySelector('.links-p').textContent;

                        if (linksP === 'M') {
                            total.textContent = '$' + (parseFloat(selectedItem.price) + parseFloat(selectedItem.sizes.m['add-price'])).toFixed(2);
                        } else if (linksP === 'L') {
                            total.textContent = '$' + (parseFloat(selectedItem.price) + parseFloat(selectedItem.sizes.l['add-price'])).toFixed(2);
                        } else {
                            total.textContent = '$' + parseFloat(selectedItem.price).toFixed(2);
                        }
                    }); 
                });

                applyAdditiveListeners(selectedItem, total);
            });
        }

        tabs(); // Устанавливаем обработчики вкладок после загрузки данных

        // Показываем элементы coffee по умолчанию
        displayItems(coffee());

        // Применяем обработчики событий после создания элементов
        applyEventListeners();

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

window.onload = async () => {
    try {
        // Проверяем, есть ли на странице элементы, с которыми работает скрипт
        const menuGrid = document.querySelector('.menu_grid');
        if (menuGrid) {
            // Если элементы есть, загружаем данные и устанавливаем обработчики
            await loadJSON(); // Ожидание загрузки данных
        } else {
            // Если элементы отсутствуют, не выполняем действий скрипта
            console.log('Скрипт не выполняется на данной странице');
        }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
};

// Обработчик клика на overlay
const overlay = document.querySelector('.overlay');
const btnModal = document.querySelector('.btn-modal1');

if (btnModal && overlay) {
    btnModal.addEventListener('click', () => {
        overlay.style.display = 'none';

        const sizeCost = document.querySelectorAll('.size-cost');
        sizeCost.forEach(ele => {
            ele.classList.remove('btn_tabs-menu-activ')
            sizeCost[0].classList.add('btn_tabs-menu-activ')
        })

        const additives = document.querySelectorAll('.additives')
        
        additives.forEach(ele => {
            ele.classList.remove('btn_tabs-menu-activ')
        })
    });
}
    


