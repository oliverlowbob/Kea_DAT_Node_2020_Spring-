//exercise 1 
$("body").css("text-align", "center");

//exercise 2 
$("#title h2").text("New title");

//exercise 3
$(".subtitle-box").css("background-color", "green");

//exercise 4
$(".subtitle-box .temp").hide();
$(".subtitle-box .temp").css("display", "none");

//exercise 5
$("div.reason").css("border-style", "dotted");

//exercise 6
$("ol li").css("font-weight", "bold");

//exercise 7
//$('#first-list li').last().css('text-decoration', 'underline');
$('#first-list li:last').css('text-decoration', 'underline');

//exercise 8
$('#first-list li:nth-child(2)').css('text-decoration', 'line-through');

//exercise 9 
$(".second-list").css("font-style", "italic");

//exercise 10
$(".second-list span").css("font-size", "0.5em");

//exercise 11
$(".unused-box label:nth-child(1)").remove();

//exercise 12
$(".unused-box").append("<p>Second Sentence</p>");

//exercise 13
$(".unused-box").prepend("<p>First Sentence</p>");

//exercise 14
$(".unused-box").attr('class', 'used-box');

//exercise 15
$(".used-box").click(() =>{
    $(".used-box").toggleClass('used-boxed-clicked');
    
});

//exercise 16
$("#submit-button").mouseenter(function(){
    $(this).attr('title', "You are now ready to click!");
});
$("#submit-button").mouseleave(function(){
    $(this).removeAttr('title');
});

//exercise 17
$(document).ready(function(){
    $("#submit-button").click(() => {
        let count = $("#first-list li").length;
        $("#first-list").append(`<li>Reason ${count + 1}</li>`)
    });
});

//exercise 18
