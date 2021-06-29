window.addEventListener("DOMContentLoaded", function() {
    // intersection observer
    var observer = new IntersectionObserver(function(entries) {
        for( var i=0; i<entries.length; i++ ) {
            if( entries[i].isIntersecting ) entries[i].target.classList.add("container-visible");
        }
    });
    document.querySelectorAll(".container").forEach(function(el) {
        observer.observe(el);
    });
    // intersection observer
    var observerItem = new IntersectionObserver(function(entries) {
        for( var i=0; i<entries.length; i++ ) {
            if( entries[i].isIntersecting ) entries[i].target.classList.add("container-item-visible");
        }
    });
    document.querySelectorAll(".container-action, .container-body h3, .container-title").forEach(function(el) {
        observerItem.observe(el);
    });
});

// form submission
var form = document.querySelector("form");
if( form ) {
    form.onsubmit = function(e) {
        e.preventDefault();
        var formButton = document.querySelector("form button");
        formButton.classList.add("disabled");
        var fields = ["name", "email", "message"];
        var body = [];
        for(var i=0; i<fields.length; i++) {
            body.push(fields[i] + ": " + document.getElementById(fields[i]).value);
        }
        body = body.join("<br><br>");
        makeRequest( "POST", "https://game103.net/ws/contact.php", { 
            "email": "james@smartsteplavs.com",
            "subject": "Smart-Step Lavs Form Submission",
            "body": body
        }, function() {
            document.querySelector("#form-error").innerText = "Your message has been successfully submitted. We will be in contact soon.";
        }, function() {
            document.querySelector("#form-error").innerText = "An error has ocurred. Please try again later.";
            formButton.classList.remove("disabled");
        } );
    }
}

// make request
function makeRequest(type, url, parameters, callback, errorCallback) {
    var parameterKeys = Object.keys(parameters);
    var parameterArray = [];
    for( var i=0; i<parameterKeys.length; i++ ) {
        parameterArray.push( parameterKeys[i] + "=" + parameters[parameterKeys[i]] );
    }

    if( type == "GET" && parameterKeys.length ) {
        url = url + "?" + parameterArray.join("&");
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open(type, url, true);

    if( type == "POST" && parameterKeys.length ) {
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    } 

    xhttp.onreadystatechange = function() {
        if( this.readyState == 4 ) {
            if( this.status == 200 ) {
                if( callback ) { callback(this.responseText); }
            }
            else {
                if( errorCallback ) { errorCallback(); }
            }
        }
    }    
    if( type == "POST" && parameterArray.length ) {
        xhttp.send( parameterArray.join("&") );
    }
    else {
        xhttp.send();
    }
}