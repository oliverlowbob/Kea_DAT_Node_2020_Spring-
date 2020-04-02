$("#submitButton").click(() =>{
    
    const temp = $(".inputRight").val();
    $(".inputRight").val($(".inputLeft").val());
    $(".inputLeft").val(temp);
});