import { test, expect, Locator } from '@playwright/test';
test.beforeEach( async({page}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Pet Types' }).click()
  await expect(page.getByRole('heading')).toHaveText('Pet Types')
})

test('Update Pet Types', async ({page}) => {
  await page.getByRole('row', { name: 'cat' }).getByRole('button', { name: 'Edit' }).click()
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toHaveText('Edit Pet Type')
  await expect(page.getByRole('textbox')).toHaveValue('cat')
  await page.locator('#name').fill('rabbit')
  await page.getByRole('button',{name:'Update'}).click()
  await expect(page.getByRole('textbox')).toHaveValue('rabbit')
  await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name: 'Edit' }).click()
  await expect(page.getByRole('textbox')).toHaveValue('rabbit')
  await page.locator('#name').fill('cat')
  await page.getByRole('button',{name:'Update'}).click()
  await expect(page.getByRole('textbox')).toHaveValue('cat')
})
test('Cancel Pet Type Update', async ({page}) => {
  await page.getByRole('row', { name: 'dog' }).getByRole('button', { name: 'Edit' }).click()
  await expect(page.getByRole('textbox')).toHaveValue('dog')
  await page.locator('#name').fill('mouse')
  await expect(page.getByRole('textbox')).toHaveValue('mouse')
  await page.getByRole('button',{name:'Cancel'}).click()
  await expect(page.getByRole('row', { name: 'dog' })).toBeVisible()
 })
test('Validation of Pet type name is required', async ({page}) => {
  await page.getByRole('row', { name: 'lizard' }).getByRole('button', { name: 'Edit' }).click()
  await expect(page.getByRole('textbox')).toHaveValue('lizard')
  await page.locator('#name').clear()
  await expect(page.locator('span.help-block')).toHaveText('Name is required');
  await page.getByRole('button',{name:'Update'}).click()
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toHaveText('Edit Pet Type')
  await page.getByRole('button',{name:'Cancel'}).click()
  await expect(page.getByRole('heading')).toHaveText('Pet Types')

 })