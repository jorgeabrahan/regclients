import { loginF, loginFMsg } from '../../DOM&LS/getFromIndex';
import afterLogin from './afterLogin';
import { signIn } from '../../Firebase/custom';
import { ERRORS, setUID } from '../../Global/variables';
import { isAnyInputEmpty } from '../validateForms';

const { mail, pass } = loginF;

const onLogUserError = (err: any) => {
    if (err === 'user-not-found')
        loginFMsg.textContent = ERRORS.login.userNotFound;
    if (err === 'wrong-password')
        loginFMsg.textContent = ERRORS.login.wrongPassword;
    else 
        loginFMsg.textContent = ERRORS.login.unknown;
};

const logUser = () => {
    loginF.style.pointerEvents = 'none';
    signIn(mail.value, pass.value)
        .then((UID) => {
            localStorage.setItem('UID', UID);
            setUID(UID);
            afterLogin(UID);
        })
        .catch((err) => {
            onLogUserError(err);
        })
        .finally(() => {
            loginF.style.pointerEvents = 'all';
        });
};

const handleFormLogin = () => {
    loginFMsg.textContent = '';
    if (isAnyInputEmpty(loginF)) {
        loginFMsg.textContent = ERRORS.emptyInputs;
        return;
    }
    logUser();
};

export default handleFormLogin;
