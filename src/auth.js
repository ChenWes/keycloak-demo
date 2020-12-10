import KeycloakApp from 'keycloak-js';

export const keycloak = KeycloakApp({
    url: 'http://172.17.130.170:8082/auth',
    realm: 'react',
    clientId: 'reactclient'
});

export default () => {
    console.log('初始化keycloak>', keycloak)
    keycloak.init()
        .success((authenticated) => {
            console.log('初始化keycloak后>', authenticated)
            if (!authenticated)
                keycloak.login()
            else {
                keycloak.loadUserInfo()
                    .then((userInfo) => {
                        console.log('成功获取用户信息>', userInfo)
                    })
                    .catch((err) => {
                        console.log('获取用户信息出错>', err)
                    });
            }
        })
        .error((err) => {
            console.log('初始化已经出错>', err)
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
    const userInfo = await loadUserInfo();
    return userInfo;
}

keycloak.onAuthSuccess = function () {
    console.log('Auth Success')
}

keycloak.onAuthError = function (errorData) {
    console.log(`Auth Error: ${JSON.stringify(errorData)}`)
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