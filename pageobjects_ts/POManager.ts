import { expect, type Locator, type Page } from '@playwright/test';

import {DashboardPage}from "../pageobjects_ts/DashboardPage";
import { OrdersHistoryPage } from "../pageobjects_ts/OrdersHistoryPage";
import { OrdersReviewPage } from "../pageobjects_ts/OrdersReviewPage";
import { CartPage } from "../pageobjects_ts/CartPage";
import { loginPage } from './loginPage';

export class POManager
{
    loginPage: loginPage;
    dashboardPage: DashboardPage;
    ordersHistoryPage: OrdersHistoryPage;
    ordersReviewPage: OrdersReviewPage;
    cartPage: CartPage;
    page: Page;

constructor(page: Page)
{
    this.page = page;
    this.loginPage = new loginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);


}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}
