$(function () {
    //POPULATES LIST FROM LOCAL STORAGE
    $("#listcontainer").html(localStorage.getItem("listcontents"));
        
    //COUNTER UPDATE
    function updateCount() {                       // Create function to update counter
        var items = $("li[class != 'complete']").length; // Number of items in list
        $('#counter').text(items);                   // Added into counter circle
    }
    updateCount(); 
    
    //ADD ITEM
    $("#additem").click(function () {
        if ($("#additeminput").val() === "") {
            $("#additeminput").val("").focus();
        } else {
            var item = $("#additeminput").val();
            $("#listcontainer").append("<li><div class='itemlabel'>" + item + "</div><div class='editicon glyphicon glyphicon-pencil'></div></li>");
            localStorage.setItem("listcontents",$("#listcontainer").html());
            updateCount();
            $("#additeminput").val("").focus();
        }
    });
    //CLICKS ADD ITEM BUTTON WHEN ENTER IS PRESSED IN INPUT FIELD
    $("#additeminput").keypress(function (event) {
        if (event.keyCode === 13) {
            $("#additem").click();
        }
    });
    
    //COMPLETE ITEM
    $("#listcontainer").on('click', '.itemlabel', function () {
        var complete = $(this).parent('li').hasClass("complete"),
            editable = $(this).attr('contenteditable'),
            item = $(this).text();
        if (complete && editable !== "true") {
            $(this).parent('li').remove();
            $("#listcontainer").prepend("<li><p class='itemlabel'>" + item + "</p><div class='editicon glyphicon glyphicon-pencil'></div></li>");
            localStorage.setItem("listcontents",$("#listcontainer").html());
        } else if (editable !== "true") {
            $(this).parent('li').remove();
            $("#listcontainer").append("<li class= 'complete'><p class='itemlabel complete'>" + item + "</p><div class='trashicon glyphicon glyphicon-trash'></div></li>");
            localStorage.setItem("listcontents",$("#listcontainer").html());
        }
        updateCount();
    });
    
    
    //EDIT EXISTING ITEM
    //MAKES ITEM EDITABLE
    $("#listcontainer").on("click", ".editicon", function () {
        $(this).siblings(".itemlabel").attr("contenteditable", "true").focus();
        $(this).removeClass("editicon glyphicon-pencil").addClass("checkicon glyphicon-ok");
    });
    //BLURS FROM ITEM WHEN ENTER IS PRESSED WHILE EDITING
    $(".itemlabel").keypress(function (event) {
        if (event.keyCode === 13) {
            $(".itemlabel").blur();
        }
    });
    //CLICKS CHECK WHEN BLURRED FROM ITEM WHILE EDITING
    $("#listcontainer").on("blur", ".itemlabel", function () {
        $(".checkicon").click();
    });
    //MAKES ITEM UN-EDITABLE
    $("#listcontainer").on('click', '.checkicon', function () {
        $(this).siblings(".itemlabel").attr("contenteditable", "false");
        $(this).removeClass("checkicon glyphicon-ok").addClass("editicon glyphicon-pencil");
        localStorage.setItem("listcontents",$("#listcontainer").html());
    });

});