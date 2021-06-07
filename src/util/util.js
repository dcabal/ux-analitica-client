import store from '../store';
import router from '../router';

export const checkLogin = () => {
    
    const jwt = sessionStorage.getItem('uxa-jwt');

    if (jwt && !store.getters.owner.userName)
        store.dispatch('getOwner');
    else if (!jwt)
        router.push({ path: '/login' });
}