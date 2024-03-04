export const initSlideController = (options) => {
    const { scrollDelay = 800, transitionSpeed = 1000 } = options;

    document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('.section');
        let currentSection = 0;
        const footer = document.querySelector('.footer');
        const totalSections = sections.length + 1;
        let isScrollingAllowed = true;
        let scrollDelay = 500; // Задержка между пролистываниями, мс
        let transitionSpeed = 1000; // Скорость перехода между слайдами, мс

        const scrollToSection = (sectionIndex) => {
            if (!isScrollingAllowed) return;
            isScrollingAllowed = false;

            setTimeout(() => isScrollingAllowed = true, scrollDelay);

            let targetPosition;

            if (sectionIndex < sections.length) {
                // Прокрутка к секции
                const section = sections[sectionIndex];
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;

                if (sectionHeight < windowHeight) {
                    // Выравниваем по центру, если высота секции меньше высоты окна
                    const sectionTopPosition = section.offsetTop;
                    const offset = (windowHeight - sectionHeight) / 2;
                    targetPosition = sectionTopPosition - offset;
                } else {
                    // Прокрутка, чтобы верх секции совпал с верхом экрана
                    targetPosition = section.offsetTop;
                }
            } else {
                // Прокрутка к футеру
                targetPosition = footer.offsetTop;
            }

            performScroll(targetPosition);
        };


        const performScroll = (targetPosition) => {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            const animation = currentTime => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const nextScrollPosition = easeInOutQuad(timeElapsed, startPosition, distance, transitionSpeed);

                window.scrollTo(0, nextScrollPosition);

                if (timeElapsed < transitionSpeed) requestAnimationFrame(animation);
            };

            requestAnimationFrame(animation);
        };

        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        document.addEventListener('wheel', (e) => {
            if (!isScrollingAllowed) return;

            if (e.deltaY < 0 && currentSection > 0) {
                currentSection--;
            } else if (e.deltaY > 0 && currentSection < totalSections - 1) {
                currentSection++;
            }
            scrollToSection(currentSection);
        }, { passive: false });

        // Функция для настройки скорости пролистывания
        function setScrollDelay(newDelay) {
            scrollDelay = newDelay;
        }

        // Функция для настройки скорости перехода между слайдами
        function setTransitionSpeed(newSpeed) {
            transitionSpeed = newSpeed;
        }
    });
};