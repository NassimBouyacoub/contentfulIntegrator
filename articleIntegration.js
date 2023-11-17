


const { Builder, By, Key, until } = require('selenium-webdriver');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let id = "id"
let titreFR = "Titre"
let titreENG = "Title"

async function authentification() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://app.contentful.com/spaces/vmb6iqn8sgcm/environments/staging/entries');
        await sleep(5000)

        //connexion
        await driver.findElement(By.id("user_email")).sendKeys('///');
        await driver.findElement(By.id('user_password')).sendKeys('///');

        await driver.findElement(By.name('commit')).click();

        await driver.wait(until.titleIs('Content — website — staging — Contentful'), 5000);

        console.log('Authentification réussie!');

    } finally {

        //creer une page génerique
        await driver.findElement(By.xpath("//button[@data-test-id='create-entry-button']")).click();
        await driver.findElement(By.xpath("//button[@role='menuitem' and contains(text(),'Page Générique')]")).click();
        await driver.wait(until.titleIs('Untitled — Content — website — staging — Contentful'), 5000);
        console.log("Page  Gnerique crée")
        await sleep(500)

        //Sélectionner le type Actualité
        await driver.findElement(By.xpath("//div[@data-field-id='fkbt']//button[@data-test-id='create-entry-link-button']")).click()
        await sleep(1000)
        await driver.findElement(By.xpath("//button[@data-test-id='linkEditor.linkExisting']")).click()
        await sleep(2000)
        await driver.findElement(By.xpath("//h2[contains(text(),'actualite')]")).click()
        await sleep(2000)


        //Ajout de la langue anglaise
        await driver.findElement(By.xpath("//div[@data-test-id='multi-locale-translation-pill']//span[contains(text(),'Change')]")).click()
        await driver.findElement(By.id("en")).click()
        await sleep(200)
        await driver.findElement(By.xpath("//button[@data-test-id='save-cta']")).click()


        //Remplissage de l'id
        await driver.findElement(By.xpath("//div[@data-field-api-name='id']//input")).sendKeys(id)


        //Création d'un onglet
        await driver.findElement(By.xpath("//div[@data-field-id='eubb']//button[@data-test-id='create-entry-link-button']")).click()
        await sleep(1000)
        await driver.findElement(By.xpath("//button[@data-test-id='contentType']")).click()
        await sleep(2000)
        console.log("Onglet crée")


        //Remplissage de l'id
        await driver.findElement(By.xpath("//div[@data-field-id='imzb']//input")).sendKeys(id)

        //Remplissage du titre Français
        await driver.findElement(By.xpath("//div[@data-field-api-name='titre']//input")).sendKeys(titreFR)

        //Remplissage du Slug Français
        await driver.findElement(By.xpath("//div[@data-field-id='fmwg']//input")).sendKeys("slug")


        //Création dun bloc contenu
        /*await driver.findElement(By.xpath("//div[@data-field-id='yqze']//span[contains(text(),'Add content')]")).click()

        await sleep(500)
        await driver.findElement(By.xpath("//button[contains(text(),'Bloc Contenu')]")).click()*/
        await sleep(1000)
        const iframe = await driver.findElement(By.tagName('iframe'));
        console.log(iframe)
        await driver.switchTo().frame(iframe);

        const sourceCodeButton = await driver.findElement(By.xpath("//button[@aria-label='Source code' and @title='Source code']"));
        await driver.executeScript("arguments[0].click();", sourceCodeButton);



        await sleep(1000)
        const focusedElement = await driver.switchTo().activeElement();

        // Le code HTML
        await focusedElement.sendKeys('<p>Mon code html</p>');
        await sleep(1000)

        // Sauvgarde
        const saveButton = await driver.findElement(By.xpath("//div[@class='tox-dialog__footer-end']//button[@title='Save']"));
        await driver.executeScript("arguments[0].click();", saveButton);

        //Fermer le source code
        await driver.findElement(By.xpath("//div[@class='tox-dialog__footer-end']//button")).click();
        await sleep(1000)
        //Publish
        await driver.findElement(By.id("status-widget-primary-action")).click()

    }
}

authentification();
