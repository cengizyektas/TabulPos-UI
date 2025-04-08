export const environment = {
  production: true,
  
  // API URL
  apiUrl: 'http://localhost:35029/v1',
  
  // Keycloak configuration
  keycloak: {
    url: 'https://auth.tabul.com.tr/auth',
    realm: 'master',
    clientId: 'tabulposapi',
    clientSecret: 'd491c624-e978-40ba-a796-7fed9fa6a494'
  }
}; 