class CardList{
    constructor(container, cards) {
      this.container = container;
      this.cards = cards
    }
  
    addCard(card){
      this.container.appendChild(card)
    }

    render(){
      this.cards.forEach((item) => this.addCard(item));
    }
}