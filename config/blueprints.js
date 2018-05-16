module.exports.blueprints = {

  actions: false,

  rest: false,

  shortcuts: false,

  /***************************************************************************
  *                                                                          *
  * An optional mount path for all blueprint routes on a controller,         *
  * including `rest`, `actions`, and `shortcuts`. This allows you to take    *
  * advantage of blueprint routing, even if you need to namespace your API   *
  * methods.                                                                 *
  *                                                                          *
  * (NOTE: This only applies to blueprint autoroutes, not manual routes from *
  * `sails.config.routes`)                                                   *
  *                                                                          *
  ***************************************************************************/

  // prefix: '',

  /***************************************************************************
   *                                                                          *
   * An optional mount path for all REST blueprint routes on a controller.    *
   * And it do not include `actions` and `shortcuts` routes.                  *
   * This allows you to take advantage of REST blueprint routing,             *
   * even if you need to namespace your RESTful API methods                   *
   *                                                                          *
   ***************************************************************************/

  // restPrefix: '',

  /***************************************************************************
  *                                                                          *
  * Whether to pluralize controller names in blueprint routes.               *
  *                                                                          *
  * (NOTE: This only applies to blueprint autoroutes, not manual routes from *
  * `sails.config.routes`)                                                   *
  *                                                                          *
  * For example, REST blueprints for `FooController` with `pluralize`        *
  * enabled:                                                                 *
  * GET /foos/:id?                                                           *
  * POST /foos                                                               *
  * PUT /foos/:id?                                                           *
  * DELETE /foos/:id?                                                        *
  *                                                                          *
  ***************************************************************************/

  // pluralize: false,

  /***************************************************************************
  *                                                                          *
  * Whether the blueprint controllers should populate model fetches with     *
  * data from other models which are linked by associations                  *
  *                                                                          *
  * If you have a lot of data in one-to-many associations, leaving this on   *
  * may result in very heavy api calls                                       *
  *                                                                          *
  ***************************************************************************/

  // populate: true,

  /****************************************************************************
  *                                                                           *
  * Whether to run Model.watch() in the find and findOne blueprint actions.   *
  * Can be overridden on a per-model basis.                                   *
  *                                                                           *
  ****************************************************************************/

  // autoWatch: true,

  /****************************************************************************
  *                                                                           *
  * The default number of records to show in the response from a "find"       *
  * action. Doubles as the default size of populated arrays if populate is    *
  * true.                                                                     *
  *                                                                           *
  ****************************************************************************/

  // defaultLimit: 30

};
