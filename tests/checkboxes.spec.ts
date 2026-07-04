import { test, expect, Locator } from '@playwright/test';
test.beforeEach(async ({ page }) => {
   await page.goto('/')
   await page.getByRole('button', { name: 'Veterinarians' }).click()
   await page.getByRole('link', { name: 'All' }).click()
})
test('Validate selected specialties', async ({ page }) => {

   await expect(page.locator('.dropdown-toggle:has(span.glyphicon-education)')).toHaveText('Veterinarians')
   await page.getByRole('row', { name: ' Helen Leary ' }).getByRole('button', { name: 'Edit Vet' }).click()
   await expect(page.locator('label[for="spec"]')).toHaveText('Specialties')
   await expect(page.locator('.selected-specialties')).toHaveText('radiology')
   await page.locator('.selected-specialties').click()
   await expect(page.getByLabel('radiology')).toBeChecked()
   expect(await page.getByRole('checkbox', { name: 'surgery' }).isChecked()).toBeFalsy()
   expect(await page.getByRole('checkbox', { name: 'dentistry' }).isChecked()).toBeFalsy()
   await page.getByRole('checkbox', { name: 'surgery' }).check()
   await page.getByLabel('radiology').uncheck()
   await expect(page.locator('span.selected-specialties')).toHaveText('surgery')
   await page.getByRole('checkbox', { name: 'dentistry' }).check()
   await expect(page.locator('span.selected-specialties')).toHaveText('surgery, dentistry')
})
test(' select all specialties', async ({ page }) => {
   await page.getByRole('row', { name: ' Rafael Ortega ' }).getByRole('button', { name: 'Edit Vet' }).click()
   await expect(page.locator('span.selected-specialties')).toHaveText('surgery')
   await page.locator('.selected-specialties').click()
   const allBoxes = page.getByRole('checkbox')
   for (const box of await allBoxes.all()) {
      await box.check()
      await expect(box).toBeChecked()
   }
   await expect(page.locator('span.selected-specialties')).toContainText('surgery, radiology, dentistry')
})
test(' Unselect all specialties', async ({ page }) => {
   await page.getByRole('row', { name: ' Linda Douglas ' }).getByRole('button', { name: 'Edit Vet' }).click()
   await expect(page.locator('.selected-specialties')).toContainText('dentistry, surgery')
   await page.locator('.selected-specialties').click()
   const allBoxes = page.getByRole('checkbox')
   for (const box of await allBoxes.all()) {
      await box.uncheck()
      await expect(box).not.toBeChecked()
   }
   await expect(page.locator('.selected-specialties')).toBeEmpty()
let editVet:Locator;
let surgeryText: Locator;
let specialtiesDropdown: Locator;
let allSpecialtiesText: Locator;
test.beforeEach( async({page}) => {
  await page.goto('/')
//1. Select the Veterian menu item in the navigation
   const buttonVet =  page.getByRole('button', { name: 'Veterinarians' })
   await buttonVet.click()
   const allLink = page.getByRole('link', {name: 'All'})
   await allLink.click()
    allSpecialtiesText = page.locator('span.selected-specialties')
    editVet =  page.getByRole('button', {name: 'Edit Vet'})
    specialtiesDropdown = page.locator('span.dropdown-arrow');
})
test('Validate selected specialties', async({page})=>{
 
    //1. Add assertion of the "Veterinarians" text displayed above the table with the list of Veterinarians
  const veterinariansTextHeading =  page.getByRole('heading', {name: 'Veterinarians'})
      await expect(veterinariansTextHeading).toHaveText('Veterinarians')
   //2. Select the veterinarian "Helen Leary" and click "Edit Vet" button

      await editVet.nth(1).click()
   //3. Add assertion of the "Specialties" field. The value "radiology" is displayed
   const specialtiesLabel = page.locator('label.control-label', { hasText: 'Specialties' });
    await expect(specialtiesLabel).toHaveText('Specialties')
   
     await expect(allSpecialtiesText).toHaveText('radiology')
     //5. Click on the "Specialties" drop-down menu
      

     await specialtiesDropdown.click()
     
     //6. Add assertion that "radiology" specialty is checked
    const radiologyCheckbx = page.getByLabel('radiology')
    
   expect(radiologyCheckbx).toBeChecked()
//7. Add assertion that "surgery" and "dentistry" specialties are unchecked
   const surgeryCheckbx =   page.getByRole('checkbox', {name: 'surgery'})
   const dentistryCheckbx =   page.getByRole('checkbox', {name: 'dentistry'})

   expect (await surgeryCheckbx.isChecked()).toBeFalsy()

   expect (await dentistryCheckbx.isChecked()).toBeFalsy()
   //8. Check the "surgery" item specialty and uncheck the "radiology" item speciality 
   await surgeryCheckbx.check({force:true})
   await radiologyCheckbx.uncheck({force:true})
//9. Add assertion of the "Specialties" field displayed value "surgery"
  
   await expect(allSpecialtiesText).toHaveText('surgery')

   //10. Check the "dentistry" item specialty
  await dentistryCheckbx.check({force:true})
  //11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed
 
   await expect(allSpecialtiesText).toHaveText('surgery, dentistry')

})
test(' select all specialties', async({page})=>{
 await editVet.nth(3).click()
 //1. Add assertion of the "Specialties" field displayed value "surgery"
   await expect(allSpecialtiesText).toHaveText('surgery')
//2. Click on the "Specialties" drop-down menu
   
    await specialtiesDropdown.click()
//3. Check all specialties from the list
    const allBoxes = page.getByRole('checkbox')

    for (const box of await  allBoxes.all()){

      await box.check({force:true})
      //4. Add assertion that all specialties are checked
      expect(await box.isChecked()).toBeTruthy()

      
    }
//7. Add assertion that all checked specialities are displayed in the "Specialties" field
 await expect(allSpecialtiesText).toContainText('surgery, radiology, dentistry')
 await expect(allSpecialtiesText).toBeVisible()
})
test(' Unselect all specialties', async({page})=>{

await editVet.nth(2).click()
//1. Add assertion of the "Specialties" field displayed value "surgery" and dentist
   await expect(allSpecialtiesText).toHaveText('dentistry, surgery')
//2. Click on the "Specialties" drop-down menu
   
    await specialtiesDropdown.click()
//3. UnCheck all specialties from the list
    const allBoxes = page.getByRole('checkbox')

    for (const box of await  allBoxes.all()){

      await box.uncheck({force:true})
      //4. Add assertion that all specialties are unchecked
      expect(await box.isChecked()).toBeFalsy()

      
    }
    //7. Add assertion that "Specialties" field is empty
 await expect(allSpecialtiesText).toContainText('')
 
})