import $ from 'jquery';

class Header {
  constructor(element) {
    this.$el = $(element);
    this.setupColumns();
    // this.render();
  }

  setupColumns() {
    this.$el.empty();
    this.$el.addClass("group");

    let $scoreBoard = $("<ul>");
    $scoreBoard.addClass("score");
    let $name = $("<li>");
    $name.text("Halil");
    $scoreBoard.append($name);

    let $buttons = $("<ul>");
    $buttons.addClass("buttons");
    let $play = $('<input type="button" value="play" />');
    $buttons.append($play);

    let $notifications = $("<ul>");
    $notifications.addClass("notifications");
    let $not = $('<li>No special feature available</li>');
    $notifications.append($not);

    this.$el.append($scoreBoard);
    this.$el.append($buttons);
    this.$el.append($notifications);

  }

  // render() {
  //   <div>
  // }

}

export default Header;
