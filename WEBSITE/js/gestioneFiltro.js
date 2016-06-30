 $(document).ready(function () {

            $(".submit").on("click", function(){
                var marca_value = new Array();
                var tipo_value = new Array();
                var so_value = new Array();
                var prezzo_value = new Array();
                var connessione_value = new Array();
                var acquisto_value = new Array();

                $("input[name='tipologia']").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                         tipo_value.push( "'" + $(this).val() + "'" );
                    }
                });

                $("input[name='marca']").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                         marca_value.push( "'" + $(this).val() + "'" );
                    }
                });

                $("input[name='sistemaOperativo']").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                         so_value.push( "'" + $(this).val() + "'" );
                    }
                });
                
                $("input[name='prezzo']").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                         prezzo_value.push( "'" + $(this).val() + "'" );
                    }
                });

                $("input[name='connessione']").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                         connessione_value.push( "'" + $(this).val() + "'" );
                    }
                });

                $("input[name='acquisto']").each(function () {
                    var ischecked = $(this).is(":checked");
                    if (ischecked) {
                         acquisto_value.push( "'" + $(this).val() + "'" );
                    }
                });

                getFromDB( tipo_value, marca_value, so_value, prezzo_value, connessione_value, acquisto_value );

                return false;
            });

        });