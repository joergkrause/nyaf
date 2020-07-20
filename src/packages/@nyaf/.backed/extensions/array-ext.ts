export function shuffle() {
    let currentIndex = this.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

export function clone() {
    return [...this];
};

export function unique() {
    return new Set([...this]);
};

