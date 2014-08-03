$(function () {
    $("#btnStartGame").click(startGame);
});

function startGame() {
    var maxTriesDisplay = $(".max-attempts").first();
    var currentTriesDisplay = $(".current-attempts").first();
    var hintDisplay = $(".game-hint").first();
    var messageBox = $(".message-box").first();

    var level = $("select#ddlGameLevel").val();
    var levelValue: ThePriceIsRight.EGameLevel = (<any>ThePriceIsRight.EGameLevel)[level];

    var settings = new ThePriceIsRight.GameSettings(levelValue, maxTriesDisplay, currentTriesDisplay, hintDisplay, messageBox);
    var game = new ThePriceIsRight.Game(settings);
    game.start();
}