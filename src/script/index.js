import '../styles/index.css';
import {initSlideController} from './slideController.js';

// Прописать функцию добавления анкоров, блокировка скролла при перемещении между слайдами

initSlideController({
    scrollDelay: 800,
    transitionSpeed: 1000
});
