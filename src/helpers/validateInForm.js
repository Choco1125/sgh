export const validateInForm = {
	idForm: '',
	isValid: true,
	setId: function (id){
		this.idForm = id; 
	},
	validate: function (data){
		this.readData(data);
	},
	readData: function(data){
		for (let key in data) {
   		if (!data[key]) {
				this.isValid = false;
				this.setError(this.getFormGroup(key),'Debes llenar este campo');
		 	}		
    }
	},
	getFormGroup: function(name){
		return document.getElementById(this.idForm).querySelector(`[data-name="${name}"]`);
	},
	setError: function(formGroup,msj){
		formGroup.children[1].classList.add('is-invalid')
		formGroup.children[2].innerText = msj;	
		if(formGroup.children[1].localName !== 'div'){
			formGroup.children[1].addEventListener('change',function(){
				formGroup.children[1].classList.remove('is-invalid');
				formGroup.children[2].innerText = '';
			});		
		}else{
			formGroup.children[1].addEventListener('click',function(){
				formGroup.children[2].innerText = '';
			});
		}
	},
	validLength: function(value,name,min=1,max=255){
		if(value.length < min || value.length > max){ 
			this.setError(this.getFormGroup(name),`Este campo debe estar entre ${min} y ${max} caracteres`);
			this.isValid = false;
		}
	}
}
