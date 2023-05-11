import { CustomQuery, MethodOptions } from '../../types';
import { SetShippingMethodsOnCartInput, SetShippingMethodsOnCartMutation } from '@vsf-enterprise/magento-api-types';
import { client } from '../../client';
import { DeepPartial } from 'ts-essentials';
import { FetchResult } from '@apollo/client';

/**
 * setShippingMethodsOnCart response type
 */
export type SetShippingMethodsOnCartResponse<T extends DeepPartial<SetShippingMethodsOnCartMutation> = SetShippingMethodsOnCartMutation> = FetchResult<T>

/**
 * Method to set shipping methods on cart.
 * Before using this method, you need to set shipping address on cart.
 *
 * @remarks
 * This method communicates with the
 * {@link @vue-storefront/magento-api#ApiMethods.setShippingMethodsOnCart | setShippingMethodsOnCart } endpoint
 * of the Vue Storefront API Middleware.
 * The default GraphQL query used by this method can be found
 * {@link @vue-storefront/magento-api#setShippingMethodsOnCart | here}.
 *
 * @param params -
 * Parameter object which can be used with this method.
 * Refer to its type definition to learn about possible properties.
 *
 * @param options -
 * Options that can be passed to additionally configure the request
 * or customize the logic in a plugin.
 *
 * @typeParam Res - Customizable response interface to be used with custom queries.
 *
 * @returns
 * Returns a representation of the {@link @vsf-enterprise/magento2-sdk#SetShippingMethodsOnCartResponse | SetShippingMethodsOnCartResponse}.
 *
 * @example
 * Simple usage:
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 *
 * // Assuming that shipping address is already set on cart.
 * // if not, you need to set shipping address on cart first.
 *
 * const params = {
 *   cart_id: 'some-cart-id',
 *   shipping_methods: [
 *     {
 *       carrier_code: 'flatrate',
 *       method_code: 'flatrate'
 *     }
 *   ]
 * };
 *
 * const { data } = await sdk.magento.setShippingMethodsOnCart(params);
 *
 * // you can get set shipping methods on cart response from
 * // data?.setShippingMethodsOnCart?.cart?.shipping_addresses?.[0]?.selected_shipping_method?.method_code
 * ```
 *
 * @example
 * Creating a custom GraphQL query to change the amount of fields returned by the query, when compared to the default query
 *
 * ```ts
 * module.exports = {
 *   integrations: {
 *     magento: {
 *       customQueries: {
 *         'set-shipping-methods-on-cart-custom-query': ({ variables, metadata }) => ({
 *            variables,
 *            query: `
 *              mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
 *                setShippingMethodsOnCart(input: $input) {
 *                  cart {
 *                    ${metadata.fields}
 *                  }
 *                }
 *              }`
 *         }),
 *       },
 *     }
 *   }
 * };
 * ```
 *
 * @example
 * Using a custom GraphQL query created in the previous example
 *
 * ```ts
 * import { sdk } from '~/sdk.config.ts';
 * // reduce the amount of fields returned by the query, when compared to the default query
 * // you will get only selected_shipping_method.method_code field
 *
 * const customQuery = {
 *   setShippingMethodsOnCart: 'set-shipping-methods-on-cart-custom-query',
 *   metadata: {
 *     fields: 'shipping_addresses { selected_shipping_method { method_code } }'
 *   }
 * };
 *
 * const params = {
 *   cart_id: 'some-cart-id',
 *   shipping_methods: [
 *     {
 *       carrier_code: 'flatrate',
 *       method_code: 'flatrate'
 *     }
 *   ]
 * };
 *
 * const { data } = await sdk.magento.setShippingMethodsOnCart(params, { customQuery });
 *
 * // data will contain only the fields specified in the custom query.
 * ```
 */
export async function setShippingMethodsOnCart<RES extends SetShippingMethodsOnCartResponse>(params: SetShippingMethodsOnCartInput, options?: MethodOptions<CustomQuery<'setShippingMethodsOnCart'>>) {
  const { data } = await client.post<RES>(
    'setShippingMethodsOnCart',
    [params, options?.customQuery, options?.customHeaders],
    options?.clientConfig
  );

  return data;
}
