export const environment = {
  production: true,
  
  // API URL
  apiUrl: 'http://localhost:35029/v1',
  
  // Keycloak configuration
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'master',
    clientId: 'tabulapi',
    clientSecret: 'da3da70b-4ac8-4b61-b169-f783f8f5c99f'
  }
}; 