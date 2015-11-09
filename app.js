$(function(){


    // load page
    var loadLogin = function(){
            $.ajax({
                type: 'GET',
                url: 'pages/login.inc.html',
                dataType:'text',
                complete:function(data){
                    $("#content").html(data.responseText);
                    $.cookie("logedIn", "Y");
                    rebind_login();
                }
            });
        },

        // prepare login form
        rebind_login = function(){
            if($("#login_submit").length>0){
                $("#login_submit")
                    .unbind("click")
                    .bind("click", function(){
                        var error = [], data = [];
                        $(["login","password"]).each(function(index, element){
                            var xelem = $("#" + element);
                            if (String(xelem.val()).length == 0) {
                                error.push(xelem.attr("errorMessage"));
                            } else {
                                data[element] = xelem.val();
                            }
                        });

                        if (error.length == 0) {
                            doLogin(data['login'], data['password']);
                        } else {
                            alert(error.join("\n"));
                        }
                    });
            }

        },

        // load application page
        loadApp = function(){
            $.ajax({
                type: 'GET',
                url: 'pages/main.inc.html',
                dataType:'text',
                complete:function(data){
                    $("#content").html(data.responseText);
                    rebind_app();
                }
            });
        },

        // rebind application elements
        rebind_app = function(){
            if($("#app_form").length>0){
                $(".menu")
                    .unbind("click")
                    .bind("click", function(){
                        var _this = $(this);
                        if(_this.attr("id") == "exit"){
                            doExit();
                        } else {
                            alert("You press button " + _this.val());
                        }

                    });
            }
        },

        // send data for exit
        doExit = function(){
            $.ajax({
                url:'api/v1/exit/',
                type: 'POST',
                dataType:'text',
                data: {exit: 'yes'},
                complete: function(data) {
                    $.cookie("logedIn", "N");
                    loadLogin();
                }
            });
        },

        // send data for authentication
        doLogin = function(login, passwd){
            $.ajax({
                url:'api/v1/auth/',
                type: 'POST',
                dataType:'text',
                data: {login: login, passwd:passwd},
                complete: function(data) {
                    //button.show();
                    if (data.responseText == 'success') {
                        loadApp();
                    } else {
                        alert("Internal Server Error. Try again later!");
                    }
                }
            });
        };

    // check container
    if($("#content").length>0){
        if($.cookie('logedIn') == 'Y'){
            loadApp();
        }else{
            loadLogin();
        }
    }

});