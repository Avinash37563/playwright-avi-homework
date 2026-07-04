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

})