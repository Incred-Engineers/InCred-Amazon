// JavaScript Document

//$('.input-group.date').datepicker({format: "dd.mm.yyyy"}); 
//$('.datepicker').pickadate();



let validityIndex ={
    'email' : false,
    'pin_Code':false,
    'loan_amount':true,
    'otp':false
        // 'check' : false
}
let enableButton=function(){
    validity=Object.values(validityIndex).every(ele=>ele);
    if(validity){
        document.querySelector('#applynow').disabled=false;
        document.querySelector('#send_Button').disabled = false;
    }
    else{
        if(document.getElementById('applynow')){
      document.querySelector('#applynow').disabled=true;
      document.querySelector('#send_Button').disabled = true;
        }
    }
}

var otpIndex = {
  'name' : false,
  'phone' : false,
  
}

let enableMainButton = function(){
  validity=Object.values(otpIndex).every(ele=>ele);
  if(validity){
    document.querySelector('#send_Button').disabled = false;
    document.getElementById('send_Button').style.backgroundColor = '#f9a234';
    // document.getElementById('send_Button').style.backgroundColor = '#f9a234';
}
else{
    if(document.getElementById('applynow')){
  document.querySelector('#send_Button').disabled = false;
    }
}
}

    let timeoff = {
      'time' : false
    }

    enableButton();

// if(performance.navigation.type==1){
//     location.href='index.html';
//     localStorage.clear();
//     sessionStorage.clear();
// }
if(performance.navigation.type == 2){
    // location.href="index.html";
    // localStorage.clear()
    var pathName = window.location.pathname;
    var path = pathName.substring(pathName.lastIndexOf('/') + 1);
    if(path === 'otp.html'){
        sessionStorage.removeItem('ENTITY_DETAILS_REQUEST');
        localStorage.removeItem('ENTITY_DETAILS');
        location.href='business.html';
    }
}

  $("#loan_amount").keyup(function(){
    var loanAmount = +(document.querySelector('#loan_amount').value);
    if (!(loanAmount != "" && loanAmount >= 100000))                               
    { 
        document.getElementById('number').innerHTML = 'Please enter  loan amount between 1,00,000 to 50,00,000 ';
        document.getElementById('number').style.color = 'red';
        validityIndex['loan_amount']=false;
        enableButton();
        enableMainButton();
        return false; 
    } else if (!(loanAmount <= 5000000))                               
    { 
        document.getElementById('number').innerHTML = 'Please enter loan amount between 1,00,000 to 50,00,000';
        document.getElementById('number').style.color = 'red';
        validityIndex['loan_amount']=false;
        enableButton();
        enableMainButton();
        return false; 
    } else{
        document.getElementById('number').innerHTML = '';
        // document.getElementById('number').style.color = 'green';
        var loanAmount=true;
        validityIndex['loan_amount']=true;
        enableButton();
        enableMainButton();
        return true;
    }
  });


    $("#name").keyup(function(){
        var name = document.querySelector('#name').value;
        if(name == ''){
          document.getElementById('contact_name').innerHTML = 'Please enter valid name.'
          document.getElementById('contact_name').style.color = 'red';
          otpIndex['name']=false;
        }
        else if (!name.match(/^[a-zA-Z ]*$/))
        {
            document.getElementById('contact_name').innerHTML = 'Please enter valid name.'
            document.getElementById('contact_name').style.color = 'red';
            // document.getElementById('contact_name').style.color = 'red';
            var name = false
            otpIndex['name']=false;
            enableMainButton();
            return false;
        } else{
          document.getElementById('contact_name').innerHTML = '';
          document.getElementById('contact_name').style.color = 'green';
          var name = true;
          otpIndex['name']=true;
            enableMainButton();

          return true;
      }
    });

    // $('#send_Button').keyup(function(){
    //   validityIndex['amazon_id']=false;
    // })

    $("#Amazonseller").keyup(function(){
      var name = document.querySelector('#name').value;
      if(name == ''){
        document.getElementById('Amazon_error').innerHTML = 'Please enter valid name.'
        document.getElementById('Amazon_error').style.color = 'red';
         enableButton();
          enableMainButton();
        // validityIndex['amazon_id']=false;
      }
      else if (!name.match(/^[a-zA-Z ]*$/))
      {
          document.getElementById('Amazon_error').innerHTML = 'Please enter valid name.'
          document.getElementById('Amazon_error').style.color = 'red';
          document.getElementById('verify_via1').style.display = 'block';
        // validityIndex['amazon_id']=false;
          // enableButton();
          // enableMainButton();
          return false;
      } else{
        document.getElementById('Amazon_error').innerHTML = '';
        document.getElementById('Amazon_error').style.color = 'green';
        // validityIndex['amazon_id']=true;
          // enableButton();
          // enableMainButton();
        return true;
    }
  });
    

    
        $("#pin_Code").keyup(function(){
            var pincode = document.querySelector('#pin_Code').value;
            if(pincode == ''){
                document.getElementById('pincode_1').innerHTML = 'Please enter valid pincode.';
                document.getElementById('pincode_1').style.color = 'red';
                validityIndex['pin_Code']=false;
                enableButton();
              }
            else if (!pincode.match(/^[1-9][0-9]{5}$/))                               
         { 
                document.getElementById('pincode_1').innerHTML = 'Please enter your valid Pincode.';
                document.getElementById('pincode_1').style.color = 'red';
                var pincode = false
                validityIndex['pin_Code']=false;
                  enableButton();
                  enableMainButton();
                  return false;
              } else{
                  var pincode = document.querySelector('#pin_Code').value;
                  url=`https://api-qa-sme.nprod.incred.com/v2/pincode/get/IN/${pincode}`
                  $.ajax(url, {
                      crossDomain: true,
                      method: 'GET',
                      contentType: "application/json; charset=UTF-8",
                      dataType: "json",
                      timeout: 5000,
                      error: function (err) {
                          console.log(err)
                          // document.getElementById('pin').innerHTML = 'Please enter valid Pin Code.'
                          return false;
                      }
                  })
                      .done(function (result) {
                          if (!result.status) {
                              document.getElementById('pincode_1').innerHTML = 'Please enter valid Pincode.'
                              document.getElementById('pincode_1').style.color = 'red';
                              validityIndex['pin_Code']=false;
                              enableButton();
                              enableMainButton();
                              return false;
                          }
                          else {
                            validityIndex['pin_Code']=true;
                            enableButton();
                            enableMainButton();
                            setTimeout(() => {
                              document.getElementById('pincode_1').innerHTML = '';
                            },2000)
                            document.getElementById('pincode_1').innerHTML = 'Pincode verified successfully';
                            document.getElementById('pincode_1').style.color = 'green';
                              return true;
                          }
                      });
                  // if (!pincode.match(/^[1-9][0-9]{5}$/)) {
                  //     document.getElementById('pin').innerHTML = 'Please enter your valid Pin Code.'
          
                  //     return false;
                  // } else {
                  //     document.getElementById('pin').innerHTML = '';
                  //     return true;
                  // }
                  return true;
          }
            });
     
    



    $("#mobile").keyup(function(){
        var mobile = document.querySelector('#mobile').value;
        var mobileFormat = /^[6-9][0-9]{9}$/;
        if (!mobile.match(mobileFormat))   
        {
            document.getElementById('mobile_number').innerHTML = 'Please enter valid mobile number.';
            document.getElementById('mobile_number').style.color = 'red';
            let mobilelabel = document.getElementById('mobliediv');
            let closemoblie = mobilelabel.setAttribute('class','disableLabel');
            document.getElementById('otpSent').style.display = 'none';
            // document.getElementById('mobile_number').style.color = 'red'
            otpIndex['phone']=false;
            enableMainButton();
            return false;
        } else{
          document.getElementById('mobile_number').innerHTML = '';
          document.getElementById('mobile_number').style.color = 'green';
          document.getElementById('otpSent').style.display = 'none';
          // document.getElementById('send_Button').style.backgroundColor = '#f9a234';
          otpIndex['phone']=true;
          var mobile= true;
          enableMainButton();
          return true;
      }
    });

    


    $("#email").keyup(function(){
        
        var email = document.querySelector('#email').value  ;
        var emailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email == ''){
          document.getElementById('email_id').innerHTML = 'Please enter valid email ID.';
          document.getElementById('email_id').style.color = 'red';
        }
        if (!email.match(emailFormate))
        {
            document.getElementById('email_id').innerHTML = 'Please enter valid email ID.';
            document.getElementById('email_id').style.color = 'red';
            let mobilelabel = document.getElementById('emailId');
            let closemoblie = mobilelabel.setAttribute('class','disableLabel');
            validityIndex['email']=false;
            enableButton();
            enableMainButton();
            return false;
        } else{
          document.getElementById('email_id').innerHTML = '';
          validityIndex['email']=true;
          var email= true;
          enableButton();
          enableMainButton();
          return true;
          
      }
    });

   

function switchDiv(){
    let data = JSON.parse(localStorage.getItem('lead_data'));
    let response  = (data.response);
    let leadId = response.LEAD_ID;
    url = 'https://api-qa-sme.nprod.incred.com/v2/corporate/blp/lead/update'
    let submitString = JSON.stringify({
        "PIN": document.querySelector('#pin_Code').value,
        "LEAD_ID": leadId,
        "LOAN_AMOUNT": document.querySelector('#loan_amount').value,
        "MOBILE":document.querySelector('#mobile').value,
        "NAME":document.querySelector('#name').value,
        "EMAIL":document.querySelector('#email').value
    });
    $.ajax(url, {
        crossDomain: true,
        method: 'POST',
        data: submitString,
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        timeout: 5000,
        error: function (err) {
         console.log("error")
        }
      })
        .done(function (result) {
          OTPData=result.response;
          localStorage.setItem('userData',JSON.stringify(result.response))
          if(result.status){
            setTimeout(()=> {
              if (document.getElementById('form1')) {

                if (document.getElementById('form1').style.display == 'none') {
                    document.getElementById('thankyou').style.display = 'block';
                    document.getElementById('thankyou').style.display = 'none';
                }
                else {
                    document.getElementById('form1').style.display = 'none';
                    document.getElementById('thankyou').style.display = 'block';
                }
            }
            },2000)
          }
          else{
            window.alert(result.message) 
          }
        });

     
}

$('#otp').keyup(function (){ 
                // window.clearTimeout( window.timerId);
                document.getElementById('otp_verifying').style.display= 'block';
                document.getElementById('otp_verifying').style.color = '#646464';
                document.getElementById('valid_otp').style.display = 'none';
                let lastotp = document.getElementById('otp').value;
                if(lastotp.length == 4){
                        let url = 'https://api-qa-sme.nprod.incred.com/v2/corporate/blp/lead/verify'
                        let leadString = JSON.stringify(
                            {
                                "LEAD_ID": JSON.parse(localStorage.getItem('OTPDATA')).LEAD_ID,
                                "OTP":lastotp
                            })
                        $.ajax(url, {
                            method: 'POST',
                            data: leadString,
                            contentType: "application/json",
                            timeout: 5000,
                            dataType: "json",
                            error: function (err) {
                                console.log("error")
                            }
                        })
                            .done(function (result) {
                                console.log(result)
                                localStorage.setItem('fromOTP', JSON.stringify(result.response))
                                // window.close();
                                if (result.status) {
                                    let response = result.response;
                                    document.getElementById('email_id').disabled = false;
                                    document.getElementById('pincode_1').disabled = false;
                                    document.getElementById('loan_amount').disabled = false;
                                    document.getElementById('Amazonseller').disabled = false;
                                    document.getElementById('otp_verifying').style.display= 'none';
                                    setTimeout(()=>{
                                      document.getElementById('valid_otp').innerHTML = '';
                                    },3000)
                                    document.getElementById('valid_otp').innerHTML = 'Entered Valid OTP';
                                    document.getElementById('valid_otp').style.display = 'block';
                                    document.getElementById('valid_otp').style.color = 'green';
                                    timer(0);
                                    let mobilelabel = document.getElementById('mobliediv');
                                    let closemoblie = mobilelabel.setAttribute('class','disableLabel');
                                    document.getElementById('otpSent').style.display = 'none';
                                    // let finalMoblie = closemoblie.classList.add('disableLabel')
                                    document.getElementById('mobile').readOnly = true;
                                    
                                    validityIndex['otp']=true;
                                    enableButton();  
                                    setTimeout(function () {
                                        localStorage.setItem('lead_data',JSON.stringify(result));
                                    }, 5000);
                                  }
                                else {
                                  validityIndex['otp']=false;
                                  enableButton(); 
                                  document.getElementById('otp_verifying').style.display= 'none';
                                  document.getElementById('valid_otp').innerHTML = 'Incorrect OTP';
                                  document.getElementById('valid_otp').style.display = 'block';
                                  document.getElementById('valid_otp').style.color = 'red';
                                  timer(0);
                                  document.getElementById('otpSent').style.display = 'none';
                                  document.getElementById('send_Button').style.display = 'inline';
                                  document.getElementById('send_Button').disabled = false;
                                   
                                }
                              })
                }
});

                        // location.href='entity_details.html';

  let otpCheck = {
    'otp' : false
  }

 function sendOtp (){  
   document.getElementById('send_Button').style.display = 'none';
    document.getElementById('loading_button').style.display = 'inline-block';
  // document.getElementById('resend_Button').style.display = 'none';
  // if(window.timerId == 0){
  //   document.getElementById('resend_Button').style.display = 'block';
  // }else{
  //   document.getElementById('resend_Button').style.display = 'none';
  //   timer(); 
  // }
    url='https://api-qa-sme.nprod.incred.com/v2/corporate/blp/lead/generate'
    let leadString=JSON.stringify({
                "MOBILE": document.querySelector('#mobile').value,
                "NAME":document.querySelector('#name').value,
                "PLATFORM": "BL_AMAZON_WEB"
                });
    localStorage.setItem('zomatoFirstPage',leadString)
    sessionStorage.setItem("zomatoFirstPageSession", leadString);
    $.ajax(url, {
        crossDomain: true,
        method: 'POST',
        data: leadString,
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        timeout: 5000,
        error: function (err) {
         console.log("error")
        }
      })
        .done(function (result) {
          OTPData=result.response;
          document.getElementById('send_Button').style.display = 'none';
          document.getElementById('loading_button').style.display = 'none';
          document.getElementById('otpdiv').style.display = 'block';
          document.getElementById('otpSent').style.display = 'block';
          document.getElementById('resendOtp').style.display = 'inline-block';
          localStorage.setItem('OTPDATA',JSON.stringify(result.response));
          timer(30);
        });
}

// window.timerId = null;
function timer(data){
   var timeLeft =data;
   var elem = document.getElementById('some_div');
   if(timeLeft == 0){
    elem.innerHTML = '';
    clearTimeout( window.timerId);
    document.getElementById('some_div').style.display = 'none';
   }else{
    window.timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout( window.timerId);
      } else {
          var data  = timeLeft--;
          if(data == -1 ){
            timeLeft = 0
            elem.innerHTML = '' ;
          }
          if(data != 0 && data != -1) {
            document.getElementById('some_div').style.display = 'inline';
            document.getElementById('some_div').style.marginTop = '-18px';
            document.getElementById('resendOtp').style.display = 'none';
            elem.innerHTML ='Resend OTP in'+ ' '+ timeLeft
          }
        if(timeLeft == 0){
          document.getElementById('resendOtp').style.display = 'none';
          document.getElementById('some_div').style.display = 'none';
          document.getElementById('send_Button').style.display = 'inline-block';
          timeLeft = 0;
          // document.getElementById('resend_Button').style.display = 'block';
        }
      }
    }
    
  }
}

function resendOtp(){
  document.getElementById('resend_Button').style.display = 'block';
  document.getElementById('otp_check').style.display = 'block';
    url='https://api-qa-sme.nprod.incred.com/v2/corporate/blp/lead/generate'
    let leadString=JSON.stringify({
                "MOBILE": document.querySelector('#mobile').value,
                "NAME":document.querySelector('#name').value,
                "EMAIL":document.querySelector('#email').value
                });
    let mobile = document.querySelector('#mobile').value  
    localStorage.setItem('zomatoFirstPage',leadString)
    sessionStorage.setItem("zomatoFirstPageSession", leadString);
    $.ajax(url, {
        crossDomain: true,
        method: 'POST',
        data: leadString,
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        timeout: 5000,
        error: function (err) {
         console.log("error")
        }
      })
        .done(function (result) {
          OTPData=result.response;
          localStorage.setItem('OTPDATA',JSON.stringify(result.response))
          if(result.status){
           let status = result;
          }
          else{
            localStorage.setItem('leadStoreDB',JSON.stringify(result.response))
            setTimeout(() => {
              window.location.href = 'Thank you.html'
            }, 1000);
            // window.alert(result.message) 
          }
        });

}


$(document).on('change keyup', '.required', function(e) {
    let Disabled = true;
    $(".required").each(function() {
        let value = this.value
        if ((value) && (value.trim() != '')) {
            Disabled = false
        } else {
            Disabled = true
            return false
        }
    });

    if (Disabled) {
        $('.toggle-disabled').prop("disabled", true);
    } else {
        $('.toggle-disabled').prop("disabled", false);
    }

})
$(document).on('change', '#checkBox', function(e) {
    let Disabled = true;
    $(".required").each(function() {
        let value = this.value
        if ((value) && (value.trim() != '')) {
            Disabled = false
        } else {
            Disabled = true
            return false
        }
    });

    if (Disabled) {
        $('.toggle-disabled').prop("disabled", true);
        if (!document.getElementById("mainApp")) {
            $('#nextButton').prop('disabled', false);
        }
    } else {
        $('.toggle-disabled').prop("disabled", false);
    }
})



    