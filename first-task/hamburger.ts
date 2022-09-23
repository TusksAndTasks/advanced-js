// Размеры, виды начинок и добавок
enum HamburgerSize {
    SMALL = 'SMALL',
    BIG = 'BIG'
}
enum HamburgerStuffing {
    CHEESE = 'CHEESE',
    SALAD = 'SALAD',
    FRIES = 'FRIES'
}
enum HamburgerTopping {
    SPICES = 'SPICES',
    MAYO = 'MAYO'
}

type HamburgerPartData = {price: number, calories: number};

class Hamburger {
    private stuffingDataTable: Record<HamburgerStuffing, HamburgerPartData> = {
        [HamburgerStuffing.CHEESE]: {price: 10, calories: 20},
        [HamburgerStuffing.SALAD]: {price: 20, calories: 5},
        [HamburgerStuffing.FRIES]: {price: 15, calories: 10},
    }

    private sizesDataTable: Record<HamburgerSize, HamburgerPartData> = {
        [HamburgerSize.SMALL]: {price: 50, calories: 20},
        [HamburgerSize.BIG]: {price: 100, calories: 40},
    }

    private toppingsDataTable: Record<HamburgerTopping, HamburgerPartData> = {
        [HamburgerTopping.SPICES]: {price: 15, calories: 0},
        [HamburgerTopping.MAYO]: {price: 20, calories: 5},
    }

   private toppings: Array<HamburgerTopping>


    constructor(private size: HamburgerSize, private stuffing: HamburgerStuffing) {
        this.toppings = [];
    }

    // Добавить добавку к гамбургеру. Можно добавить несколько добавок, при условии, что они разные.
    addTopping(topping: HamburgerTopping): void {
        this.toppings.push(topping);
    }

    // Убрать добавку, при условии, что она ранее была добавлена.
    removeTopping(topping: HamburgerTopping): void {
        this.toppings = this.toppings.filter((existingTopping) => topping !== existingTopping);
    }

    // Получить список добавок.
    getToppings(): HamburgerTopping[] {
        return this.toppings;
    }

    // Узнать размер гамбургера
    getSize(): HamburgerSize {
        return this.size;
    }

    // Узнать начинку гамбургера
    getStuffing(): HamburgerStuffing {
        return this.stuffing;
    }

    // Узнать цену гамбургера
    calculatePrice(): number {
        const toppingsPrice = this.toppings.reduce((accumulator,topping) => accumulator + this.toppingsDataTable[topping].price, 0);

        return this.stuffingDataTable[this.stuffing].price + this.sizesDataTable[this.size].price + toppingsPrice
    }

    // Узнать калорийность
    calculateCalories(): number {
        const toppingsCalories = this.toppings.reduce((accumulator, topping) => accumulator + this.toppingsDataTable[topping].calories, 0);

        return this.stuffingDataTable[this.stuffing].calories + this.sizesDataTable[this.size].calories + toppingsCalories
    }
}

const hamburger = new Hamburger(HamburgerSize.BIG, HamburgerStuffing.FRIES);

hamburger.addTopping(HamburgerTopping.MAYO);
hamburger.addTopping(HamburgerTopping.SPICES);
console.log(hamburger.getSize());
console.log(hamburger.getStuffing());

console.log(hamburger.getToppings());

console.log(hamburger.calculatePrice());
console.log(hamburger.calculateCalories());

hamburger.removeTopping(HamburgerTopping.MAYO);

console.log(hamburger.getToppings());


console.log(hamburger.calculatePrice());
console.log(hamburger.calculateCalories());

const burger = new Hamburger(HamburgerSize.SMALL, HamburgerStuffing.CHEESE);

burger.addTopping(HamburgerTopping.MAYO);
burger.addTopping(HamburgerTopping.SPICES);
console.log(burger.getSize());
console.log(burger.getStuffing());

console.log(burger.getToppings());

console.log(burger.calculatePrice());
console.log(burger.calculateCalories());

burger.removeTopping(HamburgerTopping.MAYO);
burger.removeTopping(HamburgerTopping.SPICES);

console.log(burger.getToppings());


console.log(burger.calculatePrice());
console.log(burger.calculateCalories());


//Некорректное использование
// const wrongBurger = new Hamburger(HamburgerStuffing.CHEESE, HamburgerStuffing.FRIES);
// const emptyBurger = new Hamburger();