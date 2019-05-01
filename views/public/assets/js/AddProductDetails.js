$(document).ready(function(){
    $('input.typeahead').typeahead({
        name: 'typeahead',
        remote: 'http://localhost:8000/products/search?key=%QUERY',
        limit: 10
    });
});