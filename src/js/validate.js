'use strict';

$(document).ready(function () {
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function validateErrorPlacement(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.filter(':not(:checkbox)').parent("div"));
  };
  var validateHighlight = function validateHighlight(element) {
    $(element).parent('div').addClass("has-error");
  };
  var validateUnhighlight = function validateUnhighlight(element) {
    $(element).parent('div').removeClass("has-error");
  };
  var validateHighlight2 = function validateHighlight2(element) {
    $(element).addClass("has-error");
  };
  var validateUnhighlight2 = function validateUnhighlight2(element) {
    $(element).removeClass("has-error");
  };
  var validateSubmitHandler = function validateSubmitHandler(form) {
    $(form).addClass('loading');
    console.log($(form).serialize());
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  };

  var validatePhone = {
    required: true,
    normalizer: function normalizer(value) {
      var PHONE_MASK = '+X (XXX) XXX-XXXX';
      if (!value || value === PHONE_MASK) {
        return value;
      } else {
        return value.replace(/[^\d]/g, '');
      }
    },
    minlength: 11,
    digits: true

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
  };$(".js-registration-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
        // phone: validatePhone
      } },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      password: {
        required: "Заполните это поле",
        email: "Пароль мимимум 6 символов"
      }
      // phone: {
      //     required: "Заполните это поле",
      //     minlength: "Введите корректный телефон"
      // }
    }
  });

  /////////////////////
  // COURSE CTA FORM
  ////////////////////
  $(".js-form-courseCta").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      phone: validatePhone,
      agree: "required"
    },
    messages: {
      name: "Заполните это поле",
      phone: {
        required: "Заполните это поле",
        minlength: "Введите корректный телефон"
      },
      agree: ""
    }
  });

  jQuery.validator.messages.required = "";

  /////////////////////
  // LANDING CTA FORM (LONG)
  ////////////////////
  $(".js-form-landingCta").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight2,
    unhighlight: validateUnhighlight2,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      phone: validatePhone,
      email: {
        required: true,
        email: true
      },
      agree: "required",
      present_fio: "required",
      present_email: {
        required: true,
        email: true
      },
      country: "required",
      city: "required",
      adress: "required",
      adress_h: "required",
      adress_k: "required"
    },
    messages: {
      name: "Заполните это поле",
      phone: {
        required: "Заполните это поле",
        minlength: "Введите корректный телефон"
      },
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      agree: "",
      present_fio: "Заполните это поле",
      present_email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      country: "",
      city: "Заполните это поле",
      adress: "",
      adress_h: "",
      adress_k: ""
    }
  });

  $.validator.setDefaults({
    ignore: [] // DON'T IGNORE PLUGIN HIDDEN SELECTS, CHECKBOXES AND RADIOS!!!
  });
});