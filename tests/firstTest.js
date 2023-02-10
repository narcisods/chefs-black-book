const { Builder, By, Key } = require('selenium-webdriver');

async function example() {
	//launch the browser
	let driver = await new Builder().forBrowser('chrome').build();

	//navigate to our application
	await driver.get('https://chefsblackbook.herokuapp.com/');

	//navigate to login page
	await driver
		.findElement(By.xpath('/html/body/div[1]/main/div/div[2]/div[1]/a[1]'))
		.click();

	//timeout
	driver.manage().setTimeouts({ implicit: 5000 });

	//input login email
	await driver
		.findElement(By.xpath('//*[@id="exampleInputEmail1"]'))
		.sendKeys('guest@demo.com');

	//input password
	await driver
		.findElement(By.xpath('//*[@id="exampleInputPassword1"]'))
		.sendKeys('guestdemo');

	await driver
		.findElement(
			By.xpath('/html/body/div[1]/main/main/div/section/form/button')
		)
		.click();

	//timeout
	driver.manage().setTimeouts({ implicit: 10000 });

	//close the browser
	setTimeout(() => {
		driver.quit();
	}, 20000);
}
example();
//Test examples
