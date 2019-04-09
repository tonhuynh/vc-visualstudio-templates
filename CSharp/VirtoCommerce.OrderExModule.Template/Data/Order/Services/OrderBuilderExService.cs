﻿using $ext_safeprojectname$.Core.Model;
using VirtoCommerce.Domain.Order.Services;
using VirtoCommerce.OrderModule.Data.Services;

namespace $safeprojectname$.Services
{
    using CartLineItem = VirtoCommerce.Domain.Cart.Model.LineItem;
    using OrderLineItem = VirtoCommerce.Domain.Order.Model.LineItem;

    public class CustomerOrderBuilderExService : CustomerOrderBuilderImpl
    {
        public CustomerOrderBuilderExService(ICustomerOrderService customerOrderService)
            : base(customerOrderService)
        {
        }

        protected override OrderLineItem ToOrderModel(CartLineItem lineItem)
        {
            var result = base.ToOrderModel(lineItem) as OrderLineItemEx;

            // Next lines just copy OuterId from cart LineItem2 to order LineItem2
            var cartLineItemEx = lineItem as CartLineItemEx;
            if (cartLineItemEx != null)
            {
                result.OuterId = cartLineItemEx.OuterId;
            }
            return result;
        }
    }
}
