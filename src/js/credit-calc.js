(function() {
    function Range(element) {
        this.input = element.querySelector('.range__input');
        this.handle = element.querySelector('.range__handle');
        this.bar = element.querySelector('.range__bar');
        this.progress = element.querySelector('.range__progress');
        this.output = element.querySelector('.range__price');

        this.init = () => {
            this.maxWidth = this.bar.offsetWidth;
            this.value = parseInt(this.input.value);
            this.startValue = parseInt(this.input.min);
            this.endValue = parseInt(this.input.max);
            this.step = parseInt(this.input.step);
            this.initPositions();            

            this.handlePosition = this.handle.offsetLeft;
            this.progressWidth = this.progress.offsetWidth;
            this.handle.addEventListener('mousedown', this.listenHandle);
        };

        this.initPositions = () => {
            const valueRange = this.endValue - this.startValue; // получает диапазон значений
            const valuePercent = (this.value - this.startValue) * 100 / valueRange; // получает процент от диапазона
            const position = Math.round(this.maxWidth * valuePercent / 100); // получает позицию в пикселях
            this.updatePositions(position);
        }

        this.updatePositions = (position) => {
            if (position >= 0 && position <= this.maxWidth) {
                this.handle.style.left = `${position}px`;
                this.progress.style.width = `${position}px`;
            }
        };

        this.updateValue = (position) => {
            if (position >= 0 && position <= this.maxWidth) {
                const inputPercent = Math.round(position * 100 / this.maxWidth); // переводит положение ползунка в проценты
                const valueRange = this.endValue - this.startValue; // получает изменяемый диапазон значений
                const newRangeValue = Math.round(valueRange * inputPercent / 100 / this.step) * this.step; // получает новое значение в диапазоне и округляет по занчению шага из инпута

                this.value = newRangeValue + this.startValue;
                this.input.value = this.value;

                total.values[this.input.name] = this.value;
                total.update();
            }
        }

        this.listenHandle = evt => {
            evt.preventDefault();
            let currentPosition = evt.clientX;

            const moveMouseHandler = moveEvt => {
                moveEvt.preventDefault();
                
                let shift = moveEvt.clientX - currentPosition;
                let startPosition = this.handlePosition + 16;
                this.updatePositions(startPosition + shift);
                this.updateValue(startPosition + shift);
            };

            const upMouseHandler = upEvt => {
                upEvt.preventDefault();

                this.handlePosition = this.handle.offsetLeft;
                document.removeEventListener('mousemove', moveMouseHandler);
                document.removeEventListener('mouseup', upMouseHandler);
            };

            document.addEventListener('mousemove', moveMouseHandler);
            document.addEventListener('mouseup', upMouseHandler);
        }
    };

    const total = {
        amountOutput: document.querySelector('#amount'),
        lengthOutput: document.querySelector('#length'),
        sumOutput: document.querySelector('#sum'),

        values: {
            amount: parseInt(document.querySelector('input[name="amount"]').value),
            length: parseInt(document.querySelector('input[name="length"]').value),
            rate: 1.1099
        },

        update() {
            const { amount, length, rate } = this.values;
            this.sumOutput.textContent = `${formatPrice(Math.round(amount * rate / length))} ₽`;
            this.amountOutput.textContent = `${formatPrice(amount)} ₽`;
            this.lengthOutput.textContent = `${length} мес.`;
        }
    };

    const formatPrice = function(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    };

    total.update();

    const rangeElements = document.querySelectorAll('.range');
    for (let element of rangeElements) {
        const range = new Range(element);
        range.init();
    };
})();
