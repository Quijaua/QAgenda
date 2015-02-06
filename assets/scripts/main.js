var clndr = {};
(function($){
    $('#evt_date').mask('99/99/9999');
    $('#evt_time').mask('99:99');
    $('#frm-agenda').validate({

        submitHandler: function(form) {

            var data = {
                'action'        : 'quijauaagenda_save_event',
                'title'         : $('#title').val(),
                'description'   : $('#description').val(),
                'evt_date'      : $('#evt_date').val(),
                'evt_time'      : $('#evt_time').val(),
                'evt_place'     : $('#evt_place').val(),
            };

            $.ajax({
                type: "POST",
                url: quijauaagenda_ajax.ajax_url,
                data :data,
                dataType : 'json',
            })
                .done(function(response) {
                    if(1 === response.status) {
                        swal("Sucesso", "Evento enviado com sucesso. Aguarde moderação!", "success")
                        $('#frm-agenda')[0].reset();
                        return;
                    }
                    swal("Oops...", "Ocorreu um erro ao enviar o evento. Por favor, tente novamente.", "error");
                    return;
                });
        }

    });

    var eventsArray = [
        { date: '2015-02-18', title: 'Carnaval', url: 'http://github.com/kylestetz/CLNDR' },
        { date: moment().format('YYYY-MM-') + '23', title: 'Another Event' }
    ];

    clndr.passInATemplate = $('#pass-in-a-template').clndr({
        template: $('#clndr-template').html(),
        events: eventsArray,
        clickEvents: {
            click:         function(target) { console.log(target); },
            nextMonth:     function(month)  { console.log('next month'); },
            previousMonth: function(month)  { console.log('previous month'); },
            nextYear:      function(month)  { console.log('next year'); },
            previousYear:  function(month)  { console.log('previous year'); },
            today:         function(month)  { console.log('today'); },
            onMonthChange: function(month)  { console.log('on month change'); },
            onYearChange:  function(month)  { console.log('on year change'); }
        }
    });

})(jQuery);
