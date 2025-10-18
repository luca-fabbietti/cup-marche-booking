import { test, expect } from '@playwright/test';

test('booking', async ({ page }) => {
  await page.goto('https://mycupmarche.it/prenotazionecittadino/web/guest/searchCf');
  await page.waitForSelector('#matrice2');
  await page.waitForSelector('#cf');
  await page.locator('#matrice2').fill(process.env.NUMERO_RICETTA || '');
  await page.locator('#cf').fill(process.env.CODICE_FISCALE || '');
  await page.getByRole('button', { name: 'Ricerca' }).click();
  await page.waitForSelector('#selectAreaVastaId');
  await page.locator('#selectAreaVastaId').selectOption('MARCHE');
  await page.getByRole('button', { name: 'PRENOTA LE PRESTAZIONI' }).click();
  await expect(page.getByRole('cell', { name: 'Struttura Erogante' })).toBeVisible();
});