/*
  Warnings:

  - A unique constraint covering the columns `[categoryID]` on the table `CustomVoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentID]` on the table `CustomVoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomVoice_categoryID_key" ON "CustomVoice"("categoryID");

-- CreateIndex
CREATE UNIQUE INDEX "CustomVoice_parentID_key" ON "CustomVoice"("parentID");
