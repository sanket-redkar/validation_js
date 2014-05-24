(function($){
  $.fn.validateEmail = function(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test($(this).val());
  };

  $.fn.characterValidation = function(){
    var re = /^[a-zA-Z\s]*$/;
    return re.test($(this).val());
  }

  $.fn.fieldCharacterValidation = function(){
    return $(this).validateField('characterValidation');
  }

  $.fn.emailFieldValidation = function(){
    return $(this).validateField('validateEmail');
  }

  $.fn.validateField = function (func_name){
    if ($(this).val() != ''){
      if (eval("!$(this)."+ func_name + "()")){
        $(this).next('.error').remove();
        $(this).addclass('error-border');
        if ( ($(this).data('error') != '') && ($(this).data('error') != undefined) ){
          $(this).parent().append("<span class='error'>" + $(this).data('error') + "<span>");
        }
        else{
          $(this).parent().append("<span class='error'> is invalid.<span>");
        }
        return false;
      } else {
        $(this).next('.error').remove();
        $(this).removeClass('error-border');
        return true;
      }
    } else {
      return false;
    }
  }


  // Validate the form with the class of required field.
  $.fn.validateForm = function () {
    form = this
    // Find all required class input fields.
    var required_fields = form.find('input.required, select.required, textarea.required');

    if (required_fields.length != 0){

      // add the blur event on each required fields.
      $(document).on('blur', 'form input.required, form select.required, form textarea.required' , function(){
        if ($(this).val() != ''){
          var can_enable_button = true;
        } else {
          $(this).addclass('error-border');
          var can_enable_button = false;
        }
        // on each blur event check the other status of required field.
        $.each(required_fields, function( i, v){
          can_enable_button = (can_enable_button && ($(v).val() != ''));

          // if required field is email then added the email format validation.
          if ($(v).attr('type') == 'email'){
            var valid_email_field = $(v).emailFieldValidation();
            can_enable_button = (can_enable_button &&  valid_email_field );
          }

          // If required field need only character.
          if ($(v).data('only-characters')){
            var valid_field = $(v).fieldCharacterValidation();
            can_enable_button = (can_enable_button && valid_field);
          }
        })
        // after the all required field change the status of submit button.
        form.find('input[type=submit]').attr('disabled', !can_enable_button);
      });

      $(required_fields[0]).trigger('blur');
      $(required_fields[0]).trigger('focus');
    }
  };

})(jQuery);

$(document).on('page:load ready', function(){
  $('form').validateForm();
});