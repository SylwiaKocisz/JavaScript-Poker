// 4)	* Create a solution that will tell us what poker set we have.
// The solution is to deal us 5 cards from the standard 52 card deck. 
// After that the solution is to tell us what is the best poker set. EXAM

let deck = []; //wszystkie karty, cała tablica z objs
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
function getDeck() {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = { Value: values[j], Suit: suits[i], CardValue: cardValue[j] };
            deck.push(card);
        }
    }

    return deck;
}
console.log(getDeck())

let onMyHand = []
function onHand(deck) {
    let index;
    for (let i = 0; i < 5; i++) {
        index = Math.floor((Math.random() * deck.length));
        onMyHand.push(deck[index]);
        deck.splice(index, 1)
    } return onMyHand;
}
let wynik = onHand(deck)
wynik.forEach(element => console.log(element))

const sortedCards = onMyHand.sort(function (a, b) {
    return a.CardValue - b.CardValue;

});

setTimeout(function () { console.log(sortedCards) }, 1000);
setTimeout(function () { console.log(onMyHand[0], onMyHand[1], onMyHand[2], onMyHand[3], onMyHand[4]) }, 2000);



//Różne układy kart

// let pokerKrol = [
//     { Value: "10", Suit: "hearts", CardValue: 5 },
//     { Value: "J", Suit: "hearts", CardValue: 10 },
//     { Value: "Q", Suit: "hearts", CardValue: 3 },
//     { Value: "K", Suit: "hearts", CardValue: 10 },
//     { Value: "A", Suit: "hearts", CardValue: 10 }]
//  powyzej uklad do sprawdzania

function ifOneColor(onMyHand) {  //bedzie pozniej potrzebne
    let color = onMyHand[0].Suit;
    let result = onMyHand.every(card => {
        return card.Suit === color;
    });
    return result
}
// console.log("kolor " + ifOneColor(onMyHand))

function ifInSequence(onMyHand) {
    let firstValue = onMyHand[0].CardValue;

    for (let i = 1; i < onMyHand.length; i++) {
        let currentValue = onMyHand[i].CardValue;

        if (firstValue + 1 != currentValue) return false;
        firstValue = currentValue;
    }

    return true;
}

// console.log("sequence " + ifInSequence(onMyHand))

function pokerKrolewski(onMyHand) {
    if (!ifOneColor(onMyHand)) { return false };
    if (
        onMyHand.find(card => {
            return card.CardValue == 10;
        }) &&
        onMyHand.find(card => {
            return card.CardValue == 11;
        }) &&
        onMyHand.find(card => {
            return card.CardValue == 12;
        }) &&
        onMyHand.find(card => {
            return card.CardValue == 13;
        }) &&
        onMyHand.find(card => {
            return card.CardValue == 14;
        })
    ) {
        return true
    } else {
        return false
    }
}
// console.log("Czy to poker krolewski?" + pokerKrolewski(onMyHand))

function poker(onMyHand) {
    // poker ten sam kolor i karty w kolejnosci
    if (!ifOneColor(onMyHand)) return false;
    if (ifInSequence(onMyHand)) return true;

    return false;
}

// console.log("czy to poker " + poker(onMyHand))
//sprawdzamy czy np pierwsze 4 sa takie same itp:
function checkRepetitions(onMyHand, startValue, startIndex, endIndex) {
    let result, cards;

    cards = onMyHand.slice(startIndex, endIndex);
    result = cards.filter(cards => {
        return cards.CardValue == startValue;
    });

    return result;
}
// czyli musimy miec 4 karty pod rzad z takim samym znaczkiem, albo od 0-3, albo od 1-4 :) // 4 takie same karty
function kareta(onMyHand) {
    let cardValue1;
    let four;
    cardValue1 = onMyHand[0].CardValue;
    four = checkRepetitions(onMyHand, cardValue1, 0, 4);
    if (four.length == 4) return true;

    cardValue1 = onMyHand[1].CardValue;
    four = checkRepetitions(onMyHand, cardValue1, 1, 5);

    if (four.length == 4) return true;

    return false;
}
// console.log("kareta " + kareta(onMyHand))

//full - trójka z przodu i para z tyłu lub para z przodu i trójka z tyłu 

function full(onMyHand) {
    let cardValue1, three, two, index;

    // Full => trójka z przodu i para z tyłu
    index = 0;
    cardValue1 = onMyHand[index].CardValue;
    three = checkRepetitions(onMyHand, cardValue1, index);


    if (three.length == 3) {
        index = 3;
        cardValue1 = onMyHand[index].CardValue;
        two = checkRepetitions(onMyHand, cardValue1, index)


        if (two.length == 2) return true;
    }
    // Jeśli => dwie karty z przodu i trzy z tyłu
    index = 0;
    cardValue1 = onMyHand[index].CardValue;
    two = checkRepetitions(onMyHand, cardValue1, index);

    if (two.length == 2) {
        index = 2;
        cardValue1 = onMyHand[index].CardValue;
        three = checkRepetitions(onMyHand, cardValue1, index);

        if (three.length == 3) return true;
    }

    return false;
}
// console.log("full to: " + full(onMyHand))

//kolor

function kolor(onMyHand) {
    return ifOneColor(onMyHand);
}
// console.log("kolor " + kolor(onMyHand))

//czy sa w kolejnosci
function strit(onMyHand) {
    return ifInSequence(onMyHand);
}
// console.log('strit: ' + strit(onMyHand))

// trojka, trzy karty z przodu, trzy w środku, lub trzy z tyłu

function trojka(onMyHand) {
    let cardValue1, three, index;

    for (index = 0; index < 3; index++) {
        cardValue1 = onMyHand[index].CardValue;
        three = checkRepetitions(onMyHand, cardValue1, index, index + 3);

        if (three.length == 3) return true;
    }

    return false;
}
// console.log("trojka: " + trojka(onMyHand))

// dwie pary 

function dwiePary(onMyHand) {
    let cardValue, two, index;

    // Sprawdzamy dwójkę z przodu
    index = 0;
    cardValue = onMyHand[index].CardValue;
    two = checkRepetitions(onMyHand, cardValue, index, index + 2);

    if (two.length == 2) {
        // Sprawdzamy dwójkę w środku
        index = 2;
        cardValue = onMyHand[index].CardValue;
        two = checkRepetitions(onMyHand, cardValue, index, index + 2);

        if (two.length == 2) return true;

        // Sprawdzamy dwójkę z tyłu
        index = 3;
        cardValue = onMyHand[index].CardValue;
        two = checkRepetitions(onMyHand, cardValue, index, index + 2);

        if (two.length == 2) return true;
    }

    // Sprawdzamy dwójkę w środku
    index = 1;
    cardValue = onMyHand[index].CardValue;
    two = checkRepetitions(onMyHand, cardValue, index, index + 2);

    if (two.length == 2) {
        // Sprawdzamy dwójkę z tyłu

        index = 3;
        cardValue = onMyHand[index].CardValue;
        two = checkRepetitions(onMyHand, cardValue, index + 2);

        if (two.length == 2) return true;
    }

    return false;
}

// console.log("dwiepary: " + dwiePary(onMyHand))

function para(onMyHand) {
    let cardValue, two, index;

    for (index = 0; index < onMyHand.length; index++) {
        cardValue = onMyHand[index].CardValue;
        two = checkRepetitions(onMyHand, cardValue, index);

        if (two.length == 2) return true;
    }

    return false;
}

// console.log("Para: " + para(onMyHand))

function pokerSet(onMyHand) {
    if (pokerKrolewski(onMyHand)) {
        return "Poker królewski";
    } else if (poker(onMyHand)) {
        return "Poker";
    } else if (kareta(onMyHand)) {
        return "Kareta";
    } else if (full(onMyHand)) {
        return "Full";
    } else if (kolor(onMyHand)) {
        return "Kolor";
    } else if (strit(onMyHand)) {
        return "Strit";
    } else if (trojka(onMyHand)) {
        return "Trójka";
    } else if (dwiePary(onMyHand)) {
        return "Dwie pary";
    } else if (para(onMyHand)) {
        return "Para";
    } else {
        return "Najwyższa karta";
    }
}

// console.log("Your score is: " + pokerSet(sortedCards))
setTimeout(function () { console.log("Score is: " + pokerSet(sortedCards)) }, 2000)
// console.log("score is: " + pokerSet(onMyHand))