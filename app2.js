// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
let url = "https://deckofcardsapi.com/api/deck"

async function drawCard(){

  let data = $.getJSON(`${url}/new/draw/?count=1`);
  let { suit, value } = data.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);


}




// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

async function get2(){

 
  let data1 = $.getJSON(`${url}/new/draw/`);
  let deckId = data.deck_id;
  let data2 = await $.getJSON(`${url}/${deckId}/draw/`);

  [data1, data2].forEach(card => {
    let { suit, value } = card.cards[0];
    console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
  });

}



// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


async function cardDeck(){

  let $btn = $('button');
  let $cardArea = $('#card-area');
  let deck = await $.getJSON(`${url}/new/shuffle/`);
  

  $btn.show().on('click', async function() {

      
      let cardData = await $.getJSON(`${url}/${deck.deck_id}/draw/`);
      console.log(`${deck.deck_id}`)
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }

  cardDeck();