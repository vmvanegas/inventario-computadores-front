// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url = "http://localhost:56610/api/"

export const environment = {
  production: false,
  url_userList: `${url}user`,
  url_providerList: `${url}proveedor`,
  url_laptopList: `${url}laptop`,
  url_baseDeMaderaList: `${url}basedemadera`,
  url_cableVGAList: `${url}cablevga`,
  url_cargadorList: `${url}cargador`,
  url_diademaList: `${url}diadema`,
  url_monitorList: `${url}monitor`,
  url_mouseList: `${url}mouse`,
  url_tecladoList: `${url}teclado`,
  url_categoryList: `${url}categoria`,
  url_productList: `${url}producto`,
  url_orderList: `${url}pedido`,
  url_customerList: `${url}cliente`,
  url_validateUser: `${url}user/authenticate`,
  url_dashboard: `${url}dashboard`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
