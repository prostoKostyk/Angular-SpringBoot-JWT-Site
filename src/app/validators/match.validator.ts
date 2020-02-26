import { FormGroup } from "@angular/forms";

export function match(password1: string, password2: string): object {
    return (formGroup: FormGroup) => {
        const password1Control = formGroup.controls[password1];
        const password2Control = formGroup.controls[password2];
        if (password1Control.value !== password2Control.value && password1Control.value && password2Control.value) {
            password2Control.setErrors({ match: "Потдтверждение пароля не совпадает с паролем" });
        } else {
            password2Control.setErrors(null);
        }
    };
}
