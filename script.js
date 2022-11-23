(function($) {
    $(document).ready(function() {
        var input = $("#address");

        input.autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: "https://api-adresse.data.gouv.fr/search/?limit=5",
                    data: {
                        "q": input.val()
                    },
                    dataType: "json",
                    success: function(data) {
                        var labels = [];
                    data.features.forEach(feature => {
                        labels.push(feature.properties.label);
                    });
					console.log(labels);
                        var matcher = new RegExp("^(?=.*\\b" + request.term.trim().split(/\s+/).join("\\b)(?=.*\\b") + ").*$", 'i');

                        response($.grep(labels, function(value) {
                            value = value.label || value.value || value;
                            return matcher.test(value) || matcher.test(value.normalize("NFD").replace(/\p{Diacritic}/gu, ""));
                        }));
                    }
                });
            },
            minLength: 5,
            mustMatch: false
        });

    });
})(jQuery);
