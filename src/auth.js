import Keycloak from 'keycloak-js';

export const keycloak = Keycloak({
    url: 'http://auth.dev.k8s.esquel.cloud/auth',
    realm: 'esquel-sit',
    clientId: 'passport',
});

export default () => {

    console.log('初始化keycloak>', keycloak)

    keycloak.init()
        .success((authenticated) => {
            console.log('初始化keycloak后>', authenticated)
            if (!authenticated)
                keycloak.login()
            else {
                getUserGroups()
                    .then((groups) => {
                        console.log('已登陆keycloak后>', groups)
                        console.log(groups);
                    })
            }
        })
        .error(() => {
            keycloak.login();
        })
}

export const loadUserInfo = () => new Promise((resolve, reject) => {
    try {
        keycloak.loadUserInfo()
            .success(userInfo => {
                console.log('user info>', userInfo)
                resolve(userInfo)
            })
            .error(error => {
                reject(`Failed to load user info: ${error}`);
            })
    } catch (error) {
        reject(error)
    }
})

export const getUserGroups = async () => {
    const userInfo = await loadUserInfo()
    return userInfo && userInfo.groups || []
}

keycloak.onAuthSuccess = function () {
    console.log('Auth Success')
}

keycloak.onAuthError = function (errorData) {
    console.log(`Auth Success: ${JSON.stringify(errorData)}`)
}

keycloak.onAuthRefreshSuccess = function () {
    console.log('Auth Refresh Success')
}

keycloak.onAuthRefreshError = function () {
    console.log('Auth Refresh Error')
    keycloak.login()
}

keycloak.onAuthLogout = function () {
    console.log('Auth Logout')
}

keycloak.onTokenExpired = function () {
    console.log('Access token expired.')
    console.log('keycloak.authenticated', keycloak.authenticated)
}