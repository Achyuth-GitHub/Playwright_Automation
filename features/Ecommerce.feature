Feature: Ecommerce Validations

  @regression
  Scenario: Placing the Order
    Given A login to Ecommerce application with "achyuthmanepally@gmail.com" and "Rahul@123"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid deatils and Place Order
    Then Verify order is present in the OrderHistory page

    @validations
    Scenario: Placing the Order
    Given A login to Ecommerce2 application with "achyuthmanepally@gmail.com" and "Rahul@123"
    Then Verify error message is diaplyed