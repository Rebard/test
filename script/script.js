function animation(){
    const menu = document.querySelectorAll('.menu');
    const test = document.querySelector('.test');
    const hello = document.querySelector('.wrapHello');
    const lenHello = hello.clientWidth;
    const len = menu[0].clientWidth;
    const lenTest = test.clientWidth;
    test.style.transform = "translate(" + lenTest + "px)";
    hello.style.transform = "translate(-" + lenHello + "px)";
    menu[0].style.transform = "translate(" + len + "px)";
    menu[1].style.transform = "translate(-" + len + "px)";
}
window.onload = animation;
window.addEventListener('resize',animation);

window.onscroll = function(){
    let scrolled = window.pageYOffset;
    let formOption = document.forms['publish'].style.opacity;
    console.log('screen + height',screen.height + scrolled, document.body.clientHeight);
    if(screen.height + scrolled > 2000){
        document.forms['publish'].style.opacity = '1';
    }
    if(screen.height + scrolled < 2000 && formOption === '1'){
        document.forms['publish'].style.opacity = '0';
    }

};
document.forms['publish'].onkeyup = function validation(event){
    console.log(event.target.value,event.target.name);
    const inputValue = event.target.value;
    const nameInput = event.target.name;
    const iconsSuccess = document.querySelectorAll(".success");
    const fields = ['name', 'phone', 'email', 'message'];
    const validations = {
        name: {
            do: () => {
                const name = inputValue;
                return name.length >= 3 ? true : false;
            }
        },
        email: {
            do: () => {
                const email = inputValue;
                if(!email.length || !isEmail(email)) {
                    return false;
                }
                return true;
            }
        },
        phone: {
            do: () => {
                const phone = inputValue;
                if (!isPhone(phone) || phone.length < 7) {
                    return false;
                }
                return true;
            }
        },
        message: {
            do: () => {
                const msg = inputValue;
                if(msg.length < 7) {
                    return false;
                }
                return true;
            }

        }
    };

    fields.forEach((field,index)=>{
        const fieldValidation = validations[field];

        if (fieldValidation && field === nameInput) {
            const isValid = fieldValidation.do();
            if(isValid){
                iconsSuccess[index].style.display = 'block';
                console.log(index, 'true');
                //event.target.style.display = 'block';
            }else{
                iconsSuccess[index].style.display = 'none';
                console.log(index, 'false');
                //event.target.style.display = 'none';
            }
        }
    });
};
document.forms['publish'].onsubmit = function(event){
    event.preventDefault();
    console.log('sub');
    document.querySelector(".msgSend").style.display = 'block';

};

function isPhone(phone){
    const regex = /^[0-9-+]+$/;
    return regex.test(phone);
}
function isEmail(email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email);
}