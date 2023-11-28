var easyComm = {
    initialize: function(){
        if(!jQuery().ajaxForm) {
            easyComm.notice.error('Can`t find jQuery ajaxForm plugin!');
        }
        easyComm.rating.initialize();
        jQuery(document).on('submit', 'form.ec-form', function(e){
            easyComm.message.send(this);
            e.preventDefault();
            return false;
        });
        jQuery(document).on('click', '.js-ec-vote-button', function (e) {
            e.preventDefault();
            easyComm.message.vote(this);
        });
    },

    message: {
        send: function(form) {
            jQuery(form).ajaxSubmit({
                data: {action: 'message/create'}
                ,url: easyCommConfig.actionUrl
                ,form: form
                ,dataType: 'json'
                ,beforeSubmit: function() {
                    jQuery(form).find('input[type="submit"]').attr('disabled','disabled');
                    jQuery(form).find('.has-error').removeClass('has-error');
                    jQuery(form).find('.ec-error').text('').hide();
                    return true;
                }
                ,success: function(response) {
                    var fid = jQuery(form).data('fid');
                    jQuery(form).find('input[type="submit"]').removeAttr('disabled');
                    if (response.success) {
                        jQuery(form)[0].reset();
                        if(typeof (response.data) == "string") {
                            jQuery('#ec-form-success-' + fid).html(response.data);
                            jQuery(form).hide();
                        }
                        else {
                            easyComm.notice.show(response.message);
                        }
                    }
                    else {
                        if(response.data && response.data.length) {
                            jQuery.each(response.data, function(i, error) {
                                jQuery(form).find('[name="' + error.field + '"]').closest('.form-group').addClass('has-error');
                                jQuery(form).find('#ec-' + error.field + '-error-' + fid).text(error.message).show().closest('.form-group').addClass('has-error');
                            });
                        } else {
                            easyComm.notice.error(response.message);
                        }
                    }
                }
                ,error: function(){
                    jQuery(form).find('input[type="submit"]').removeAttr('disabled');
                    easyComm.notice.error('Submit error');
                }
            });
        },
        vote: function(btn) {
            if(jQuery(btn).data('locked')) {
                return;
            }
            var messageId = jQuery(btn).closest('.ec-message__votes').data('message-id');
            var value = jQuery(btn).data('value');
            var propertiesKey = jQuery(btn).closest('.ec-message__votes').data('properties-key');

            // блокируем от повторного нажатия
            jQuery(btn).data('locked', true);
            jQuery.ajax({
                type: "POST",
                url: easyCommConfig.actionUrl,
                dataType: "json",
                data: {
                    action: 'message/vote',
                    messageId: messageId,
                    propertiesKey: propertiesKey,
                    value: value
                },
                cache: false,
                success: function(data) {
                    //debugger
                    if(data.success) {
                        var $wr = jQuery(btn).closest('.ec-message__votes');
                        $wr.find('.js-ec-vote-button[data-value="1"]').text(data.data.likes);
                        $wr.find('.js-ec-vote-button[data-value="-1"]').text(data.data.dislikes);
                        $wr.find('.js-ec-vote-button').removeClass('active');
                        $wr.find('.js-ec-vote-button[data-value="' + data.data.value + '"]').addClass('active');
                        $wr.find('.js-ec-vote-bar').css('width', data.data.votes_rating_percent + '%');
                    }
                    else {
                        easyComm.notice.error(data.message);
                    }
                    jQuery(btn).removeData('locked');
                },
                error: function(){
                    easyComm.notice.error('Request error');
                    jQuery(btn).removeData('locked');
                }
            });
        }
    },


    rating: {
        initialize: function(){
            var stars = jQuery('.ec-rating').find('.ec-rating-stars>span');
            stars.on('touchend click', function(e){
                var starDesc = jQuery(this).data('description');
                jQuery(this).parent().parent().find('.ec-rating-description').html(starDesc).data('old-text', starDesc);
                jQuery(this).parent().children().removeClass('active active2 active-disabled');
                jQuery(this).prevAll().addClass('active');
                jQuery(this).addClass('active');
                // save vote
                var storageId = jQuery(this).closest('.ec-rating').data('storage-id');
                jQuery('#' + storageId).val(jQuery(this).data('rating'));
            });
            stars.hover(
                // hover in
                function() {
                    var descEl = jQuery(this).parent().parent().find('.ec-rating-description');
                    descEl.data('old-text', descEl.html());
                    descEl.html(jQuery(this).data('description'));
                    jQuery(this).addClass('active2').removeClass('active-disabled');
                    jQuery(this).prevAll().addClass('active2').removeClass('active-disabled');
                    jQuery(this).nextAll().removeClass('active2').addClass('active-disabled');
                },
                // hover out
                function(){
                    var descEl = jQuery(this).parent().parent().find('.ec-rating-description');
                    descEl.html(descEl.data('old-text'));
                    jQuery(this).parent().children().removeClass('active2 active-disabled');
                }
            );
        }
    },

    notice: {
        error: function(text) {
            alert(text);
        },
        show: function(text) {
            alert(text);
        }
    }
}

jQuery(document).ready(function(){
    easyComm.initialize();
});

var easyCommReCaptchaCallback = function() {
    if(typeof grecaptcha !== 'undefined'){
        $('.ec-captcha').each(function(index) {
            grecaptcha.render($(this).attr('id'), {
                'sitekey' : easyCommConfig.reCaptchaSiteKey
            });
        });
    }
    else {
        easyComm.notice.error('grecaptcha is not defined!');
    }
}