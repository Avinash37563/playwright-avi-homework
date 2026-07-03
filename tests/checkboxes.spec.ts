import { test, expect, Locator } from '@playwright/test';
test.beforeEach( async({page}) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Veterinarians' }).click()
    await page.getByRole('link', {name: 'All'}).click()
})
test('Validate selected specialties', async({page})=>{
    await expect(page.getByRole('heading', {name: 'Veterinarians'})).toHaveText('Veterinarians')
    await page.getByRole('row', { name: ' Helen Leary ' }).getByRole('button', { name: 'Edit Vet' }).click()
    await expect(page.locator('label.control-label', { hasText: 'Specialties' })).toHaveText('Specialties')
    await expect(page.locator('span.selected-specialties')).toHaveText('radiology')
    await page.locator('span.dropdown-arrow').click()
    await expect(page.getByLabel('radiology')).toBeChecked()
    expect (await page.getByRole('checkbox', {name: 'surgery'}).isChecked()).toBeFalsy()
    expect (await page.getByRole('checkbox', {name: 'dentistry'}).isChecked()).toBeFalsy()
    await page.getByRole('checkbox', {name: 'surgery'}).check({force:true})
    await page.getByLabel('radiology').uncheck({force:true})
    await expect(page.locator('span.selected-specialties')).toHaveText('surgery')
    await page.getByRole('checkbox', {name: 'dentistry'}).check({force:true})
    await expect(page.locator('span.selected-specialties')).toHaveText('surgery, dentistry')
})
test(' select all specialties', async({page})=>{
   await page.getByRole('row', { name: ' Rafael Ortega ' }).getByRole('button', { name: 'Edit Vet' }).click()
   await expect(page.locator('span.selected-specialties')).toHaveText('surgery')
   await page.locator('span.dropdown-arrow').click()
   const allBoxes = page.getByRole('checkbox')
         for (const box of await  allBoxes.all()){
                   await box.check({force:true})
                   expect(await box.isChecked()).toBeTruthy()  
}
   await expect(page.locator('span.selected-specialties')).toContainText('surgery, radiology, dentistry') 
})
test(' Unselect all specialties', async({page})=>{
   await page.getByRole('row', { name: ' Linda Douglas ' }).getByRole('button', { name: 'Edit Vet' }).click()
   await expect(page.locator('span.selected-specialties')).toContainText('dentistry, surgery')
   await page.locator('span.dropdown-arrow').click()
   const allBoxes = page.getByRole('checkbox')
         for (const box of await  allBoxes.all()){
                   await box.uncheck({force:true})
                   expect(await box.isChecked()).toBeFalsy()

}
   await expect(page.locator('span.selected-specialties')).toContainText('')
})