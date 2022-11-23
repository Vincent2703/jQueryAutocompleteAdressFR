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
                        response(labels);
                    }
                });
            },
            minLength: 5,
            mustMatch: false
        });

    });
})(jQuery);
