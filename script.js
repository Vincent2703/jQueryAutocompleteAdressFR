jQuery(document).ready(function(){
    jQuery("#address").keyup(function(){
        if(jQuery(this).val() !== '') {
            var getValue = encodeURIComponent(jQuery(this).val());
            jQuery.ajax({
                cache: false,
                url: "https://api-adresse.data.gouv.fr/search/?q="+getValue+"&limit=5",
                dataType: "json",
                success: function(data){
                    let labels = [];
                    data.features.forEach(feature => {
                        labels.push(feature.properties.label);
                    });
                    
                    jQuery("#address").autocomplete({
                        source: function(request, response) {
                            var matcher = new RegExp("^(?=.*\\b" + request.term.trim().split(/\s+/).join("\\b)(?=.*\\b") + ").*$", 'i' );
                            response(jQuery.grep(labels, function(value) {
				value = value.label || value.value || value;
				return matcher.test(value) || matcher.test(value.normalize("NFD").replace(/\p{Diacritic}/gu, ""));
                            }));
                        },
                        minLength: 5,
                        mustMatch: false
                    });
                }
            });
        }
    });
});
