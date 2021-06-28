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