const DisableButton = {
    button: null,
    setId: function(id){
        this.button = document.getElementById(id);
    },
    disable: function(){
        this.button.setAttribute('disabled','');
    },
    enable: function(){
        this.button.removeAttribute('disabled');
    }
}

export default DisableButton;