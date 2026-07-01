import { test, expect, Locator } from '@playwright/test';

let inputPetType: Locator;
let editButtonPet: Locator;
let editPetTypeTextID: Locator;
let updateButton: Locator;
let editPetTypeHeader: Locator;
let cancelButton: Locator;
let petTypeText: Locator;
test.beforeEach( async({page}) => {
  await page.goto('/')
//1. Select the PET TYPES menu item in the navigation ba
   const petTypeLink=  page.getByRole('link', { name: 'Pet Types' })

  
   await petTypeLink.click()
  //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    petTypeText =  page.getByRole('heading', { name: 'Pet Types'   })
   await expect(petTypeText).toHaveText('Pet Types')

    //To avoid repetitive code we can add for loop to validate the assertion for list of pets
   inputPetType = page.locator('input[name="pettype_name"]')
  const expectedPetTypeList = ['cat','dog','lizard', 'snake', 'bird', 'hamster']

  console.log(expectedPetTypeList.length)

  for (let i=0;i<expectedPetTypeList.length;i++){

    await expect(inputPetType.nth(i)).toHaveValue(expectedPetTypeList[i])

  }
    //3. Click on "Edit" button for the "cat" pet type
     editButtonPet =  page.getByRole('button',{name:'Edit'})
     // Add the text into the textfield
     editPetTypeTextID= page.locator('#name')
// edit pet  ype title header locator

  editPetTypeHeader =  page.getByRole('heading', { name: 'Edit Pet Type' })
     //update button global
     updateButton =  page.getByRole('button',{name:'Update'})

     //cancel button locator

     cancelButton =  page.getByRole('button',{name:'Cancel'})
})

test('Update Pet Types', async ({page}) => {
  

// Click on the first edit button
   await editButtonPet.nth(0).click()
  //4. Add assertion of the "Edit Pet Type" text displayed

    
   await expect(editPetTypeHeader).toHaveText('Edit Pet Type')
 //5. Change the pet type name from "cat" to "rabbit" and click "Update" button
  
  await expect(page.getByRole('textbox')).toHaveValue('cat')
  //await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/pettypes/33')
  await editPetTypeTextID.fill('rabbit')

  await updateButton.click()

  //6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
  
  await expect(inputPetType.nth(0)).toHaveValue('rabbit')

  //7. Click on "Edit" button for the same "rabbit" pet type
  await editButtonPet.nth(0).click()
  //8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
await expect(page.getByRole('textbox')).toHaveValue('rabbit')

  await editPetTypeTextID.fill('cat')
  await updateButton.click()
//9. Add the assertion that the first pet type in the list of names has a value "cat" 

await expect(inputPetType.nth(0)).toHaveValue('cat')
})
test('Cancel Pet Type Update', async ({page}) => {
  //1. Click on "Edit" button for the "dog" pet type
   await editButtonPet.nth(1).click()
   await expect(page.getByRole('textbox')).toHaveValue('dog')
   //2. Type the new pet type name "moose"
   await editPetTypeTextID.fill('mouse')
   //3. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
   await expect(page.getByRole('textbox')).toHaveValue('mouse')
  // 4. Click on "Cancel" button
    
  
   await cancelButton.click()

   //5. Add the assertion the value "dog" is still displayed in the list of pet types
    await expect(inputPetType.nth(1)).toHaveValue('dog')
 })
test('Validation of Pet type name is required', async ({page}) => {
//1. Click on "Edit" button for the "lizard" pet type
   await editButtonPet.nth(2).click()
   await expect(page.getByRole('textbox')).toHaveValue('lizard')
   // 2. On the Edit Pet Type page, clear the input field

   const editText =  page.locator('#name') 
   await editText.click()
   await editText.clear()
   //3. Add the assertion for the "Name is required" message below the input field
   const errorText = page.getByText('Name is required')

   await expect(errorText).toHaveText('Name is required')

   //4. Click on "Update" button

   await updateButton.click()

//5. Add assertion of the "Edit Pet Type" text displayed

    
   await expect(editPetTypeHeader).toHaveText('Edit Pet Type')

   //6. Click on the "Cancel" button

    await cancelButton.click()

    //7. Add assertion that "Pet Types" page is displayed

    await expect(petTypeText).toHaveText('Pet Types')

 })