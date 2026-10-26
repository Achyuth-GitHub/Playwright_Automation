Feature: Ecommerce Validations

  @validations
  @foo
  Scenario Outline: Placing the Order
    Given A login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is diaplyed

    Examples:
    |username                  | password    |
    |achyuthmanepally@gmail.com| Rahul@123   |
    |deepumanepally@gmail.com. | Rahul@123   |